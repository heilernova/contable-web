import { Component, Inject, inject, ViewChild } from '@angular/core';
import { CompanyFormComponent } from '../company-form/company-form.component';
import { NZ_MODAL_DATA, NzModalModule, NzModalRef } from 'ng-zorro-antd/modal';
import { Company } from '../../company.model';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzMessageService } from 'ng-zorro-antd/message';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiCompaniesService } from '@app/api/companies';
import { CompaniesService } from '../../companies.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company-form-modal',
  standalone: true,
  imports: [
    CompanyFormComponent,
    NzModalModule,
    NzButtonModule
  ],
  templateUrl: './company-form-modal.component.html',
  styleUrl: './company-form-modal.component.scss'
})
export class CompanyFormModalComponent {
  private readonly _nzModalRef =  inject(NzModalRef);
  private readonly _nzMessage = inject(NzMessageService);
  private readonly _companies = inject(CompaniesService);

  @ViewChild(CompanyFormComponent)
  public companyForm!: CompanyFormComponent;

  constructor(@Inject(NZ_MODAL_DATA) public readonly data: Company | undefined){
    
  }


  onClickClose(): void {
    this._nzModalRef.destroy();
  }

  onClickSave(): void {

    if (this.companyForm.formGroup.invalid){
      this._nzMessage.warning("Faltan campos por completar");
      Object.values(this.companyForm.formGroup.controls).forEach(control => {
        if (control.invalid){
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true })
        }
      })
      return;
    }

    let values = this.companyForm.getRawValues();
    if (this.data){
      this.data.update(values)
      .then(() => {
        this._nzMessage.success("Datos actualizados");
        this._nzModalRef.destroy();
      })
      .catch(err => {
        if (err instanceof HttpErrorResponse){
          this._nzMessage.error(err.error.message);
        } else {
          this._nzMessage.error(err.message ?? "");
        }
      })
    } else {
      // Registrar n
      this._companies.list.add(values)
      .then(company => {
        this._nzModalRef.destroy(company);
      }).catch(err => {
        this._nzMessage.error(err.error.message);
      })
    }
  }
}
