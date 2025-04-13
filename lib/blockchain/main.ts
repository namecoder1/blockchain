import { SHA256 } from 'crypto-js'
import { Transaction } from '../types';
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
  data: Transaction;
  previousHash: string;
  hash: string;
  nonce: number;

  constructor(timestamp: string, data: Transaction) {
    this.index = 0;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = "0";
    this.hash = this.calculateHash();
    this.nonce = 0;
  }

  // calculate the hash of the block
  calculateHash() {
    return SHA256(
      this.index +
      this.previousHash +
      this.timestamp +
      JSON.stringify(this.data) +
      this.nonce
    ).toString();
  }

  // mine the block
  mineBlock(difficulty: number) {
    const target = Array(difficulty + 1).join("0"); // e.g. "0000" se difficulty è 4
    while (this.hash.substring(0, difficulty) !== target) {
      this.nonce++;
      this.hash = this.calculateHash(); // Aggiorna l'hash finché non ne trovi uno valido
    }
    console.log(`✅ Block mined: ${this.hash}`);
  }
}

export class Blockchain{
  // the chain is an array of Blocks
  chain: Block[]

  constructor(existingChain?: Block[]) {
    if (existingChain) {
      this.chain = existingChain;
    } else {
      this.chain = [this.createGenesis()];
    }
  }

  // create the first block of the chain
  createGenesis() {
    return new Block("01/01/2025", {
      senderAddress: 'chain',
      receiverAddress: 'chain',
      amount: 0,
      note: 'Genesis Block'
    })
  }

  // get the latest block of the chain
  latestBlock() {
    return this.chain[this.chain.length - 1]
  }

  // add a new block to the chain
  addBlock(newBlock: Block) {
    newBlock.index = this.latestBlock().index + 1; // Imposta l'indice
    newBlock.previousHash = this.latestBlock().hash; // Imposta il previousHash
    
    // Minare il blocco con difficoltà 4
    newBlock.mineBlock(4);
    
    this.chain.push(newBlock); // Aggiungi il blocco alla catena
    console.log(newBlock);
  }

  // check if the chain is valid
  checkValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];
  
      console.log(`🔍 Validating block ${currentBlock.index}`);
      console.log(`Expected hash: ${currentBlock.hash}`);
      console.log(`Calculated hash: ${currentBlock.calculateHash()}`);
  
      if (currentBlock.hash !== currentBlock.calculateHash()) {
        console.error(`❌ Invalid hash at block ${currentBlock.index}`);
        return false;
      }
  
      if (currentBlock.previousHash !== previousBlock.hash) {
        console.error(`❌ Invalid previous hash at block ${currentBlock.index}`);
        return false;
      }
  
      if (!currentBlock.data.senderAddress || !currentBlock.data.receiverAddress) {
        console.error(`❌ Invalid addresses at block ${currentBlock.index}`);
        return false;
      }
    }
  
    return true;
  }
}
