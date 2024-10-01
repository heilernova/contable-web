import { Component, Inject, inject } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NZ_MODAL_DATA, NzModalModule, NzModalRef } from 'ng-zorro-antd/modal';
import { AccountsService, IAccount } from '../../accounts.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Account } from '../../account.model';

@Component({
  selector: 'app-account-form-modal',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NzInputModule,
    NzButtonModule,
    NzFormModule,
    NzModalModule,
  ],
  templateUrl: './account-form-modal.component.html',
  styleUrl: './account-form-modal.component.scss'
})
export class AccountFormModalComponent {
  private readonly _accounts: AccountsService = inject(AccountsService);
  private readonly _nzModalRef = inject(NzModalRef);
  private readonly _nzMessage = inject(NzMessageService);

  public readonly formGroup = new FormGroup({
    code: new FormControl<string>("", { nonNullable: true, validators: Validators.required }),
    name: new FormControl<string>("", { nonNullable: true, validators: Validators.required }),
    description: new FormControl<string>("", { nonNullable: true }),
  })

  constructor(@Inject(NZ_MODAL_DATA) public readonly data: Account | undefined){
    if (data){
      this.formGroup.setValue({
        code: data.code,
        name: data.name,
        description: data.description ?? ""
      });
      this.formGroup.controls.code.disable();
    }
  }

  onClickSave(): void {
    if (this.formGroup.invalid){
      return;
    }
    let formValues: {
      code: string;
      name: string;
      description: string | null;
    } = this.formGroup.getRawValue();

    formValues.description = formValues.description ? formValues.description : null;
    
    if (this.data){
      this.data.update(formValues).then(() => {
        this._nzMessage.success("Datos actualizados");
      })
      .catch(err => {
        this._nzMessage.error("No se pudo actualizar la información")
      })
    } else {
      this._accounts.accountList.create(formValues).then(res => {
        this._nzMessage.success("Cuenta registrada");
        this._nzModalRef.close(res)
      })
      .catch(err => {
        this._nzMessage.error("No se pudo registrar la cuenta")
      });
    }
  }

  onClickClose(): void {
    this._nzModalRef.close();
  }
}
