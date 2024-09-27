import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NzInputCellphoneComponent } from './nz-input-cellphone.component';

describe('NzInputCellphoneComponent', () => {
  let component: NzInputCellphoneComponent;
  let fixture: ComponentFixture<NzInputCellphoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NzInputCellphoneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NzInputCellphoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
