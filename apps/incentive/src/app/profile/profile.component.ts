import { Component, OnInit } from '@angular/core';
import { distinctUntilChanged, filter, Observable, Subscription } from 'rxjs';
import { IUser, User } from '../shared/user.model';
import { UserService } from '../shared/user.service';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { AsyncPipe, CommonModule } from '@angular/common';
import { AssignedUsersFormFieldComponent } from '../shared/assigned-users-form-field/assigned-users-form-field.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';

export function isNonNull<T>(value: T): value is NonNullable<T> {
  return value != null;
}

@Component({
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatInputModule,
    FormsModule,
    AsyncPipe,
    AssignedUsersFormFieldComponent,
    MatDividerModule,
    MatButtonModule,
  ],
  selector: 'incentive-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user$: Observable<User> = this.userService
    .getCurrentUser()
    .pipe(filter(isNonNull), distinctUntilChanged());
  user!: IUser;
  sub?: Subscription;

  constructor(private readonly userService: UserService) {}

  ngOnInit() {
    this.sub = this.user$.subscribe((user) => {
      this.user = { ...user };
    });
  }

  ngOnDeinit() {
    this.sub?.unsubscribe();
  }

  async saveUser() {
    console.log(this.user);
    this.userService.patchUser(this.user._id, {
      firstname: this.user.firstname,
      lastname: this.user.lastname,
      email: this.user.email,
      assignedUsers: this.user.assignedUsers,
    });
  }
}
