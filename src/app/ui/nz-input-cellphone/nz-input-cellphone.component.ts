import { AfterViewInit, Component, ElementRef, Input, Optional, Self } from '@angular/core';
import { AbstractControlDirective, ControlValueAccessor, FormsModule, NgControl } from '@angular/forms';
import { FocusMonitor } from '@angular/cdk/a11y';
import { IMaskModule } from 'angular-imask';
import { NzInputModule } from 'ng-zorro-antd/input';
import { Subject } from 'rxjs';
import { isCellphone } from '@app/common/utils';

@Component({
  selector: 'nz-input-cellphone',
  standalone: true,
  imports: [
    FormsModule,
    NzInputModule,
    IMaskModule
  ],
  templateUrl: './nz-input-cellphone.component.html',
  styleUrl: './nz-input-cellphone.component.scss'
})
export class NzInputCellphone implements ControlValueAccessor, AfterViewInit  {
  private _value: string | null = null;
  public mask = { mask: '000 000 0000' };
  public disable: boolean = false;;
  public stateChanges = new Subject<void>();
  public ngControl: NgControl | AbstractControlDirective | null = null;
  public onChange = (_: any) => {};
  public onTouched = () => {};
  public empty: boolean = true;
  constructor(
    private _focusMonitor: FocusMonitor,
    private _elementRef: ElementRef<HTMLElement>,
    @Optional() @Self() ngControl: NgControl
  ){
    if (ngControl){
      ngControl.valueAccessor = this;
      this.ngControl = ngControl;
    }
  }
  public ngAfterViewInit(): void {
    // throw new Error('Method not implemented.');
  }
  private _inputValue: string = ''
  public set inputValue(value: string){
    let temp: string = value;
    this.value = temp;
    this.empty = value.length == 0;
    this._inputValue = value;
  }
  public get inputValue(){
    return this._inputValue;
  }

  @Input()
  get value(){
    return this._value;
  }

  set value(value: string | null){
    let cell = `+57 ${value}`;
    let r = isCellphone(cell) ? cell : null;
    this._value = r;
    this.onChange(r);

  }
  
  public writeValue(obj: string | null): void {
    if (obj && isCellphone(obj)){
      this._inputValue = obj.substring(3);
      this.value = obj;
    } else {
      this.value = null;
      this._inputValue = "";
    }
  }
  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public setDisabledState?(isDisabled: boolean): void {
    this.disable = isDisabled;
  }
}
