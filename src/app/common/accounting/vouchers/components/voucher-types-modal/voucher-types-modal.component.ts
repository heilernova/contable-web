import { Component, inject, signal, WritableSignal } from '@angular/core';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { VoucherTypesDataService } from '../../services/voucher-types-data.service';
import { VoucherType } from '../../model/voucher-type.model';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { VoucherTypesService } from '../../services/voucher-types.service';

@Component({
  selector: 'app-voucher-types-modal',
  standalone: true,
  imports: [
    NzModalModule,
    NzListModule,
    NzTableModule,
    NzButtonModule
  ],
  templateUrl: './voucher-types-modal.component.html',
  styleUrl: './voucher-types-modal.component.scss'
})
export class VoucherTypesModalComponent {
  private readonly _voucherTypeDataSource: VoucherTypesDataService = inject(VoucherTypesDataService);
  private readonly _voucherTypes: VoucherTypesService = inject(VoucherTypesService);
  
  public readonly list: WritableSignal<VoucherType[]> = signal<VoucherType[]>([]);
  
  constructor(){
    this._voucherTypeDataSource.getAll().then(list => this.list.set(list));
  }


  onAdd(): void {
    this._voucherTypes.create();
  }
}
