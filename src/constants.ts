import { Injectable } from "@angular/core";
import { BrowserCacheLocation, PublicClientApplication } from "@azure/msal-browser";

@Injectable()
export class Constants {
    public readonly AZURE_APP_ID = '';//The Azure App ID for the app registration
    public readonly AZURE_AUTHORITY = 'https://login.microsoftonline.com/';
    public readonly AZURE_TENANT_ID = '';//The Azure Tenant ID for the app registration
    public readonly DATAVERSE_BASE_URL = 'https://org.crm4.dynamics.com' //The base URL for the Dataverse instance. Please replace 'org' with your organization name
    public readonly DATAVERSE_API_URL = '/api/data/v9.2' //The API URL for the Dataverse instance  
    private publicMSALClient: PublicClientApplication;

    public readonly MSAL_CONFIG  = {
        auth: {
            clientId: this.AZURE_APP_ID,
            authority: this.AZURE_AUTHORITY + this.AZURE_TENANT_ID,
            redirectUri: 'http://localhost:4200',
        },
        cache: {
            cacheLocation: BrowserCacheLocation.LocalStorage,
            storeAuthStateInCookie: true
        }
    };

    constructor() {
        this.publicMSALClient = new PublicClientApplication(this.MSAL_CONFIG);
    }

    public getPublicMSALClient(): PublicClientApplication {
        return this.publicMSALClient;
    }

}