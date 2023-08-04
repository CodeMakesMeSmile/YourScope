import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CoverLetter } from '../cover-letter-view/cover-letter-view.component';

@Component({
  selector: 'cover-letter',
  templateUrl: './cover-letter.component.html',
  styleUrls: [
    './cover-letter.component.scss',
    '../cover-letter-view/cover-letter-view.component.scss',
    '../../admin/dashboard-admin/dashboard-admin.component.scss'
  ]
})
export class CoverLetterComponent {
  // Properties
  @Input() coverLetter: CoverLetter | undefined;
  @Output() onClickDeleteEvent = new EventEmitter<CoverLetter>();

  // Display
  confirm = false;
  displayCoverLetter = false;

  // Methods
  onClickClosePopup() {
    this.displayCoverLetter = false;
  }
  onClickDetails() {
    this.displayCoverLetter = true;
  }
  onClickDelete() {
    this.confirm = true;
  }
  onConfirmResult(result: boolean) {
    console.log(`Hit with ${result}`);
    if (result)
      this.onClickDeleteEvent.emit(this.coverLetter);
    this.confirm = false;
  }
}
