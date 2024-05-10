import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgbToast } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from './services/toast.service';
import { NgbdModalBasic } from './shared/floatpop/popup.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgbToast, NgFor,NgbdModalBasic],
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
