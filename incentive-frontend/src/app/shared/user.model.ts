export type Roles = "user" | "teamleader" | "administrator";

export interface User {
    _id: string;
    email: string;
    firstname: string;
    lastname: string;
    roles: Roles[];
    receivedCredits: number;
    creditsToPlace: number;
    assignedUsers: string[];
}

export class User implements User {
    static createUser(user: User) {
        return Object.assign(new User(), user) as Required<User>;
    }

    private constructor() {}

    isAdministrator(): boolean {
        return this.roles.includes("administrator");
    }
    isTeamleader(): boolean {
        return this.roles.includes("teamleader") || this.isAdministrator();
    }
}