import { SHA256 } from 'crypto-js'
import { Transaction } from '../types';
import { Wallet } from './wallet';
import { user1, user2 } from './data';

export class Block {
  // each Block in the chain has:
  // index -> to calculate positon in the chain
  // timestamp -> inserted when transaction is done
  // data -> data of the Block
  // previousHash -> hash value of the prev. Block
  // nonce -> used by the mineBlock() to find the correct
  //	 hash to mine the block (and so to confirm it)
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

  // calculate the hash of the block
  calculateHash() {
    return SHA256(
      this.index +
      this.previousHash +
      this.timestamp +
      JSON.stringify(this.transactions) +
      this.nonce
    ).toString();
  }

  // mine the block
  mineBlock(difficulty: number) {
    // calculate the target hash
    const target = Array(difficulty + 1).join("0"); // e.g. "0000" if difficulty is 4
    // mine the block
    while (this.hash.substring(0, difficulty) !== target) {
      this.nonce++;
      this.hash = this.calculateHash(); // update the hash until a valid one is found
    }
  }
}

export class Blockchain{
  // the Blockchain have the following properties:
  // chain -> array of Blocks
  // pendingTransactions -> array of Transactions to be added to the next block
  // wallet -> Wallet instance (with balances & keys of the users)
  chain: Block[]
  pendingTransactions: Transaction[] = [];
  wallet: Wallet;

  constructor(existingChain?: Block[], existingWallet?: Wallet) {
    // if the chain is already existing, use it
    if (existingChain) {
      this.chain = existingChain;
    } else {
      this.chain = [this.createGenesis()];
    }
    // initialize the pending transactions
    this.pendingTransactions = [];
    // if the wallet is not existing, create a new one
    if (existingWallet) {
      this.wallet = existingWallet;
    } else {
      // create a new wallet with the initial balances
      this.wallet = new Wallet([
        { address: user1.address, balance: user1.balance },
        { address: user2.address, balance: user2.balance }
      ]);
    }
  }

  // create the first block of the chain
  createGenesis() {
    return new Block(new Date('2025-01-01').toISOString(), [{
      senderAddress: 'chain',
      receiverAddress: 'chain',
      amount: 0,
      note: 'Genesis Block',
      timestamp: new Date('2025-01-01').toISOString(),
      fee: 0
    }])
  }

  // get the latest block of the chain
  latestBlock() {
    return this.chain[this.chain.length - 1]
  }

  // add a new block to the chain
  addBlock(newBlock: Block) {
    newBlock.index = this.latestBlock().index + 1; // set the index
    newBlock.previousHash = this.latestBlock().hash; // set the previousHash
    
    // mine the block with difficulty 4
    newBlock.mineBlock(4);
    
    this.chain.push(newBlock); // add the block to the chain
  }

  // add a transaction to the pending transactions
  addTransaction(transaction: Transaction) {
    // check if the sender has enough balance
    if (!this.wallet.hasEnoughBalance(transaction.senderAddress, transaction.amount + transaction.fee)) {
      throw new Error("Insufficient balance");
    }

    // check for double spending in pending transactions
    if (this.wallet.checkDoubleSpending([...this.pendingTransactions, transaction])) {
      throw new Error("Double spending detected");
    }

    // process the transaction (update balances)
    if (!this.wallet.processTransaction(transaction)) {
      throw new Error("Transaction processing failed");
    }

    // add the transaction to the pending transactions
    this.pendingTransactions.push(transaction);

    if (this.pendingTransactions.length === 10) {
      const newBlock = new Block(new Date().toISOString(), [...this.pendingTransactions]);
      this.addBlock(newBlock);
      this.pendingTransactions = []; // empty the pending transactions
    }
  }

  // manually mine pending transactions
  minePendingTransactions() {
    if (this.pendingTransactions.length > 0) {
      const newBlock = new Block(new Date().toISOString(), [...this.pendingTransactions]);
      this.addBlock(newBlock);
      // don't reset the wallet, only the pending transactions
      this.pendingTransactions = [];
      return true;
    }
    return false;
  }

  // get pending transactions
  getPendingTransactions(): Transaction[] {
    // return the pending transactions (in format of the Transaction type)
    return [...this.pendingTransactions];
  }

  // check if the chain is valid
  checkValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];
  
      // check if the hash is valid
      if (currentBlock.hash !== currentBlock.calculateHash()) {
        console.error(`❌ Invalid hash at block ${currentBlock.index}`);
        return false;
      }

      // check if the previous hash is valid
      if (currentBlock.previousHash !== previousBlock.hash) {
        console.error(`❌ Invalid previous hash at block ${currentBlock.index}`);
        return false;
      }

      // check if the number of transactions is valid
      if (currentBlock.transactions.length > 10) {
        console.error(`❌ Block ${currentBlock.index} has more than 10 transactions`);
        return false;
      }

      // check if the block has no transactions
      if (currentBlock.transactions.length === 0) {
        console.error(`❌ Block ${currentBlock.index} has no transactions`);
        return false;
      }

      // check if the addresses are valid
      for (const tx of currentBlock.transactions) {
        if (!tx.senderAddress || !tx.receiverAddress) {
          console.error(`❌ Invalid addresses in a transaction at block ${currentBlock.index}`)
        }
      }
    }
  
    return true;
  }

  // calculate transaction fee based on amount and network load
  calculateFee(amount: number): number {
    // base fee: 0.0010 BTC
    const baseFee = 0.0010;
    
    // additional fee based on amount: 0.10% of transaction amount
    const amountFee = amount * 0.010;
    
    // network load factor: increases fee when pending transactions are high
    const networkLoadFactor = Math.min(1 + (this.pendingTransactions.length / 10), 2);
    
    return (baseFee + amountFee) * networkLoadFactor;
  }

  // get balance of an address
  getBalance(address: string): number {
    return this.wallet.getBalance(address);
  }
}

