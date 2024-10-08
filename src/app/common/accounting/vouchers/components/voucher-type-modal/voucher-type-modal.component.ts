import { Component, Inject } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NZ_MODAL_DATA, NzModalModule } from 'ng-zorro-antd/modal';
import { VoucherType } from '../../model/voucher-type.model';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-voucher-type-modal',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NzModalModule,
    NzInputModule,
    NzFormModule,
    NzButtonModule
  ],
  templateUrl: './voucher-type-modal.component.html',
  styleUrl: './voucher-type-modal.component.scss'
})
export class VoucherTypeModalComponent {

  public readonly formGroup = new FormGroup({
    name: new FormControl<string>("", { nonNullable: true, validators: Validators.required }),
    abbreviation: new FormControl<string>("", { nonNullable: true }),
    description: new FormControl<string>("", { nonNullable: true }),
  })

  constructor(@Inject(NZ_MODAL_DATA) public readonly data?: VoucherType ){
    if (data){
      this.formGroup.setValue({
        name: data.name,
        abbreviation: data.abbreviation ?? "",
        description: data.description ?? ""
      })
    }
  }
}
