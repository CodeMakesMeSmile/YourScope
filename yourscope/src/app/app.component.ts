import { Component, inject } from '@angular/core';
import { Database, ref, set } from '@angular/fire/database';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'yourscope';

  private database: Database = inject(Database);

  constructor() {}

  addData() {
    const test = ref(this.database, '/test')
    const d = new Date();
    let time = d.getTime();
    set(test, {
      currTime: time
    })

  }
}
