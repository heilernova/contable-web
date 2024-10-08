import { Component, computed, inject, input, signal } from '@angular/core';
import { AccountsDataSourceService, ITreeAccountNode } from '../../accounts-data-source.service';
import { TreeAccountNodeComponent } from "./tree-account-node/tree-account-node.component";
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { AccountsService } from '../../accounts.service';
import { Account } from '../../models/account.model';
import { Platform } from '@angular/cdk/platform';
import { TreeAccountsNode } from '../../models/account-tree.model';

@Component({
  selector: 'app-tree-accounts',
  standalone: true,
  imports: [
    TreeAccountNodeComponent,
    NzCollapseModule,
    NzButtonModule
  ],
  templateUrl: './tree-accounts.component.html',
  styleUrl: './tree-accounts.component.scss'
})
export class TreeAccountsComponent {
  private readonly _platform = inject(Platform);
  private readonly _accounts =  inject(AccountsService);
  private readonly _accountsDataSource = inject(AccountsDataSourceService);

  public readonly list = signal<TreeAccountNode[]>([]);
  
  constructor(){
    if (this._platform.isBrowser){
      this._accountsDataSource.getTree().then(list => this.list.set(list.map(x => new TreeAccountNode(x))));
    }
  }

  onClickAddAccount(node: TreeAccountNode): void {
    this._accounts.register({ type: "group", code: node.code }).then(account => {
      if (account){
        node.pushChildren(account);
      }
    });
  }

}


export class TreeAccountNode {
  private model: TreeAccountsNode;
  public readonly id: string;
  public readonly code: string;
  public readonly name: string;
  public readonly title: string;
  
  private readonly _children: TreeAccountsNode[] = [];
  private readonly _loadedChildren: boolean = false;

  public readonly children = signal<TreeAccountsNode[]>([]);

  constructor(data: TreeAccountsNode){
    this.model = data;
    this.id = data.id;
    this.code = data.code;
    this.name = data.name;
    this.title = `${data.code} - ${data.name}`;
    this._children = data.children;
  }

  loadChildren(): void {
    if (!this._loadedChildren){
      this.children.set(this._children);
    }
  }

  addChildren(){
    this.model.addChildren();
  }

  pushChildren(account: Account){
    // this._children.push({ id: account.id, code: account.code, name: account.name, children: [] });
    // this._children.sort((a, b) => a.code.localeCompare(b.code));
    // if (this._loadedChildren){
    //   this.children.set(this._children.map(x => new TreeAccountNode(x)));
    // }
  }
}