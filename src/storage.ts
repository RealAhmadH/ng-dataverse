import { Injectable } from "@angular/core";

@Injectable()
export class AppStorage {
    public setAccessToken(token: string) {
        localStorage.setItem('accessToken', token);
    }

    public getAccessToken(): string {
        return localStorage.getItem('accessToken') as string;
    }

    public setKeyValue(key: string, value: string) {
        localStorage.setItem(key, value);
    }

    public getKeyValue(key: string): string {
        return localStorage.getItem(key) as string;
    }
}