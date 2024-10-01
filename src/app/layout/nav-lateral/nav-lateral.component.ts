import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SessionService } from '@app/authentication';

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
  private readonly _session = inject(SessionService);
  public readonly subMenu = signal<{ name: string, icon: string, link: string }[]>([]);
  public readonly accountingMenu = signal<{ name: string, icon: string, link: string }[]>([
    { name: "Cuentas", link: "contabilidad/cuentas", icon: "fa-solid fa-table" },
    { name: "Terceros", link: "contabilidad/terceros", icon: "fa-solid fa-users" },
    { name: "Comprobantes", link: "contabilidad/comprobantes", icon: "fa-solid fa-ticket" },
    { name: "Inventario", link: "contabilidad/inventario", icon: "fa-solid fa-boxes-stacked" },
  ]);

  constructor(){

  }
}
