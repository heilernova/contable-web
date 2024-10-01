import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountFormModalComponent } from './account-form-modal.component';

describe('AccountFormModalComponent', () => {
  let component: AccountFormModalComponent;
  let fixture: ComponentFixture<AccountFormModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountFormModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
