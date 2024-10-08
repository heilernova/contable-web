import { Component } from '@angular/core';
import { VoucherFormComponent } from "../../../../common/accounting/vouchers/components/voucher-form/voucher-form.component";

@Component({
  selector: 'app-register-vouchers-page',
  standalone: true,
  imports: [VoucherFormComponent],
  templateUrl: './register-vouchers-page.component.html',
  styleUrl: './register-vouchers-page.component.scss'
})
export class RegisterVouchersPageComponent {

}
