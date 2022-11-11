import { Injectable, OnInit } from "@angular/core";
import { BehaviorSubject, firstValueFrom, map, Observable, of, shareReplay, Subject, switchMap, tap } from "rxjs";
import { AuthService } from "./auth.service";
import { AppHttpClient } from "./http-client.service";
import { IUser, User } from "./user.model";

export interface CreateUserDto {
    email: string;
    password: string;
    firstname?: string;
    lastname?: string;
    roles?: string[];
    assignedUsers?: string[];
}

@Injectable()
export class UserService implements OnInit {
    private currentUser$ = this.authService.userId$.pipe(switchMap(userId => {
        if (userId) {
            return this.getUser(userId);
        }
        return of(null);
    }), shareReplay(1));
    private triggerFetchAllUsers$ = new BehaviorSubject<null>(null);
    private allUsers$ = this.triggerFetchAllUsers$.pipe(switchMap(() => this.internalGetAllUsers()));

    constructor(private readonly authService: AuthService, private readonly http: AppHttpClient) {
    }

    ngOnInit() {
        this.triggerFetchAllUsers$.next(null);
    }

    getCurrentUser(): Observable<User | null> {
        return this.currentUser$;
    }

    getUser(userId?: string): Observable<User> {
        const result = this.http.get(`/users/${userId || this.authService.getUserId()}`);
        return result.pipe(map((data) => {
            return new User(data as User);
        }));
    }

    async patchUser(userId: string, user: Partial<IUser>): Promise<void> {
        return await firstValueFrom(this.http.patch(`/users/${userId}`, user));
    }

    postUser(user: CreateUserDto) {
        return this.http.post("/users", user)
        .pipe(tap(() => {
            // update getAllUsers observable
            this.triggerFetchAllUsers$.next(null);
        }));
    }

    public getAllUsers() {
        return this.allUsers$;
    }

    private internalGetAllUsers() {
        console.log("REST");
        return this.http.get<User[]>("/users").pipe(map((list) => {
            return list.map(user => new User(user));
        }));
    }
}