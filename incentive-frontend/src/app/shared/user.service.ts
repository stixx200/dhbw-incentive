import { Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { AuthService } from "./auth.service";
import { AppHttpClient } from "./http-client.service";
import { User } from "./user.model";

@Injectable()
export class UserService {
    constructor(private readonly authService: AuthService, private readonly http: AppHttpClient) {}

    async getUser(): Promise<User> {
        const data = await firstValueFrom(this.http.get(`/users/${this.authService.getUserId()}`));
        return User.createUser(data as User);
    }

    async patchUser(user: User): Promise<void> {
        return await firstValueFrom(this.http.patch(`/users/${this.authService.getUserId()}`, user));
    }

    async getAllUsers() {
        const users = await firstValueFrom(this.http.get<User[]>("/users"));
        return users.map((user: User) => User.createUser(user));
    }
}