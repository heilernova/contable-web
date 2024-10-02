import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CiiuService, ICiiu, ITaxResponsibilities, TaxResponsibilitiesService } from '@app/common/data';
import { DataLocationsService, ICity, IDepartment } from '@app/common/data/locations';
import { NzInputCellphone } from '@app/ui/nz-input-cellphone';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { IMaskModule } from 'angular-imask';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { IThirdFormValues } from '../../third.interfaces';

@Component({
  selector: 'app-third-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzModalModule,
    NzSelectModule,
    NzInputCellphone,
    IMaskModule,
    NzCheckboxModule
  ],
  templateUrl: './third-form.component.html',
  styleUrl: './third-form.component.scss'
})
export class ThirdFormComponent {

  private readonly _ciiu = inject(CiiuService);
  private readonly _taxResponsibilities = inject(TaxResponsibilitiesService);
  private readonly _dataLocations = inject(DataLocationsService);
  
  public readonly maskNit = { mask: Number, thousandsSeparator: '.', radix: '.', mapToRadix: [','], autofix: true }
  public readonly isLegal = signal<boolean>(true);
  public readonly disable = signal<boolean>(true);

  public readonly formGroup = createForm();

  public readonly listCIIU = signal<ICiiu[]>([]);
  public readonly listTaxResponsibilities = signal<ITaxResponsibilities[]>([]);
  public readonly listLocations = signal<IDepartment[]>([]);
  public readonly listCities = signal<ICity[]>([]);

  public readonly listTaxpayerTypes = signal<{ value: string, name: string }[]>([
    { name: "Natural", value: "natural" },
    { name: "Jurídica", value: "legal" },
  ])

  constructor(){
    this.formGroup.disable();
    this.formGroup.controls.taxpayerType.valueChanges.subscribe(value => {
      this.isLegal.set(value == "legal");

      if (value == "legal"){
        this.formGroup.controls.companyName.addValidators(Validators.required);
        this.formGroup.controls.companyName.updateValueAndValidity();
        
        this.formGroup.controls.name.clearValidators();
        this.formGroup.controls.name.updateValueAndValidity();

        this.formGroup.controls.lastName.clearValidators();
        this.formGroup.controls.lastName.updateValueAndValidity();
      } else {
        this.formGroup.controls.companyName.clearValidators();
        this.formGroup.controls.companyName.updateValueAndValidity();

        this.formGroup.controls.name.addValidators(Validators.required);
        this.formGroup.controls.lastName.addValidators(Validators.required);

      }
    });

    this.formGroup.controls.department.valueChanges.subscribe(val => {
      if (val){
        this.formGroup.controls.city.enable();
        if ((this.formGroup.controls.city.getRawValue() ?? '').substring(0, 2) != val){
          this.formGroup.controls.city.setValue(null);
        }
        let cities = this.listLocations().find(x => x.code == val)?.cities ?? [];
        this.listCities.set(cities);
      } else {
        this.formGroup.controls.city.disable();
      }
    })


    Promise.all([
      this._ciiu.list.getAll().then(list => this.listCIIU.set(list)),
      this._taxResponsibilities.list.getAll().then(list => this.listTaxResponsibilities.set(list)),
      this._dataLocations.get().then(list => this.listLocations.set(list))
    ]).then(() => {
      this.formGroup.enable();
    })
  }

  getRawValues(): IThirdFormValues {
    let formValues = this.formGroup.getRawValue();
    let data: IThirdFormValues = {
      taxpayerType: formValues.taxpayerType,
      nit: formValues.nit.replaceAll(".", ""),
      name: formValues.name,
      lastName: formValues.lastName,
      companyName: formValues.companyName,
      tradeName: formValues.tradeName ? formValues.tradeName : null,
      economicActivities: formValues.economicActivities,
      responsibilities: formValues.responsibilities,
      cellphone: formValues.cellphone ?  formValues.cellphone : null,
      email: formValues.email ? formValues.email : null,
      department: formValues.department ? formValues.department : null,
      city: formValues.city ? formValues.city : null,
      address: formValues.address ? formValues.address : null,
      isCustomer: formValues.isCustomer,
      isSupplier: formValues.isSupplier
    }

    if (formValues.taxpayerType == "legal"){
      data.name = null;
      data.lastName = null;
    } else {
      data.companyName = null;
    }

    Object.entries(this.formGroup.controls).forEach(e => {
      if (e[1].invalid){
        console.log(e[0], e[1].getRawValue())
      }
    })
    
    return data;
  }

}

const createForm = () => new FormGroup({
  taxpayerType:  new FormControl<"natural" | "legal">("natural", { nonNullable: true, validators: Validators.required }),
  nit: new FormControl<string>("", { nonNullable: true, validators: [Validators.required] }),
  name: new FormControl<string>("", { nonNullable: true }),
  lastName: new FormControl<string>("", { nonNullable: true }),
  companyName: new FormControl<string>("", { nonNullable: true }),
  tradeName: new FormControl<string>("", { nonNullable: true }),
  isSupplier: new FormControl<boolean>(false, { nonNullable: true }),
  isCustomer: new FormControl<boolean>(false, { nonNullable: true }),
  economicActivities: new FormControl<string[]>([], { nonNullable: true }),
  responsibilities: new FormControl<number[]>([], { nonNullable: true }),
  cellphone: new FormControl<string | null>(null, { }),
  email: new FormControl<string>("", {  nonNullable: true }),
  department: new FormControl<string | null>( null ),
  city: new FormControl<string | null>(null),
  address: new FormControl<string | null>(null),
});