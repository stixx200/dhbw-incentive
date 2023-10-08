import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

import { RouterTestingModule } from '@angular/router/testing';
import { HeaderComponent } from './header/header.component';
import { AuthService } from './shared/auth.service';
import { UserService } from './shared/user.service';
import { of } from 'rxjs';

describe('AppComponent', () => {
  const getCurrentUserMock = jest.fn().mockReturnValue(of([]));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, HeaderComponent, RouterTestingModule],
      providers: [
        {
          provide: AuthService,
          useValue: {
            hasAccessToken: jest.fn().mockReturnValue(false),
          },
        },
        {
          provide: UserService,
          useValue: {
            getCurrentUser: getCurrentUserMock,
          },
        },
      ],
    }).compileComponents();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain(
      'Incentive Project'
    );
  });

  it(`should have as title 'incentive'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Incentive Project');
  });
});
