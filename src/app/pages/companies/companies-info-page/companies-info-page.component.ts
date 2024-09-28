import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompaniesService, Company } from '@app/common/companies';
import { Platform  } from "@angular/cdk/platform";
import { EconomicActivitiesPipe, TaxResponsibilitiesPipe } from '@app/common/pipes';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { SessionService } from '@app/authentication';

@Component({
  selector: 'app-companies-info-page',
  standalone: true,
  imports: [
    CommonModule,
    EconomicActivitiesPipe,
    TaxResponsibilitiesPipe,
    NzButtonModule
  ],
  templateUrl: './companies-info-page.component.html',
  styleUrl: './companies-info-page.component.scss'
})
export class CompaniesInfoPageComponent {
  private readonly _companies = inject(CompaniesService);
  private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly _platform = inject(Platform);
  private readonly _session = inject(SessionService);

  public readonly company = signal<Company | null>(null);

  constructor(){
    this._activatedRoute.params.subscribe(value => {
      let id: string = value["id"];
      if (this._platform.isBrowser){
        this._companies.list.get(id).then(company => {
          if (company){
            this.company.set(company);
          }
        })
      }
    })
  }

  onClickEdit(): void {
    let company = this.company();
    if (company){
      company.edit();
    }
  }

  onClickLogin(): void {
    this._session.verifySession(this.company()?.id)
    .then(() => {

    })
    .catch(err => {
      
    })
  }
}
