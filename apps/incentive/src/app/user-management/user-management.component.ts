import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { tap } from 'rxjs';
import { Roles } from '../shared/user.model';
import { CreateUserDto, UserService } from '../shared/user.service';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { AssignedUsersFormFieldComponent } from '../shared/assigned-users-form-field/assigned-users-form-field.component';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    AssignedUsersFormFieldComponent,
    MatListModule,
    MatButtonModule,
  ],
  selector: 'incentive-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
})
export class UserManagementComponent {
  newUser: Required<CreateUserDto> = this.emptyUser();
  availableRoles = Object.keys(Roles);
  roles = new FormControl([] as Roles[]);

  constructor(private userService: UserService) {
    this.roles.valueChanges.subscribe((values) => {
      this.newUser.roles = values || [];
    });
  }

  createNewUser() {
    return this.userService
      .postUser(this.newUser)
      .pipe(
        tap(() => {
          this.newUser = this.emptyUser();
        })
      )
      .subscribe();
  }

  emptyUser(): Required<CreateUserDto> {
    return {
      firstname: '',
      lastname: '',
      email: '',
      roles: [],
      assignedUsers: [],
      password: '',
    };
  }

  print(e: unknown) {
    console.log(e);
  }
}
