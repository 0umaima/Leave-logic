import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { NavbarComponent } from '../shared/navbar/navbar.component';

@Component({
  selector: 'app-layout-component',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, NavbarComponent],
  templateUrl: './layout-component.component.html',
  styleUrl: './layout-component.component.css'
})
export class LayoutComponentComponent {

}
