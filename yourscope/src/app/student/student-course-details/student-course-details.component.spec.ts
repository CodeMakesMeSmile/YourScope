import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentCourseDetailsComponent } from './student-course-details.component';

describe('StudentCourseDetailsComponent', () => {
  let component: StudentCourseDetailsComponent;
  let fixture: ComponentFixture<StudentCourseDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentCourseDetailsComponent]
    });
    fixture = TestBed.createComponent(StudentCourseDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
