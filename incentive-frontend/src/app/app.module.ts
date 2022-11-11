import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { ProfileComponent } from './profile/profile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TransactionsComponent } from './transactions/transactions.component';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppHttpClient } from './shared/http-client.service';
import { AuthService } from './shared/auth.service';
import { UserService } from './shared/user.service';
import { UserManagementComponent } from './user-management/user-management.component';
import { AssignedUsersFormFieldComponent } from './shared/assigned-users-form-field/assigned-users-form-field.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    ProfileComponent,
    TransactionsComponent,
    UserManagementComponent,
    AssignedUsersFormFieldComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [AppHttpClient, AuthService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private http: AppHttpClient) {
    this.http.setBaseUrl("http://localhost:4500/api");
  }
}
