export const step1 = `import { Wallet } from './wallet';

const user1 = {
	address: '0x1234567890abcdef',
	balance: 100
}

const user2 = {
	address: '0xabcdef1234567890',
	balance: 200
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
}`

export const step2 = `// get the latest block of the chain
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
}`

export const step3 = `// add a transaction to the pending transactions
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
}`

export const step4 = `// manually mine pending transactions
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
}`

export const step5 = `// check if the chain is valid
checkValid() {
	for (let i = 1; i < this.chain.length; i++) {
		const currentBlock = this.chain[i];
		const previousBlock = this.chain[i - 1];

		// check if the hash is valid
		if (currentBlock.hash !== currentBlock.calculateHash()) {
			console.error(\`❌ Invalid hash at block \${currentBlock.index}\`);
			return false;
		}

		// check if the previous hash is valid
		if (currentBlock.previousHash !== previousBlock.hash) {
			console.error(\`❌ Invalid previous hash at block \${currentBlock.index}\`);
			return false;
		}

		// check if the number of transactions is valid
		if (currentBlock.transactions.length > 10) {
			console.error(\`❌ Block \${currentBlock.index} has more than 10 transactions\`);
			return false;
		}

		// check if the block has no transactions
		if (currentBlock.transactions.length === 0) {
			console.error(\`❌ Block \${currentBlock.index} has no transactions\`);
			return false;
		}

		// check if the addresses are valid
		for (const tx of currentBlock.transactions) {
			if (!tx.senderAddress || !tx.receiverAddress) {
				console.error(\`❌ Invalid addresses in a transaction at block \${currentBlock.index}\`);
			}
		}
	}

	return true;
}`

export const step6 = `// calculate transaction fee based on amount and network load
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
}`







