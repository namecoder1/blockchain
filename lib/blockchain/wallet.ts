import { Transaction } from '../types';

export class Wallet {
  // the Wallet have the following properties:
  // balances -> map of addresses and their balances (private)
  private balances: Map<string, number> = new Map();

  constructor(initialBalances: { address: string; balance: number }[]) {
    // initialize the balances
    initialBalances.forEach(({ address, balance }) => {
      this.balances.set(address, balance);
    });
  }

  // get the balance of an address
  getBalance(address: string): number {
    return this.balances.get(address) || 0;
  }

  // check if an address has enough balance
  hasEnoughBalance(address: string, amount: number): boolean {
    return this.getBalance(address) >= amount;
  }

  // update the balance of an address
  updateBalance(address: string, amount: number) {
    const currentBalance = this.getBalance(address);
    this.balances.set(address, currentBalance + amount);
  }

  // process a transaction
  processTransaction(transaction: Transaction): boolean {
    const { senderAddress, receiverAddress, amount, fee } = transaction;
    
    // check if the sender has enough balance (including fee)
    if (!this.hasEnoughBalance(senderAddress, amount + fee)) {
      return false;
    }

    // update the balances
    this.updateBalance(senderAddress, -(amount + fee));
    this.updateBalance(receiverAddress, amount);

    return true;
  }

  // check for double spending in a list of transactions
  checkDoubleSpending(transactions: Transaction[]): boolean {
    const spentAmounts = new Map<string, number>();
    const initialBalances = new Map<string, number>();

    // save the initial balances
    for (const tx of transactions) {
      // save the initial balance of the sender
      if (!initialBalances.has(tx.senderAddress)) {
        initialBalances.set(tx.senderAddress, this.getBalance(tx.senderAddress));
      }
    }

    // check for double spending
    for (const tx of transactions) {
      // get the sender address, amount and fee
      const { senderAddress, amount, fee } = tx;
      // get the current spent amount
      const currentSpent = spentAmounts.get(senderAddress) || 0;
      // get the total spent amount
      const totalSpent = currentSpent + amount + fee;
      // get the initial balance of the sender
      const initialBalance = initialBalances.get(senderAddress) || 0;
      // check if the total spent would exceed the initial balance
      if (totalSpent > initialBalance) {
        return true; // double spending detected
      }

      // save the total spent amount
      spentAmounts.set(senderAddress, totalSpent);
    }

    return false;
  }
} 