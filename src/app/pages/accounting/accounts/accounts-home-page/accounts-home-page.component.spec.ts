import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsHomePageComponent } from './accounts-home-page.component';

describe('AccountsHomePageComponent', () => {
  let component: AccountsHomePageComponent;
  let fixture: ComponentFixture<AccountsHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountsHomePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountsHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
