import { Component, inject, Inject, signal } from '@angular/core';
import { NZ_MODAL_DATA, NzModalModule, NzModalRef } from 'ng-zorro-antd/modal';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { Router } from '@angular/router';
import { Company } from '../../company.model';
@Component({
  selector: 'app-company-preview-info-modal',
  standalone: true,
  imports: [
    NzModalModule,
    NzButtonModule
  ],
  templateUrl: './company-preview-info-modal.component.html',
  styleUrl: './company-preview-info-modal.component.scss'
})
export class CompanyPreviewInfoModalComponent {
  private readonly _router = inject(Router);
  private readonly _nzModalRef = inject(NzModalRef);

  public readonly accountName = signal<string>("");
  constructor(@Inject(NZ_MODAL_DATA) public readonly  data: Company){
    this.accountName.set(data.nit);
  }


  onClickMoreInfo(): void {
    this._router.navigate(["/empresas", this.data.id]);
    this._nzModalRef.destroy();
  }

  onClickEdit(): void {
    this.data.edit();
    this._nzModalRef.destroy();
  }
}
