import { Component, inject, signal } from '@angular/core';
import { Third, ThirdPartiesService } from '@app/common/accounting/third-parties';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzListModule } from 'ng-zorro-antd/list';
import { Platform } from '@angular/cdk/platform';

@Component({
  selector: 'app-third-parties-homepage',
  standalone: true,
  imports: [
    NzListModule,
    NzButtonModule
  ],
  templateUrl: './third-parties-homepage.component.html',
  styleUrl: './third-parties-homepage.component.scss'
})
export class ThirdPartiesHomepageComponent {
  private readonly _thirdParties = inject(ThirdPartiesService);
  private readonly _platform = inject(Platform);

  public list = signal<Third[]>([]);

  constructor(){
    if (this._platform.isBrowser){
      this._thirdParties.getAll().then(list => this.list.set(list))
    }
  }

  onClickRegisterThird(): void {
    this._thirdParties.register();
  }
}
