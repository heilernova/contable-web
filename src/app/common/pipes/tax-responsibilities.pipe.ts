import { inject, Pipe, PipeTransform } from '@angular/core';
import { TaxResponsibilitiesService } from '../data';

@Pipe({
  name: 'taxResponsibilities',
  standalone: true
})
export class TaxResponsibilitiesPipe implements PipeTransform {
  private readonly _taxResponsibilities = inject(TaxResponsibilitiesService);
  async transform(value: unknown, ...args: unknown[]): Promise<string> {
    return (await this._taxResponsibilities.list.getAll()).find(x => x.id == value)?.name ?? "";
  }

}
