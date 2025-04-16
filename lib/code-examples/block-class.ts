export const step1 = `import { SHA256 } from 'crypto-js';
import { Transaction } from './transaction';

export class Block {
  index: number;
  timestamp: string;
  transactions: Transaction[];
  previousHash: string;
  hash: string;
  nonce: number;
  fee: number;

  constructor(timestamp: string, transactions: Transaction[]) {
    // check if the number of transactions is valid
    if (transactions.length > 10) {
      throw new Error("Each block can contain a maximum of 10 transactions.");
    }
    this.index = 0;
    this.timestamp = timestamp;
    this.transactions = transactions;
    this.previousHash = "0";
    this.hash = this.calculateHash();
    this.nonce = 0;
    this.fee = 0;
  }
}`


export const step2 =`// calculate the hash of the block
  calculateHash() {
    return SHA256(
      this.index +
      this.previousHash +
      this.timestamp +
      JSON.stringify(this.transactions) +
      this.nonce
    ).toString();
  }`

export const step3 = `// mine the block
  mineBlock(difficulty: number) {
    // calculate the target hash
    const target = Array(difficulty + 1).join("0"); // e.g. "0000" if difficulty is 4
    // mine the block
    while (this.hash.substring(0, difficulty) !== target) {
      this.nonce++;
      this.hash = this.calculateHash(); // update the hash until a valid one is found
    }
  }`