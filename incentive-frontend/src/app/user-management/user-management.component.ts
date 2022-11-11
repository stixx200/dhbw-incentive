import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { tap } from 'rxjs';
import { IUser, Roles, User } from '../shared/user.model';
import { CreateUserDto, UserService } from '../shared/user.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {
  newUser: Required<CreateUserDto> = this.emptyUser();
  availableRoles = Object.keys(Roles);
  roles = new FormControl([] as Roles[]);

  constructor(private userService: UserService) {
    this.roles.valueChanges.subscribe((values) => { this.newUser.roles = values || []; })
  }

  ngOnInit(): void {
  }

  createNewUser() {
    return this.userService.postUser(this.newUser)
      .pipe(tap(() => {
        this.newUser = this.emptyUser();
      })).subscribe();
  }

  emptyUser() {
    return {
      firstname: "",
      lastname: "",
      email: "",
      roles: [],
      receivedCredits: 0,
      creditsToPlace: 0,
      assignedUsers: [],
      password: "",
    };
  }
}
