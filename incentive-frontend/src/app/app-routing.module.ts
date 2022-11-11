import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { UserManagementComponent } from './user-management/user-management.component';

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "profile", component: ProfileComponent },
  { path: "transactions", component: TransactionsComponent },
  { path: "user-management", component: UserManagementComponent },
  { path: "", redirectTo: "login", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
