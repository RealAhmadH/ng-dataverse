import { Injectable } from '@angular/core';
import { Constants } from 'src/constants';
import {  PublicClientApplication, AuthenticationResult, AccountInfo } from "@azure/msal-browser";

@Injectable({
  providedIn: 'root'
})
export class MicrosoftadService {
  private publicMSALClient: PublicClientApplication;
  private loginScopes  = ['user.read']
  public user: AccountInfo | undefined = undefined;

  constructor(private _constants : Constants) {
    this.publicMSALClient = new PublicClientApplication(this._constants.MSAL_CONFIG); 
   }

   public getPublicMSALClient(): PublicClientApplication {
    return this.publicMSALClient;
}

public async ssoSignIn(userHint : string = '') : Promise<AuthenticationResult> {
  try {
      const response = await this.publicMSALClient.ssoSilent({
          loginHint: userHint,
          scopes: this.loginScopes,
          authority: this._constants.AZURE_AUTHORITY + this._constants.AZURE_TENANT_ID
      });
      this.user = response.account as AccountInfo;
      return response;
  } catch (error) {
      const response = await this.publicMSALClient.loginPopup({   
          scopes: this.loginScopes,
          authority: this._constants.AZURE_AUTHORITY + this._constants.AZURE_TENANT_ID
      });
      this.user = response.account as AccountInfo;
      return response;
  }
}

public async acquireTokenSilent(scope : string = `${this._constants.DATAVERSE_BASE_URL}/.default`,
user: AccountInfo | undefined = this.user) : Promise<AuthenticationResult> {
  try {
      const response = await this.publicMSALClient.acquireTokenSilent({
          scopes: [scope],
          account: user,
          authority: this._constants.AZURE_AUTHORITY + this._constants.AZURE_TENANT_ID
      });
      return response;
  } catch (error) {
      const response = await this.publicMSALClient.acquireTokenPopup({
          scopes: [scope],
          authority: this._constants.AZURE_AUTHORITY + this._constants.AZURE_TENANT_ID
      });
      return response;
  }

}

public async signOut() : Promise<void> {
  try {
      await this.publicMSALClient.logoutPopup();
  } catch (error) {
      console.log(error);
  }
}
}
