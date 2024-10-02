import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThirdModalComponent } from './third-modal.component';

describe('ThirdModalComponent', () => {
  let component: ThirdModalComponent;
  let fixture: ComponentFixture<ThirdModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThirdModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThirdModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
