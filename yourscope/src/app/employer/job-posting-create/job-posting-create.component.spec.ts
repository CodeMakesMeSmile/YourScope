import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobPostingCreateComponent } from './job-posting-create.component';

describe('JobPostingCreateComponent', () => {
  let component: JobPostingCreateComponent;
  let fixture: ComponentFixture<JobPostingCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JobPostingCreateComponent]
    });
    fixture = TestBed.createComponent(JobPostingCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
