import { Component, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
@Component({
  selector: 'confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss'],
  animations: [
    trigger(
      'inOutAnimation',
      [
        transition(
          ':enter',
          [
            style({ top: "35%", opacity: 0 }),
            animate('0.15s ease-out',
                    style({ top: "40%", opacity: 1 }))
          ]
        ),
        transition(
          ':leave',
          [
            style({ top: "40%", opacity: 1 }),
            animate('0.15s ease-in',
                    style({ top: "35%", opacity: 0 }))
          ]
        )
      ]
    )
  ]
})
export class ConfirmationDialogComponent {
  @Output() onClickEvent = new EventEmitter<boolean>();
  visible: boolean = true;
  animationDuration = 150;

  emitEvent(result: boolean) {
    this.visible = false;
    setTimeout(() => this.onClickEvent.emit(result), this.animationDuration + 150)
  }
  onClickYes() {
    this.emitEvent(true);
  }
  onClickNo() {
    this.emitEvent(false);
  }
}
