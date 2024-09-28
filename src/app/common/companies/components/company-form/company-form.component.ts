import { Component, inject, Input, signal } from '@angular/core';
import { CiiuService, ICiiu, ITaxResponsibilities, TaxResponsibilitiesService } from '@app/common/data';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { IMaskModule } from 'angular-imask';
import { DataLocationsService, ICity, IDepartment } from '@app/common/data/locations';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzInputCellphone } from '@app/ui/nz-input-cellphone';
import { Company } from '../../company.model';
import { ICompanyFormValues } from '../../interfaces/company.interfaces';

@Component({
  selector: 'app-company-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    NzInputCellphone,
    IMaskModule
  ],
  templateUrl: './company-form.component.html',
  styleUrl: './company-form.component.scss'
})
export class CompanyFormComponent {
  private readonly _ciiu = inject(CiiuService);
  private readonly _taxResponsibilities = inject(TaxResponsibilitiesService);
  private readonly _dataLocations = inject(DataLocationsService);
  
  private _company: Company | null = null;

  public readonly isLegal = signal<boolean>(true);
  public readonly disable = signal<boolean>(true);
  public readonly maskNit = { mask: Number, thousandsSeparator: '.', radix: '.', mapToRadix: [','], autofix: true }
  
  public readonly listTaxpayerTypes = signal<{ value: string, name: string }[]>([
    { name: "Natural", value: "natural" },
    { name: "Jurídica", value: "legal" },
  ])
  public readonly listCIIU = signal<ICiiu[]>([]);
  public readonly listTaxResponsibilities = signal<ITaxResponsibilities[]>([]);
  public readonly listLocations = signal<IDepartment[]>([]);
  public readonly listCities = signal<ICity[]>([]);

  public readonly formGroup = createForm();
  public edit: boolean = false;

  @Input()
  set data(value: Company | undefined){
    if (value){
      this.edit = true;
      this._company = value;
      this.formGroup.setValue({
        taxpayerType: value.taxpayerType,
        nit: value.nit,
        name: value.name ?? "",
        lastName: value.lastName ?? "",
        companyName: value.companyName ?? "",
        tradeName: value.tradeName ?? "",
        cellphone: value.cellphone,
        email: value.email,
        department: value.department,
        city: value.city,
        address: value.address,
        economicActivities: value.economicActivities,
        responsibilities: value.responsibilities,
        passwordDian: ""
      });
      if (value.taxpayerType == "legal"){
        this.listTaxpayerTypes.set([{ name: "Jurídica", value: "legal" }]);
      } else {
        this.listTaxpayerTypes.set([{ name: "Natural", value: "natural" }]);
      }
    }
  }

  constructor(){
    this.formGroup.disable();
    this.formGroup.controls.taxpayerType.valueChanges.subscribe(value => this.isLegal.set(value == "legal"));

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

  getRawValues(): ICompanyFormValues {
    let formValues = this.formGroup.getRawValue();
    let data: ICompanyFormValues = {
      taxpayerType: formValues.taxpayerType,
      nit: formValues.nit.replaceAll(".", ""),
      name: formValues.name,
      lastName: formValues.lastName,
      companyName: formValues.companyName,
      tradeName: formValues.tradeName ? formValues.tradeName : null,
      economicActivities: formValues.economicActivities,
      responsibilities: formValues.responsibilities,
      cellphone: formValues.cellphone ?? "",
      email: formValues.email,
      department: formValues.department ?? "",
      city: formValues.city ?? "",
      address: formValues.address ?? "",
      contacts: []
    }

    if (formValues.taxpayerType == "legal"){
      data.name = null;
      data.lastName = null;
    } else {
      data.companyName = null;
    }
    
    return data;
  }
}


const createForm = () => new FormGroup({
  taxpayerType:  new FormControl<"natural" | "legal">("legal", { nonNullable: true, validators: Validators.required }),
  nit: new FormControl<string>("", { nonNullable: true, validators: [Validators.required] }),
  name: new FormControl<string>("", { nonNullable: true }),
  lastName: new FormControl<string>("", { nonNullable: true }),
  companyName: new FormControl<string>("", { nonNullable: true, validators: Validators.required }),
  tradeName: new FormControl<string>("", { nonNullable: true }),
  economicActivities: new FormControl<string[]>([], { nonNullable: true }),
  responsibilities: new FormControl<number[]>([], { nonNullable: true }),
  cellphone: new FormControl<string | null>(null, { }),
  email: new FormControl<string>("", {  nonNullable: true}),
  passwordDian: new FormControl<string>("", { nonNullable: true }),
  department: new FormControl<string | null>( null, { validators: Validators.required} ),
  city: new FormControl<string | null>(null, { validators: Validators.required }),
  address: new FormControl<string | null>(null, { validators: Validators.required }),
});