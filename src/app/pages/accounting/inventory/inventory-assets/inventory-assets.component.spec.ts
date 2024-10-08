import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryAssetsComponent } from './inventory-assets.component';

describe('InventoryAssetsComponent', () => {
  let component: InventoryAssetsComponent;
  let fixture: ComponentFixture<InventoryAssetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InventoryAssetsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventoryAssetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
