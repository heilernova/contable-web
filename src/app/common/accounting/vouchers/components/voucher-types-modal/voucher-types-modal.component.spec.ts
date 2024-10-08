import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoucherTypesModalComponent } from './voucher-types-modal.component';

describe('VoucherTypesModalComponent', () => {
  let component: VoucherTypesModalComponent;
  let fixture: ComponentFixture<VoucherTypesModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VoucherTypesModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoucherTypesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
