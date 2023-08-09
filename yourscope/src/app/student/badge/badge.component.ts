import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss']
})

export class BadgeComponent {
  // Input and output fields.
  @Input() bValue: string = '';
  @Input() bType: BadgeType | undefined;
  @Input() disable: boolean = false;
  @Output() onClickDeleteEvent: EventEmitter<BadgeOutput> = new EventEmitter<BadgeOutput>();
  // On click event.
  onClick(): void {
    let output: BadgeOutput = new BadgeOutput(this.bValue, this.bType!);
    this.onClickDeleteEvent.emit(output);
  }
}

export class BadgeOutput {
  value: string;
  type: BadgeType;

  constructor(value: string, type: BadgeType) {
    this.value = value;
    this.type = type;
  }
}

export enum BadgeType {
  Skill,
  InterestHobby,
  Award
}