import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompaniesInfoPageComponent } from './companies-info-page.component';

describe('CompaniesInfoPageComponent', () => {
  let component: CompaniesInfoPageComponent;
  let fixture: ComponentFixture<CompaniesInfoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompaniesInfoPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompaniesInfoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
