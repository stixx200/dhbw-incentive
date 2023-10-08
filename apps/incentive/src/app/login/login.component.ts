import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../shared/auth.service';
import { AppHttpClient } from '../shared/http-client.service';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  imports: [MatCardModule, FormsModule, MatInputModule, MatButtonModule],
  providers: [AppHttpClient],
  selector: 'incentive-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  userToLogin: { email: string; password: string } = {
    email: '',
    password: '',
  };
  errorMessage = '';

  constructor(
    private readonly http: AppHttpClient,
    private readonly router: Router,
    private readonly authService: AuthService
  ) {}

  async ngOnInit(): Promise<void> {
    if (this.authService.hasAccessToken()) {
      await this.router.navigate(['/profile']);
    }
  }

  async login() {
    try {
      const result = await firstValueFrom(
        this.http.post<{ access_token: string; userId: string }>(
          '/auth/login',
          this.userToLogin
        )
      );
      this.authService.setAccessToken(result.access_token, result.userId);
      await this.router.navigate(['/profile']);
    } catch (error: unknown) {
      this.errorMessage = (error as Error).message;
    }
  }
}
