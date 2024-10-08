import { Component, inject, signal } from '@angular/core';
import { AccountsService } from '@app/common/accounting/accounts';
import { TreeAccountsComponent } from '@app/common/accounting/accounts/components/tree-accounts/tree-accounts.component';
import { NzFormatEmitEvent, NzTreeModule } from 'ng-zorro-antd/tree';
import { NzTreeViewModule } from 'ng-zorro-antd/tree-view';

@Component({
  selector: 'app-accounts-home-page',
  standalone: true,
  imports: [
    TreeAccountsComponent
  ],
  templateUrl: './accounts-home-page.component.html',
  styleUrl: './accounts-home-page.component.scss'
})
export class AccountsHomePageComponent {
  private readonly _accounts = inject(AccountsService);
}
