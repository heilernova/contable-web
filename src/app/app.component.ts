import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SessionService } from './authentication';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private readonly _session = inject(SessionService);
  title = 'contable-web';

  constructor(){
    this._session.init();
  }
}
