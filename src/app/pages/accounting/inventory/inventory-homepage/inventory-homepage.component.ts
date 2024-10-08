import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';

@Component({
  selector: 'app-inventory-homepage',
  standalone: true,
  imports: [
    NzCardModule,
    NzButtonModule,
    RouterLink
  ],
  templateUrl: './inventory-homepage.component.html',
  styleUrl: './inventory-homepage.component.scss'
})
export class InventoryHomepageComponent {

}
