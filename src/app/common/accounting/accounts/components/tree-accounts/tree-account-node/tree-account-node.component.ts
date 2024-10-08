import { Component, computed, inject, input, signal } from '@angular/core';
import { AccountsDataSourceService, ITreeAccountNode } from '../../../accounts-data-source.service';
import { TreeAccountNode } from '../tree-accounts.component';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzListModule } from 'ng-zorro-antd/list';
import { AccountsService } from '../../../accounts.service';

@Component({
  selector: 'app-tree-account-node',
  standalone: true,
  imports: [
    NzCollapseModule,
    NzButtonModule,
    NzListModule
  ],
  templateUrl: './tree-account-node.component.html',
  styleUrl: './tree-account-node.component.scss',
  host: {
    "(click)": "onClick()",
    "[class.active]": "active()"
  }
})
export class TreeAccountNodeComponent {
  private readonly _accountsDataSource = inject(AccountsDataSourceService);
  private readonly _accounts = inject(AccountsService);
  public readonly data = input.required<TreeAccountNode>();
  public readonly active = signal<boolean>(false);

  public readonly isAuxiliary = computed(() => this.data().code.length == 6);

  public onClick(): void {
    if (this.active()){
      this.active.set(false);
    } else {
      this.active.set(true);
    }
    console.log(this.active())
  }

  onClickEditNode(node: TreeAccountNode): void {
    console.log(node);
  }

  onClickAddAccount(node: TreeAccountNode): void {
    this._accounts.register();
  }
}
