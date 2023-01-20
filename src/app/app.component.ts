import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppStorage } from 'src/storage';
import { MicrosoftadService } from './services/microsoftad.service';
import { Constants } from 'src/constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isLogin  = false
  constructor(private _storage : AppStorage, private _router: Router,
    private _msad : MicrosoftadService,
    private _constants: Constants) {
    this.isLogin = this._storage.getKeyValue("isLogin") == "true" ? true : false;
  }

  ngOnInit(): void {
    //redirect to login page if not logged in
    // if(this.isLogin == false)
    // {
    //   this._router.navigate(['/login']);
    // }
  }

  logout(event : any)
  {
    //call the login code
    this._storage.setKeyValue("username", '');
    this._storage.setKeyValue("accessToken", '');
    this._storage.setKeyValue("isLogin", false);
    this._msad.signOut();
  }

  async login(event : any)
  {
    
    if(this._constants.isConfigValid() == false)
    {
      //TODO: Show a message to the user
      return;
    }
    const response = await this._msad.ssoSignIn();
    if(response)
    {
      const tokenResponse = await this._msad.acquireTokenSilent();
      this.isLogin = true;
      this._storage.setKeyValue("username", this._msad.user?.username);
      this._storage.setKeyValue("accessToken", tokenResponse.accessToken);
      this._storage.setKeyValue("isLogin", true);
    }
  }
}
