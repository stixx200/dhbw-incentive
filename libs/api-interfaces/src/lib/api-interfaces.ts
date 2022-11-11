export interface ILoginDto {
  email: string;
  password: string;
}

export interface ICreateUserDto {
  email: string;
  password: string;
  firstname?: string;
  lastname?: string;
  roles?: string[];
  assignedUsers?: string[];
}

export interface ICreateTransactionDto {
  recipient: string;
  amount: number;
}

export enum Role {
  User = 'user',
  Teamleader = 'teamleader',
  Administrator = 'administrator',
}
