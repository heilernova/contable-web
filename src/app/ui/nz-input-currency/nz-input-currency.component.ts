import { Component, ElementRef, inject, Input, Optional, Self } from '@angular/core';
import { AbstractControlDirective, FormsModule, NgControl } from '@angular/forms';
import { IMaskModule } from 'angular-imask';
import { FocusMonitor } from '@angular/cdk/a11y';
import { NzInputModule } from 'ng-zorro-antd/input';
import { Subject } from 'rxjs';
import { Platform } from '@angular/cdk/platform';

@Component({
  selector: 'nz-input-currency',
  standalone: true,
  imports: [
    IMaskModule,
    FormsModule,
    NzInputModule
  ],
  templateUrl: './nz-input-currency.component.html',
  styleUrl: './nz-input-currency.component.scss',
  host: {
   
  }
})
export class NzInputCurrencyComponent {
  private readonly _platform = inject(Platform);
  public mask: any = undefined;
  private _value: number = 0;
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

    if (this._platform.isBrowser){
      this.mask = { 
        mask: Number,  // enable number mask
        // other options are optional with defaults below
        scale: 2,  // digits after point, 0 for integers
        thousandsSeparator: '.',  // any single char
        padFractionalZeros: true,  // if true, then pads zeros at end to the length of scale
        normalizeZeros: true,  // appends or removes zeros at ends
        //radix: ',',  // fractional delimiter
        mapToRadix: ['.'],  // symbols to process as radix
        autofix: true,
       };
    }
  }
  private _inputValue: string = '0'
  public set inputValue(value: string){
    let temp: string = value;
    this._inputValue = value;
    this.value = Number.parseFloat(value.replaceAll(".", "").replace(",", "."));
  }
  public get inputValue(){
    return this._inputValue;
  }

  @Input()
  get value(){
    return this._value;
  }

  set value(value: number){
    this.onChange(value);

  }
  
  public writeValue(obj: any): void {
    if (typeof obj == "number"){
      this.value = obj;
      this._inputValue = obj.toString();
    } else {
      this.value = 0;
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
