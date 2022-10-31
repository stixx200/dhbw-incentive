import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { User } from '../shared/user.model';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user!: User;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  userCtrl = new FormControl('');
  @ViewChild('assignedUsersInput') assignedUsersInput!: ElementRef<HTMLInputElement>;
  allUsers?: User[];

  constructor(private readonly userService: UserService) { }

  async ngOnInit(): Promise<void> {
    await this.reloadUser();
    if (this.user.isTeamleader()) {
      this.allUsers = await this.userService.getAllUsers();
    }
  }
  
  async reloadUser() {
    this.user = await this.userService.getUser();
  }

  async saveUser() {
    await this.userService.patchUser(this.user);
  }

  assign(event: unknown) {
    console.log(event);
  }

  unassign(userId: string) {
    const idx = this.user.assignedUsers.findIndex(id => (id === userId));
    this.user.assignedUsers.splice(idx, 1);
  }
}
