import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const user = localStorage.getItem('authUser');
    if (user) {
      const parsedUser = JSON.parse(user);
      const roles = parsedUser.roles;
      const expectedRoles = route.data['roles'] as Array<string>;

      if (expectedRoles.some(role => roles.includes(role))) {
        return true;
      } else {
        return false;
      }
    }
    this.router.navigate(['/login']);
    return false;
  }
}
