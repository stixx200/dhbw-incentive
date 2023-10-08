import { EventEmitter, Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { JwtHelperService } from "@auth0/angular-jwt";

// We use the browser's localStorage API to save the access token for all sessions in this browser
const AUTH_TOKEN = "app-access-token";
const USER_ID = "app-user-id";

@Injectable()
export class AuthService extends EventEmitter<void> {
    private accessToken = localStorage.getItem(AUTH_TOKEN) || "";
    private userId = localStorage.getItem(USER_ID) || "";
    public userId$ = new BehaviorSubject<string|null>(this.userId || null);
    private jwtHelper = new JwtHelperService();

    setAccessToken(token: string, userId: string) {
        this.accessToken = token;
        this.userId = userId;
        localStorage.setItem(AUTH_TOKEN, this.accessToken);
        localStorage.setItem(USER_ID, this.userId);
        this.userId$.next(userId || null);
    }

    hasAccessToken() {
        this.verifyToken();
        return !!this.accessToken;
    }

    reset() {
        this.setAccessToken("", "");
    }

    getAuthHeader(): { Authorization: string } | {} {
        this.verifyToken();
        if (!this.accessToken) {
            return {};
        }
        return { Authorization: `Bearer ${this.accessToken}` };
    }

    getUserId() {
        if (!this.userId) {
            throw new Error("No user available");
        }
        return this.userId;
    }

    verifyToken() {
        if (!this.accessToken) {
            return;
        }

        const isExpired = this.jwtHelper.isTokenExpired(this.accessToken);
        if (isExpired) {
            console.warn("Current token is expored. Reset User!");
            this.reset();
        }
    }
}