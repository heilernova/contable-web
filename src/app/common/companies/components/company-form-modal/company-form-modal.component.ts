import { Component, Inject, inject, ViewChild } from '@angular/core';
import { CompanyFormComponent } from '../company-form/company-form.component';
import { NZ_MODAL_DATA, NzModalModule, NzModalRef } from 'ng-zorro-antd/modal';
import { Company } from '../../company.model';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzMessageService } from 'ng-zorro-antd/message';
import { HttpErrorResponse } from '@angular/common/http';

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

  @ViewChild(CompanyFormComponent)
  public companyForm!: CompanyFormComponent;

  constructor(@Inject(NZ_MODAL_DATA) public readonly data: Company | undefined){
    
  }


  onClickClose(): void {
    this._nzModalRef.destroy();
  }

  onClickSave(): void {
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
    }
  }
}
