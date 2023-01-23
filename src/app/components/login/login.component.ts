import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Constants } from 'src/constants';
import { AppStorage } from 'src/storage';
import { MicrosoftadService } from '../../services/microsoftad.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
   isLogin: boolean = false
   userName :string | undefined = ""
  constructor( private _constants: Constants, private _storage : AppStorage, private _msad : MicrosoftadService, private _router: Router) { }

  //Logout with the Microsoft Azure AD
  logout(event : any)
  {
    //call the login code
    this._storage.setKeyValue("username", '');
    this._storage.setKeyValue("accessToken", '');
    this._storage.setKeyValue("isLogin", false);
    this._msad.signOut();
  }
  //Login with the Microsoft Azure AD
  async loginMS(event: any)
  {
    if(this._constants.isConfigValid() == false)
    {
      //TODO: Show a message to the user
      return;
    }
    const response = await this._msad.ssoSignIn();
    if(response)
    {
      this.isLogin = true;
      this.userName = this._msad.user?.username
      this._storage.setKeyValue("username", this.userName);
      this._storage.setKeyValue("idToken", response.accessToken);
      this._storage.setKeyValue("isLogin", true);
      this._router.navigate(['/accounts']);
    }
    
  }
  ngOnInit(): void {
    this.isLogin = this._storage.getKeyValue("isLogin") == "true" ? true : false;
    if(this.isLogin)
    {
      this.userName = this._storage.getKeyValue("username");
    }
  }

}
