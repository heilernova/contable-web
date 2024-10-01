import { Component, inject, signal } from '@angular/core';
import { AccountsService, IAccount } from '@app/common/accounting/accounts';
import { PucService, PucTree } from '@app/common/data';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzContextMenuService, NzDropdownMenuComponent, NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { Account } from '@app/common/accounting/accounts/account.model';
import { Platform } from '@angular/cdk/platform';

@Component({
  selector: 'app-accounts-home-page',
  standalone: true,
  imports: [
    NzCollapseModule,
    NzButtonModule,
    NzListModule,
    NzDropDownModule
  ],
  templateUrl: './accounts-home-page.component.html',
  styleUrl: './accounts-home-page.component.scss'
})
export class AccountsHomePageComponent {
  private readonly _puc = inject(PucService);
  private readonly _accounts = inject(AccountsService);
  private readonly _nzContextMenuService = inject(NzContextMenuService);
  private readonly _platform = inject(Platform)
  public pucTree = signal<PucTree>([]);
  public accounts = signal<Account[]>([]);

  constructor(){
    if (this._platform.isBrowser){
      this._puc.getTree().then(tree => {
        this.pucTree.set(tree);
      })
  
      this._accounts.accountList.getAll().then(list => {
        this.accounts.set(list);
      })
    }
  }

  public onClickRegister(): void {
    this._accounts.register();
  }

  contextMenu($event: MouseEvent, menu: NzDropdownMenuComponent): void {
    this._nzContextMenuService.create($event, menu);
  }
}
