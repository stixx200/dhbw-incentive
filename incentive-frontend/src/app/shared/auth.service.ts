import { Injectable } from "@angular/core";

// We use the browser's localStorage API to save the access token for all sessions in this browser
const AUTH_TOKEN = "app-access-token";
const USER_ID = "app-user-id";

@Injectable()
export class AuthService {
    private accessToken = localStorage.getItem(AUTH_TOKEN) || "";
    private userId = localStorage.getItem(USER_ID) || "";

    setAccessToken(token: string, userId: string) {
        this.accessToken = token;
        this.userId = userId;
        localStorage.setItem(AUTH_TOKEN, this.accessToken);
        localStorage.setItem(USER_ID, this.userId);
    }

    hasAccessToken() {
        return !!this.accessToken;
    }

    reset() {
        this.setAccessToken("", "");
    }

    getAuthHeader(): { Authorization: string } | {} {
        if (!this.accessToken) {
            return {};
        }
        return { Authorization: `Bearer ${this.accessToken}` };
    }

    getUserId() {
        return this.userId;
    }
}