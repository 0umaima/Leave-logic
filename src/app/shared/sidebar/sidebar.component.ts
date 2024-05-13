import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, NgIf],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
  isHR: boolean = false;
  isManager: boolean = false;

  ngOnInit() {
    this.checkUserRoles();
  }

  checkUserRoles() {
    const user = localStorage.getItem('authUser');
    if (user) {
      const parsedUser = JSON.parse(user);
      const roles = parsedUser.roles;
      this.isHR = roles.includes('HR');
      this.isManager = roles.includes('Manager');
    }
  }

}
