import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompaniesHomepageComponent } from './companies-homepage.component';

describe('CompaniesHomepageComponent', () => {
  let component: CompaniesHomepageComponent;
  let fixture: ComponentFixture<CompaniesHomepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompaniesHomepageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompaniesHomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
