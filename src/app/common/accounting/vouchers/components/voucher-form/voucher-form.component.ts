import { Component, inject, signal } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccountsService } from '@app/common/accounting/accounts';
import { Account } from '@app/common/accounting/accounts/models/account.model';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { Platform } from '@angular/cdk/platform';
import { Third, ThirdPartiesService } from '@app/common/accounting/third-parties';
import { NzInputCurrencyComponent } from '@app/ui/nz-input-currency';
import { CommonModule } from '@angular/common';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray } from '@angular/cdk/drag-drop';
import { IVoucherType, VoucherTypesService } from '../../services/voucher-types.service';


@Component({
  selector: 'app-voucher-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzInputModule,
    NzButtonModule,
    NzSelectModule,
    NzFormModule,
    NzListModule,
    NzInputCurrencyComponent,
    NzDatePickerModule,
    CdkDropList,
    CdkDrag
  ],
  templateUrl: './voucher-form.component.html',
  styleUrl: './voucher-form.component.scss'
})
export class VoucherFormComponent {
  private readonly _accounts = inject(AccountsService);
  private readonly _voucherTypes = inject(VoucherTypesService);
  private readonly _platform = inject(Platform);
  private readonly _thirdParties = inject(ThirdPartiesService);

  
  public readonly accounts = signal<Account[]>([]);
  public readonly voucherTypes = signal<IVoucherType[]>([]);
  public readonly thirdParties = signal<Third[]>([]);

  public readonly formGroup = createForm();

  public readonly recordAccounts = signal<FormRecordAccount[]>([]);
  public debit = new FormControl<number>(9);
  public credit = new FormControl<number>(9);
  public invalidRecordAccounts = signal<boolean>(false);
  

  constructor(){
    if (this._platform.isBrowser){
      this._accounts.accountList.getAll().then(list => {
        this.accounts.set(list.filter(x => x.code.length == 8));
      });

      this._thirdParties.getAll().then(list => {
        this.thirdParties.set(list);
      })
    }

    this._voucherTypes.getAll()
    .then(list => {
      this.voucherTypes.set(list);
    })
    .catch(err => {

    })
    this.formGroup.controls.accounts.valueChanges.subscribe(values => {
      let debit = 0;
      let credit = 0;
      values.forEach(x => {
        debit = debit + (x.debit ?? 0);
        credit = credit + (x.credit ?? 0);
      });

      this.debit.setValue(debit);
      this.credit.setValue(credit);
      this.invalidRecordAccounts.set(debit != credit);
    })

    this.onRecordAccountAdd();
  }

  onOpenVoucherTypes(): void {
    this._voucherTypes.select();
  }

  // onAddAccount(): void {
  //   let formGroup = new FormGroup({
  //     id: new FormControl<string | null>(null),
  //     accountId: new FormControl<string>("", { nonNullable: true, validators: Validators.required }),
  //     thirdId: new FormControl<string>("", { nonNullable: true, validators: Validators.required }),
  //     description: new FormControl<string>("", { nonNullable: true }),
  //     debit: new FormControl<number>(0, { nonNullable: true }),
  //     credit: new FormControl<number>(0, { nonNullable: true }),
  //   });

  //   this.recordAccounts.update(l => [...l, formGroup]);
  //   this.formGroup.controls.accounts.push(formGroup);
  // }

  // onRemoveRecordAccount(index: number): void {
  //   this.formGroup.controls.accounts.removeAt(index);
  // }

  onRecordAccountAdd(): void {
    let formGroup = new FormGroup({
      id: new FormControl<string | null>(null),
      accountId: new FormControl<string>("", { nonNullable: true, validators: Validators.required }),
      thirdId: new FormControl<string>("", { nonNullable: true, validators: Validators.required }),
      description: new FormControl<string>("", { nonNullable: true }),
      debit: new FormControl<number>(0, { nonNullable: true }),
      credit: new FormControl<number>(0, { nonNullable: true }),
    });

    this.formGroup.controls.accounts.push(formGroup);
    // this.recordAccounts.update(list => {
    //   list = [...list, formGroup];
    //   this.formGroup.controls.accounts.controls = list;
    //   return list;
    // });
  }

  onRegisterNewAccount(index: number): void {
    this._accounts.register().then(value => {
      if (value){
        this.formGroup.controls.accounts.at(index).controls.accountId.setValue(value.id);
      }
    })
  }
  
  
  onRegisterThird(index: number): void {
    this._thirdParties.register().then(res => {
      if (res){
        this.recordAccounts()[index].controls.thirdId.setValue(res.id);
      }
    })
  }

  moveItemInFormArray(
    formArray: FormArray,
    fromIndex: number,
    toIndex: number
  ): void {
    const dir = toIndex > fromIndex ? 1 : -1;
  
    const item = formArray.at(fromIndex);
    for (let i = fromIndex; i * dir < toIndex * dir; i = i + dir) {
      const current = formArray.at(i + dir);
      formArray.setControl(i, current);
    }
    formArray.setControl(toIndex, item);
  }
  
  drop(event: CdkDragDrop<any[]>) {
    this.moveItemInFormArray(this.formGroup.controls.accounts, event.previousIndex, event.currentIndex);

  }


  getRawValues(): void {
    console.log(this.formGroup.getRawValue());
    console.log(this.recordAccounts().map(x => x.getRawValue()));
  }
}

const createForm = () => new FormGroup({
  accounts: new FormArray<FormRecordAccount>([])
});

type FormRecordAccount = FormGroup<{ id: FormControl<string | null>, accountId: FormControl<string>, thirdId: FormControl<string>, description: FormControl<string>, debit: FormControl<number>, credit: FormControl<number> }>;
