import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-student-posting-details',
  templateUrl: './student-posting-details.component.html',
  styleUrls: ['./student-posting-details.component.scss']
})
export class StudentPostingDetailsComponent {
  @Input() selected: any = {};
}
