import { Component, Output, Input, EventEmitter } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-missing-prereq',
  templateUrl: './missing-prereq.component.html',
  styleUrls: ['./missing-prereq.component.scss'],
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
export class MissingPrereqComponent {
  @Output() onClickEvent = new EventEmitter<boolean>();
  @Input() prerequisites = "";
  visible: boolean = true;
  animationDuration = 150;

  ngOnInit(){
    this.prerequisites = this.prerequisites.trim().length > 0 ? this.prerequisites.trim().replaceAll(",", " or ") : "None";
  }
  emitEvent(result: boolean) {
    this.visible = false;
    setTimeout(() => this.onClickEvent.emit(result), this.animationDuration + 150)
  }
  onClickYes() {
    this.emitEvent(true);
  }
}
