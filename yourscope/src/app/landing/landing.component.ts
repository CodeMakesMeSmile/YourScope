import { Component, inject } from '@angular/core';
import { Database, ref, set } from '@angular/fire/database';
import { APIService } from '../services/api.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {
  title = 'yourscope';

  private database: Database = inject(Database);

  constructor(private api: APIService) { }

  addFireData() {
    const test = ref(this.database, '/test')
    const d = new Date();
    let time = d.getTime();
    set(test, {
      currTime: time
    });
  }

  addSQLData() {
    const url = 'https://localhost:7184/api/Test/v1/add-to-database';
    const data = { Title: "Tested", Description: "Tested" };
    this.api.post(url, data).subscribe(res => {
      console.log(res);
    });
  }
}
