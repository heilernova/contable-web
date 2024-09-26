import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { SessionService } from '@app/authentication';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    NzButtonModule,
    NzFormModule,
    NzInputModule
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
  private readonly _message = inject(NzMessageService);
  private readonly _session = inject(SessionService);
  private readonly _router = inject(Router);
  public readonly loading = signal<boolean>(false);
  public readonly formCredentials = new FormGroup({ 
    username: new FormControl<string>('', { nonNullable: true, validators: Validators.required }),
    password: new FormControl<string>('', { nonNullable: true, validators: Validators.required }),
  });


  onSave(){
    if (this.formCredentials.invalid) {
      this._message.warning("Faltan campos por completar");
      return;
    }

    let credentials = this.formCredentials.getRawValue();
    this.formCredentials.disable();
    this.loading.set(true);
    this._session.signIn(credentials)
    .then(() => {
      this._message.success("Session iniciada correctamente");
      this._router.navigate(["/"]);
    })
    .catch(err => {
      this.formCredentials.enable();
      this.loading.set(false);
      if (err instanceof HttpErrorResponse){
        this._message.error(err.error.message)
      } else {
        this._message.error("Error inesperado");
      }
    })
  }
}
