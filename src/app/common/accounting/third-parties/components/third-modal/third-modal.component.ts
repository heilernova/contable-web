import { AfterViewInit, Component, Inject, inject, ViewChild } from '@angular/core';
import { ThirdFormComponent } from "../third-form/third-form.component";
import { NzMessageService } from 'ng-zorro-antd/message';
import { NZ_MODAL_DATA, NzModalModule, NzModalRef } from 'ng-zorro-antd/modal';
import { Third } from '../../third.model';
import { ThirdPartiesService } from '../../services/third-parties.service';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-third-modal',
  standalone: true,
  imports: [ThirdFormComponent, NzModalModule, NzButtonModule],
  templateUrl: './third-modal.component.html',
  styleUrl: './third-modal.component.scss'
})
export class ThirdModalComponent implements AfterViewInit {
  private readonly _thirdParties = inject(ThirdPartiesService);
  
  public readonly _nzMessage = inject(NzMessageService);
  public readonly _nzModalRef = inject(NzModalRef);


  @ViewChild(ThirdFormComponent) form!: ThirdFormComponent;

  constructor(@Inject(NZ_MODAL_DATA) private data: Third | undefined){
    
  }
  ngAfterViewInit(): void {
    let data = this.data;
    if (data){
      this.form.formGroup.setValue({
        isCustomer: data.isCustomer,
        isSupplier: data.isSupplier,
        taxpayerType: data.taxpayerType,
        nit: data.nit,
        name: data.name ?? "",
        lastName: data.lastName ?? "",
        companyName: data.companyName ?? "",
        tradeName: data.tradeName ?? "",
        cellphone: data.cellphone,
        email: data.email ?? "",
        department: data.department,
        city: data.city,
        address: data.address,
        economicActivities: data.economicActivities,
        responsibilities: data.responsibilities
      });
    }
  }

  onClickClose(): void {
    this._nzModalRef.close();
  }

  onClickSave(): void {
    
    if (this.form.formGroup.invalid){
      this._nzMessage.warning("Faltan campos por completar");
      return;
    }
    
    let values = this.form.getRawValues();


    if (this.data){
      this.data.update(values).then(() => {
        this._nzMessage.success("Datos actualizados correctamente");
        this._nzModalRef.close();
      }).catch(err => {
        this._nzMessage.error("No se pudo actualizar la información");
      })
    } else {
      this._thirdParties.create(values).then(res => {
        this._nzMessage.success("Tercero creado correctamente");
        this._nzModalRef.close(res);
      })
      .catch(err => {
        this._nzMessage.error("No se pudo crear el tercero");
      })
    }
  }
}
