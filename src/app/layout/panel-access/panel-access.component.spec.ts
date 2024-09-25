import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelAccessComponent } from './panel-access.component';

describe('PanelAccessComponent', () => {
  let component: PanelAccessComponent;
  let fixture: ComponentFixture<PanelAccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelAccessComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanelAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
