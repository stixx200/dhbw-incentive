import { Route } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {ProfileComponent} from "./profile/profile.component";
import {TransactionsComponent} from "./transactions/transactions.component";
import {UserManagementComponent} from "./user-management/user-management.component";

export const appRoutes: Route[] = [
  { path: "login", component: LoginComponent },
  { path: "profile", component: ProfileComponent },
  { path: "transactions", component: TransactionsComponent },
  { path: "user-management", component: UserManagementComponent },
  { path: "", redirectTo: "login", pathMatch: "full" },
];
