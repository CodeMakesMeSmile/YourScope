import { Component, Input } from '@angular/core';

interface event {
  eventId: number,
  title: string,
  description: string,
  date: string,
  location: string,
  userId: number | null,
  user: number | null,
  schoolId: number | null,
  school: number | null
}

@Component({
  selector: 'app-student-event-details',
  templateUrl: './student-event-details.component.html',
  styleUrls: ['./student-event-details.component.scss']
})
export class StudentEventDetailsComponent {
  @Input('event') selected : event = {eventId: -1, title: "", date: "", description: "", location: "", userId:  null, user:  null, schoolId:  null, school:  null};
}
