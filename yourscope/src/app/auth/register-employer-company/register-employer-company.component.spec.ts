import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterEmployerCompanyComponent } from './register-employer-company.component';

describe('RegisterEmployerCompanyComponent', () => {
  let component: RegisterEmployerCompanyComponent;
  let fixture: ComponentFixture<RegisterEmployerCompanyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterEmployerCompanyComponent]
    });
    fixture = TestBed.createComponent(RegisterEmployerCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
