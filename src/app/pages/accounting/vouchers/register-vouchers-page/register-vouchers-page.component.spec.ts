import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterVouchersPageComponent } from './register-vouchers-page.component';

describe('RegisterVouchersPageComponent', () => {
  let component: RegisterVouchersPageComponent;
  let fixture: ComponentFixture<RegisterVouchersPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterVouchersPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterVouchersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
