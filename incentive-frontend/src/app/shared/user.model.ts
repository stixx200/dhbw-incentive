export enum Roles {
    user = "user",
    teamleader = "teamleader",
    administrator = "administrator",
}

export interface IUser {
    _id: string;
    email: string;
    firstname: string;
    lastname: string;
    roles: Roles[];
    receivedCredits: number;
    creditsToPlace: number;
    assignedUsers: string[];
}

export class User implements IUser {
    _id!: string;
    email!: string;
    firstname!: string;
    lastname!: string;
    roles!: Roles[];
    receivedCredits!: number;
    creditsToPlace!: number;
    assignedUsers!: string[];

    constructor(user: IUser) {
        Object.assign(this, user);
    }

    isAdministrator(): boolean {
        return this.roles.includes(Roles.administrator);
    }
    isTeamleader(): boolean {
        return this.roles.includes(Roles.teamleader) || this.isAdministrator();
    }
}