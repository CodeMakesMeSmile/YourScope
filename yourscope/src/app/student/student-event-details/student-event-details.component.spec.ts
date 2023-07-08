import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentEventDetailsComponent } from './student-event-details.component';

describe('StudentEventDetailsComponent', () => {
  let component: StudentEventDetailsComponent;
  let fixture: ComponentFixture<StudentEventDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentEventDetailsComponent]
    });
    fixture = TestBed.createComponent(StudentEventDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
