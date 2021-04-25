import { Component, OnInit } from '@angular/core';
import { Wallet } from 'src/app/models/wallet';
import { WalletService } from 'src/app/services/wallet.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  wallets: Wallet[] = [];

  constructor(
    private walletService: WalletService
  ) { }

  ngOnInit(): void {
    this.getWallets();
  }

  getWallets(): void {
    this.walletService
      .getWallets().pipe(map(wallets=> wallets.sort((a, b) => b.balance - a.balance)))
      .subscribe(
        (wallets) =>
          (this.wallets = wallets)
      );
  }

}
