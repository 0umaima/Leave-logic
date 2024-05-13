import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { EMPLOYEES, Employees } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private users: Employees[] = EMPLOYEES; // here the list users
private authenticatedUser?: Employees;
  userId: number | undefined;

  constructor() {
    this.loadUser();
   }
   

   public login(email: string, password: string): Observable<Employees>{
    console.log("Login attempt with email:", email, "password:", password);
    const appUser = this.users.find(u => u.email === email);
    if (!appUser) return throwError(() => new Error("User not found"));
    if (appUser.password !== password) return throwError(() => new Error("Wrong credentials"));
    return of(appUser);
   }

   public autheticateUser(appUser: Employees) : Observable<boolean> {
    this.authenticatedUser = appUser;
    this.userId = appUser.id;
    localStorage.setItem("authUser", JSON.stringify({email: appUser.email, roles: appUser.role, jwt: "JWT_TOKEN"}));
    return of(true);
   }

   public hasRole (role: string): boolean {
    return this.authenticatedUser ? this.authenticatedUser.role.includes(role) : false;
   }

   public isAuthenticated () {
    return this.authenticatedUser!= undefined;
   }

   public getUserId(): number | undefined {
    return this.userId; // Return the stored user ID
  }


   public logout (): Observable<boolean>  {
    this.authenticatedUser = undefined;
    this.userId= undefined;
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
