import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyPreviewInfoModalComponent } from './company-preview-info-modal.component';

describe('CompanyPreviewInfoModalComponent', () => {
  let component: CompanyPreviewInfoModalComponent;
  let fixture: ComponentFixture<CompanyPreviewInfoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyPreviewInfoModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyPreviewInfoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
