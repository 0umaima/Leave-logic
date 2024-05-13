import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-floatpop',
  standalone: true,
  template: `
    <ng-template #content let-modal>
      <div class="modal-header">
        <h4 class="modal-title">Modal title</h4>
        <button type="button" class="close" aria-label="Close" (click)="modal.dismiss('Cross click')">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <p>{{ content }}</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" (click)="modal.close('Close click')">Close</button>
      </div>
    </ng-template>
  `,
})
export class NgbdModalBasic {
  content: any;
  constructor(private modalService: NgbModal) {}
  @Output() save = new EventEmitter<string>();

  open(content: any) {
    const modalRef = this.modalService.open(this.content, { size: 'lg' , scrollable :true });
    modalRef.componentInstance.content = content;
  }
}
