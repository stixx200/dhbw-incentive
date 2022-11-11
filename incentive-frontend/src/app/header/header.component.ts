import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from '../shared/auth.service';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  private currentUser$ = this.userService.getCurrentUser();

  isAdministrator$ = this.userService.getCurrentUser().pipe(map((user) => {
    return user?.isAdministrator();
  }))

  constructor(private router: Router, private readonly authService: AuthService, private readonly userService: UserService) { }

  isAdminUser() {
    return this.currentUser$.pipe(map((user) => user?.isAdministrator()));
  }

  isLoggedIn() {
    return this.authService.hasAccessToken();
  }

  ngOnInit(): void {
  }

  async logout() {
    this.authService.reset();
    await this.router.navigate(["/login"]);
  }
}
