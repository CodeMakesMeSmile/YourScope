import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Program } from '../post-secondary-view/post-secondary-view.component';

@Component({
  selector: 'program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.scss']
})
export class ProgramComponent {
  // Program information
  @Input() program: Program | undefined;
  @Input() universityName: string | undefined;
}
