
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable()
export class AppHttpClient {
    private baseUrl: string = "";

    constructor(private readonly http: HttpClient, private readonly authService: AuthService) {}

    public setBaseUrl(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    get<T>(url: string, options?: Parameters<typeof this.http.get>[1]) {
        return this.http.get<T>(this.extendUrl(url), { 
            ...options,
            headers: { ...options?.headers, ...(this.authService.getAuthHeader()) },
        });
    }

    post<T>(url: string, body: unknown, options?: Parameters<typeof this.http.post>[2]) {
        return this.http.post<T>(this.extendUrl(url), body, { 
            ...options,
            headers: { ...options?.headers, ...this.authService.getAuthHeader() },
            responseType: "json",
        });
    }

    patch<T>(url: string, body: unknown, options?: Parameters<typeof this.http.patch>[2]) {
        return this.http.patch<T>(this.extendUrl(url), body, { 
            ...options,
            headers: { ...options?.headers, ...this.authService.getAuthHeader() },
        });
    }

    delete<T>(url: string, options?: Parameters<typeof this.http.delete>[1]) {
        return this.http.delete<T>(this.extendUrl(url), { 
            ...options,
            headers: { ...options?.headers, ...this.authService.getAuthHeader() },
        });
    }

    private extendUrl(url: string) {
        return this.baseUrl + url;
    }
}