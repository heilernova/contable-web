import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav-lateral',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './nav-lateral.component.html',
  styleUrl: './nav-lateral.component.scss'
})
export class NavLateralComponent {
  public readonly subMenu = signal<{ name: string, icon: string, link: string }[]>([]);
}
