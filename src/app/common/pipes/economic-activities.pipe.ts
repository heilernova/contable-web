import { inject, Pipe, PipeTransform } from '@angular/core';
import { CiiuService } from '../data';

@Pipe({
  name: 'economicActivities',
  standalone: true
})
export class EconomicActivitiesPipe implements PipeTransform {
  private readonly _ciiu = inject(CiiuService);
  async transform(value: unknown, ...args: unknown[]): Promise<string> {
    
    return (await this._ciiu.list.getAll()).find(x => x.code == value)?.name ?? "";
  }

}
