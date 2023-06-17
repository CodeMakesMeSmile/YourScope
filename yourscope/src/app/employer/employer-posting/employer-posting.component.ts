import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-employer-posting',
  templateUrl: './employer-posting.component.html',
  styleUrls: ['./employer-posting.component.scss']
})
export class EmployerPostingComponent {
  public id: string | null = '';

  constructor(private route:ActivatedRoute){
    this.id = this.route.snapshot.paramMap.get('id');
  }
}
