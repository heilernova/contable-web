import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NzInputCurrencyComponent } from './nz-input-currency.component';

describe('NzInputCurrencyComponent', () => {
  let component: NzInputCurrencyComponent;
  let fixture: ComponentFixture<NzInputCurrencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NzInputCurrencyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NzInputCurrencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
