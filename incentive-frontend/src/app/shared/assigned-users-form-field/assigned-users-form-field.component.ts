import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserService } from '../user.service';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import {
  lastValueFrom,
  map,
  of,
  Subject,
  switchMap,
  withLatestFrom,
} from 'rxjs';
import { User } from '../user.model';

@Component({
  selector: 'app-assigned-users-form-field',
  templateUrl: './assigned-users-form-field.component.html',
  styleUrls: ['./assigned-users-form-field.component.scss'],
})
export class AssignedUsersFormFieldComponent implements OnInit {
  // for two-way binding, the input and output properties have to follow a specific name schema:
  // input: <propertyName>
  // output: <propertyName>Change
  @Input() set assignedUsers(userIds: string[]) {
    Promise.all(
      userIds.map((userId) => {
        return lastValueFrom(this.userService.getUser(userId));
      })
    ).then((users) => {
      this.assignedUsersExpanded = users;
    });
  }
  @Output() assignedUsersChange = new EventEmitter<string[]>();

  assignedUsersExpanded: User[] = [];

  isAdministrator$ = this.userService.getUser().pipe(
    map((user) => {
      return user.isAdministrator();
    })
  );
  allUsers$ = this.isAdministrator$.pipe(
    switchMap((isAdmin) => {
      if (isAdmin) {
        return this.userService.getAllUsers();
      }
      return of([]);
    })
  );

  updateSelectionTrigger = new Subject<void>();
  usersInSelection$ = this.updateSelectionTrigger.pipe(
    // filter out own user
    withLatestFrom(this.userService.getUser(), this.allUsers$),
    map(([unused, currentUser, allUsers]) => {
      return allUsers.filter((user) => user._id !== currentUser._id);
    }),
    // filter out already assigned users
    map((users: User[]) => {
      return users.filter((user) => {
        return !this.assignedUsersExpanded.find(
          (assignedUser) => assignedUser._id === user._id
        );
      });
    })
  );

  separatorKeysCodes: number[] = [ENTER, COMMA];
  userCtrl = new FormControl('');

  constructor(private readonly userService: UserService) {}

  ngOnInit() {
    this.updateSelectionTrigger.next();
  }

  assign(event: unknown) {
    const { value } = (event as MatAutocompleteSelectedEvent).option;
    this.assignedUsersChange.emit([
      ...this.assignedUsersExpanded.map((user) => user._id),
      value._id,
    ]);
    this.updateSelectionTrigger.next();
  }

  unassign(userId: string) {
    const assignedUsers = this.assignedUsersExpanded.map((user) => user._id);
    const idx = assignedUsers.findIndex((id) => id === userId);
    assignedUsers.splice(idx, 1);
    this.assignedUsersChange.emit(assignedUsers);
    this.updateSelectionTrigger.next();
  }
}
