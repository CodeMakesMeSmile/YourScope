import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { APIService } from 'src/app/services/api.service';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.scss']
})
export class CreateCourseComponent {
  code : string = '';
  name : string = '';
  description : string = '';
  discipline: string = '';
  type : string = '';
  grade : number | string = '';
  credits : number | string = '';
  prerequisites : string = '';
  
  constructor(private router : Router, private hc : APIService) { }

  save() {
    if(this.code == '') {
      alert('Please enter course code');
      return;
    }
    if(this.description == '') {
      alert('Please enter course description');
      return;
    }
    if(this.name == '') {
      alert('Please enter course name');
      return;
    }
    if(this.discipline == '') {
      alert('Please enter course discipline');
      return;
    }
    if(this.type == '') {
      alert('Please enter course type');
      return;
    }
    if(this.credits == '' || <number>this.credits < 1) {
      alert('Please enter a valid numnber of credits');
      return;
    }
    if(this.grade == '' || <number>this.grade < 9) {
      alert('Please enter a valid grade');
      return;
    }

    this.hc.createCourse(this.code, this.name, this.discipline, this.type, <number>this.grade, <number>this.credits, this.description, this.prerequisites).subscribe({
      next: res => {
        alert("Successfully added course");
        this.router.navigate(['/admin/courses']);
      }, 
      error: err => {
        alert(err.message);
      }
    });
  }
}
