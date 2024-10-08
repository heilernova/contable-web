import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VouchersHomepageComponent } from './vouchers-homepage.component';

describe('VouchersHomepageComponent', () => {
  let component: VouchersHomepageComponent;
  let fixture: ComponentFixture<VouchersHomepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VouchersHomepageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VouchersHomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
