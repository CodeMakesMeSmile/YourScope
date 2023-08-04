import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissingPrereqComponent } from './missing-prereq.component';

describe('MissingPrereqComponent', () => {
  let component: MissingPrereqComponent;
  let fixture: ComponentFixture<MissingPrereqComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MissingPrereqComponent]
    });
    fixture = TestBed.createComponent(MissingPrereqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
