export interface Transaction {
  amount: number;
  reference: string;
  walletName: string;
  status?: string;
}
