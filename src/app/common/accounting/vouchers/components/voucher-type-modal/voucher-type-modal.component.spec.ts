import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoucherTypeModalComponent } from './voucher-type-modal.component';

describe('VoucherTypeModalComponent', () => {
  let component: VoucherTypeModalComponent;
  let fixture: ComponentFixture<VoucherTypeModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VoucherTypeModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoucherTypeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
