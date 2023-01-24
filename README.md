# ng-dataverse
Welcome to a repository of code which expalins how:
 1. You can authenticate the user against the Microsoft Azure AD using the MSAL.
 2. Connect to the Microsoft Datavere and fetch the account names from it.
 
 # How to use it
 
 1. Clone the code to your local machine.
 2. Open the source code in any code editor like VS Code. On the terminal run the following command:
 
      npm install
 3. Locate the file src\constants.ts and provide the values to the following:
  a. AZURE_APP_ID: your Azure application ID
  b. AZURE_TENANT_ID: Your Azure tenant ID.
  c. DATAVERSE_BASE_URL: Enter your dataverse or D365 CE app URL.
 4. On the terminal run the following command:
    ng serve
 
 You can access the app at http://localhost:4200
 
For a step-by-step guide on what the configuration requirements please visit https://impulztech.com/microsoft-dataverse-web-api-part-i-of-2/
