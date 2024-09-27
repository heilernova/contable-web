import { Component, inject, signal } from '@angular/core';
import { CompaniesService, Company } from '@app/common/companies';
import { Platform } from '@angular/cdk/platform';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzListModule } from 'ng-zorro-antd/list';
import { CommonModule } from '@angular/common';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';


@Component({
  selector: 'app-companies-homepage',
  standalone: true,
  imports: [
    CommonModule,
    NzCardModule,
    NzButtonModule,
    NzListModule,
    NzModalModule
  ],
  templateUrl: './companies-homepage.component.html',
  styleUrl: './companies-homepage.component.scss'
})
export class CompaniesHomepageComponent {
  private readonly _companies = inject(CompaniesService);
  private readonly _platform = inject(Platform);
  private readonly _modalService: NzModalService = inject(NzModalService);

  public readonly companies = signal<Company[]>([])

  constructor(){
    if (this._platform.isBrowser){
      this._companies.list.getAll().then(list => {
        this.companies.set(list);
      })
    }
  }

  public onClickPreviewCompany(company: Company): void {
    
  }
}
