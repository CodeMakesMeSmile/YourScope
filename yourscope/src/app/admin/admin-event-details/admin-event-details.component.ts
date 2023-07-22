import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-admin-event-details',
  templateUrl: './admin-event-details.component.html',
  styleUrls: ['./admin-event-details.component.scss']
})
export class AdminEventDetailsComponent {
  @Input('event') selected : any = {};
}
