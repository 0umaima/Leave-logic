import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgbToast } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from './services/toast.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgbToast, NgFor],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'leave-logic';
  toasts:any = []
  constructor(private toastService: ToastService) {
    this.toasts = this.toastService.toasts
  }
}
