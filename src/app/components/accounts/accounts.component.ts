import { Component } from '@angular/core';
import { Constants } from 'src/constants';
import { AppStorage } from 'src/storage';
import { MicrosoftadService } from '../../services/microsoftad.service';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements  OnInit{
  accounts =[];

  isLogin  = false
  private _httpHeaders = new HttpHeaders()
  constructor( private _constants: Constants, private _storage : AppStorage,
     private _msad : MicrosoftadService, private _router: Router,
     private _http: HttpClient
     ) {
    this.isLogin = this._storage.getKeyValue("isLogin") == "true" ? true : false;
    this._httpHeaders = this._httpHeaders.append('OData-MaxVersion', '4.0');
    this._httpHeaders = this._httpHeaders.append('OData-Version', '4.0');
    this._httpHeaders = this._httpHeaders.append('Accept', 'application/json');
  
  }

  async fetchAccessToken() : Promise<string>{
    let idToken = await this._storage.getKeyValue("idToken")
    let accessToken = await this._storage.getKeyValue("dataversetoken")
    if((idToken != null || idToken != '') && (accessToken == null || accessToken == '' || accessToken == undefined))
    {
      const tokenResponse = await this._msad.acquireTokenSilent();
      if(tokenResponse)
      {
        accessToken = tokenResponse.accessToken;
        this._storage.setKeyValue("dataversetoken", accessToken);
      }
    }
    return accessToken
  }
  async getAccounts() : Promise<any>
  {
    const accessToken = await this.fetchAccessToken()
    this._httpHeaders = this._httpHeaders.append('Authorization', 'Bearer ' + accessToken);
    await this._http.get( `${this._constants.DATAVERSE_BASE_URL}${this._constants.DATAVERSE_API_URL}/accounts?$select=name`, 
    {headers: this._httpHeaders
    }).subscribe(
      (data : any) => {
        this.accounts =  data.value;
        console.log(this.accounts);
      }
    );
  }

  
   ngOnInit() : void {
    if(this.isLogin == false)
    {
      this._router.navigate(['/app']);
    }
    else
    {
       this.getAccounts()
    }
  }



}
