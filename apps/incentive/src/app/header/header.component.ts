import { Component, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from '../shared/auth.service';
import { UserService } from '../shared/user.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    RouterLink,
    AsyncPipe,
  ],
  selector: 'incentive-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() title!: string;
  private currentUser$ = this.userService.getCurrentUser();

  isAdministrator$ = this.userService.getCurrentUser().pipe(
    map((user) => {
      return user?.isAdministrator();
    })
  );

  constructor(
    private router: Router,
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) {}

  isAdminUser() {
    return this.currentUser$.pipe(map((user) => user?.isAdministrator()));
  }

  isLoggedIn() {
    return this.authService.hasAccessToken();
  }

  async logout() {
    this.authService.reset();
    await this.router.navigate(['/login']);
  }
}
