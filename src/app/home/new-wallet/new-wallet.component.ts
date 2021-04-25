import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WalletService } from 'src/app/services/wallet.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-new-wallet',
  templateUrl: './new-wallet.component.html',
  styleUrls: ['./new-wallet.component.scss'],
})
export class NewWalletComponent implements OnInit {
  newWalletForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private walletService: WalletService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.newWalletForm = this.fb.group({
      walletName: ['', Validators.required],
    });
  }

  onSubmit() {
    const newWallet = { name: this.newWalletForm.value.walletName };
    this.walletService.addWallet(newWallet).subscribe({
      next: (data) => {
        const status = data.status;
        this.toastr.success(status);
        console.log(data);
        this.newWalletForm.patchValue({
          walletName: '',
        });
      },
      error: (error) => {
        console.log(error);
        this.toastr.error(error.error.error.message, error.error.status);
      },
    });
  }
}
