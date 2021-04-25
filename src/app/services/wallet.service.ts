import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Wallet } from '../models/wallet';
import { Transaction } from '../models/transaction';

@Injectable({
  providedIn: 'root',
})
export class WalletService {
  constructor(private http: HttpClient) {}

  getWallets(): Observable<Wallet[]> {
    return this.http.get<Wallet[]>('http://localhost:3000/api/wallets');
  }

  addWallet(wallet: Wallet): Observable<Wallet> {
    return this.http.post<Wallet>('http://localhost:3000/api/wallets', wallet);
  }

  addTransaction(transaction: Transaction): Observable<Transaction> {
    return this.http.put<Transaction>('http://localhost:3000/api/wallets', transaction);
  }
}
