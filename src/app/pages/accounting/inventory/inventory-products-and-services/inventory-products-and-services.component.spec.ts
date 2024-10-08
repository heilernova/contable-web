import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryProductsAndServicesComponent } from './inventory-products-and-services.component';

describe('InventoryProductsAndServicesComponent', () => {
  let component: InventoryProductsAndServicesComponent;
  let fixture: ComponentFixture<InventoryProductsAndServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InventoryProductsAndServicesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventoryProductsAndServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
