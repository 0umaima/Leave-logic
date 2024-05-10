import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { AppUser } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
users : AppUser[] = [];
authenticatedUser: AppUser | undefined;

  constructor() {
    this.users.push({
      userId: '0', email: 'admin@admin.com', password: 'admin', roles: ['ADMIN']
    }, {
      userId: '1', email: 'user@ouma.com', password: 'ouma', roles: ['ADMIN', 'USER']
    }, {
      userId: '2', email: 'user@user.com', password: 'admin', roles: [ 'USER']
    })
   }

   public login(email: string, password: string): Observable<AppUser>{
    console.log("Login attempt with email:", email, "password:", password);
    let appUser = this.users.find(u => u.email == email)
    if(!appUser) return throwError(new Error("user not found here"))
    if(appUser.password != password) return throwError( new Error("wrong credentials"))
    return of(appUser);
   }

   public autheticateUser(appUser: AppUser) : Observable<boolean> {
    this.authenticatedUser = appUser;
    localStorage.setItem("authUser", JSON.stringify({email: appUser.email, roles: appUser.roles, jwt: "JWT_TOKEN"}));
    return of(true);
   }

   public hasRole (role: string) {
    return this.authenticatedUser!.roles.includes(role)
   }

   public isAuthenticated () {
    return this.authenticatedUser!= undefined;
   }

   public logout (): Observable<boolean>  {
    this.authenticatedUser = undefined;
    localStorage.removeItem("authUser")
    return of(true)
   }


   loadUser(){
    const user = localStorage.getItem("authUser");

    if (user) {
      this.authenticatedUser = JSON.parse(user);
    }


   }
}