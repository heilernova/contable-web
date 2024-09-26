import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-nav-lateral',
  standalone: true,
  imports: [],
  templateUrl: './nav-lateral.component.html',
  styleUrl: './nav-lateral.component.scss'
})
export class NavLateralComponent {
  public readonly subMenu = signal<{ name: string, icon: string, link: string }[]>([]);
}
