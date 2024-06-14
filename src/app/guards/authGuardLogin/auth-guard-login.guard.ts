import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { AuthenticationService } from '../../services/authentication/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardLoginGuard implements CanActivate {
  constructor(
    private AuthService: AuthenticationService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> {
    return this.AuthService.returnUser().pipe(
      take(1),
      map((user) => {
        if (user) {
          this.router.navigate(['/dashboard']);
          return false;
        } else {
          return true;
        }
      })
    );
  }
}
