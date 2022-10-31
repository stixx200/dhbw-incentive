import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router, private readonly authService: AuthService) { }

  ngOnInit(): void {
  }

  async logout() {
    this.authService.reset();
    await this.router.navigate(["/login"]);
  }
}
