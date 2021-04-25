import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { WalletService } from 'src/app/services/wallet.service';

@Component({
  selector: 'app-new-transaction',
  templateUrl: './new-transaction.component.html',
  styleUrls: ['./new-transaction.component.scss'],
})
export class NewTransactionComponent implements OnInit {
  newTransactionForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private walletService: WalletService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.newTransactionForm = this.fb.group({
      walletName: ['', Validators.required],
      amount: ['', Validators.required],
    });
  }

  onSubmit() {
    const newTransaction = {
      walletName: this.newTransactionForm.value.walletName,
      amount: Number(this.newTransactionForm.value.amount),
      reference:  Math.random().toString(36).substring(7),
    };
    this.walletService.addTransaction(newTransaction).subscribe({
      next: (data) => {
        console.log(data);
        this.toastr.success(data.status);
        this.newTransactionForm.patchValue({
          walletName: '',
          amount: '',
        });
      },
      error: (error) => {
        console.log(error);
        this.toastr.error(error.error.error.message, error.error.status);
      },
    });
  }
}
