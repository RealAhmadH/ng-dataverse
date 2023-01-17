import { Component } from '@angular/core';
import { Constants } from 'src/constants';
import { AppStorage } from 'src/storage';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AccountInfo } from '@azure/msal-browser';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  displayedColumns: string[] = ['name'];
  title = 'dataverseclient';
  user : any = undefined;
  accounts : any = undefined;
  isLogin : boolean = false;

  private _httpHeaders: HttpHeaders = new HttpHeaders();

  getAccounts(event : any)
  {
    try{
      this._httpClient.get(
        `${this._constants.DATAVERSE_BASE_URL}${this._constants.DATAVERSE_API_URL}/accounts?$select=name`, 
      {headers: this._httpHeaders
      
      })
      .subscribe((response : any) => {
        this.accounts = response.value;
        console.log(this.accounts)
      });
    }
    catch(e)
    {
      console.log(e);
    }

  }

  logout(event : any)
  {
    this._constants.getPublicMSALClient().logoutPopup({postLogoutRedirectUri: "http://localhost:4200"}).then((response) => {
      this.isLogin = false;
      this._storage.setAccessToken("");
    });
  }

  loginMS(event: any)
  {
    if(this._constants.isConfigValid() == false)
    {
      this._snackBar.open("Please update the constants.ts file with your Azure App ID, Tenant ID and Dataverse instance URL"
      , "Ok", {
        
        horizontalPosition: 'center',
        verticalPosition: 'top',

  
      }).onAction().subscribe(() => {
        this._snackBar.dismiss();
      });
      return;
    }
    this._constants.getPublicMSALClient().loginPopup({scopes: ["User.ReadWrite", 
    `${this._constants.DATAVERSE_BASE_URL}/user_impersonation`]}).then((response) => {
      //acquire the token
        const scope = `${this._constants.DATAVERSE_BASE_URL}/.default`;
        this.user = response.account;
        this._constants.getPublicMSALClient().acquireTokenSilent({scopes: [scope], account:
          this.user}).then((response) => {
          this._storage.setAccessToken(response.accessToken);
          this.isLogin = true;
          this._httpHeaders = this._httpHeaders.append('Authorization', `Bearer ${this._storage.getAccessToken()}`);
        });
    }

    );
  }
  constructor(private _constants: Constants, private _storage : AppStorage, private _httpClient : HttpClient, private _snackBar: MatSnackBar) {
    //this._httpHeaders = this._httpHeaders.append('Authorization', `Bearer ${this._storage.getAccessToken()}`);
    this._httpHeaders = this._httpHeaders.append('OData-MaxVersion', '4.0');
    this._httpHeaders = this._httpHeaders.append('OData-Version', '4.0');
    this._httpHeaders = this._httpHeaders.append('Accept', 'application/json');
  }
}
