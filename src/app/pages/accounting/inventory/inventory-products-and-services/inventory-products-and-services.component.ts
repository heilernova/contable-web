import { Component } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'app-inventory-products-and-services',
  standalone: true,
  imports: [
    NzButtonModule,
    NzInputModule
  ],
  templateUrl: './inventory-products-and-services.component.html',
  styleUrl: './inventory-products-and-services.component.scss'
})
export class InventoryProductsAndServicesComponent {

}
