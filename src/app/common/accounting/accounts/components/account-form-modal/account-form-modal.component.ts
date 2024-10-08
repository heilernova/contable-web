import { Component, Inject, inject, signal } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NZ_MODAL_DATA, NzModalModule, NzModalRef } from 'ng-zorro-antd/modal';
import { AccountsService, IAccount } from '../../accounts.service';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Account } from '../../models/account.model';
import { PucDataSourceService } from '@app/common/data/puc';
import { AccountsDataSourceService, ITreeAccountNode } from '../../accounts-data-source.service';
import { IPucAccount } from '@app/common/data/puc/puc.interface';
import { NzSelectModule } from 'ng-zorro-antd/select';

@Component({
  selector: 'app-account-form-modal',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NzInputModule,
    NzButtonModule,
    NzFormModule,
    NzModalModule,
    NzSelectModule
  ],
  templateUrl: './account-form-modal.component.html',
  styleUrl: './account-form-modal.component.scss'
})
export class AccountFormModalComponent {
  private readonly _accountsDataSource = inject(AccountsDataSourceService);
  private readonly _pucDataSource: PucDataSourceService = inject(PucDataSourceService);
  private _pucList: IPucAccount[] = [];
  private _tree: ITreeAccountNode[] = [];

  private readonly _accounts: AccountsService = inject(AccountsService);
  private readonly _nzModalRef = inject(NzModalRef);
  private readonly _nzMessage = inject(NzMessageService);

  
  public readonly maxLen = signal<number>(8);

  public readonly formGroup = new FormGroup({
    code: new FormControl<string>("", { nonNullable: true, validators: Validators.required }),
    name: new FormControl<string>("", { nonNullable: true, validators: Validators.required }),
    description: new FormControl<string>("", { nonNullable: true }),
  })

  public readonly formArray = new FormArray<FormGroup<{ code: FormControl<string>, name: FormControl<string>, description: FormControl<string> }>>([]);

  public readonly controlList = signal<{ field: string, disable: boolean, formGroup:  FormGroup<{ code: FormControl<string>, name: FormControl<string>, description: FormControl<string> }>}[]>([])

  constructor(@Inject(NZ_MODAL_DATA) public readonly data?: { type: "group" | "account" | "subAccount" | "auxiliary", code: string } | Account ){

    if (this.data instanceof Account){

    } else {

      if (this.data){
        let data = this.data;
  
        Promise.all([
          this._accountsDataSource.getTree(),
          this._pucDataSource.getTree(),
          this._pucDataSource.getAll()
        ]).then(res => {
    
          this.controlList.update(list => {

            let tree = res[0][0];

            list.push({
              field: "Clase",
              disable: true,
              formGroup: new FormGroup({
                code: new FormControl(tree.code, { nonNullable: true }),
                name: new FormControl("", { nonNullable: true }),
                description: new FormControl("", { nonNullable: true }),
              })
            })

            return list;
          })
          if (data.type == "group"){
          }
          
    
        })
      }
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
    
    if (this.data instanceof Account){
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
