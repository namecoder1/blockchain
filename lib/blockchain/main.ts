import { SHA256 } from 'crypto-js'

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
  data: {
    amount: string;
    currency: 'eur' | 'usd' | 'gbp'
    note?: string
  };
  previousHash: string;
  hash: string;
  nonce: number;

  constructor(timestamp: string, data: {
    amount: string;
    currency: 'eur' | 'usd' | 'gbp'
    note?: string
  }) {
    this.index = 0;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = "0";
    this.hash = this.calculateHash();
    this.nonce = 0;
  }

  // calculate the hash of the block
  calculateHash() {
    return SHA256(this.index + this.previousHash + this.timestamp + this.data + this.nonce).toString();
  }

  // mine the block
  mineBlock(difficulty: string) {
    // TODO
  }
}

export class Blockchain{
  // the chain is an array of Blocks
  chain: Block[]

  constructor() {
    this.chain = [this.createGenesis()];
  }

  // create the first block of the chain
  createGenesis() {
    return new Block("01/01/2025", {
      amount: '0',
      currency: 'usd',
      note: 'Genesis Block'
    })
  }

  // get the latest block of the chain
  latestBlock() {
    return this.chain[this.chain.length - 1]
  }

  // add a new block to the chain
  addBlock(newBlock: Block){
    newBlock.index = this.latestBlock().index + 1
    newBlock.previousHash = this.latestBlock().hash;
    newBlock.hash = newBlock.calculateHash();
    this.chain.push(newBlock);
  }

  // check if the chain is valid
  checkValid() {
    for(let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }

      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }

    return true;
  }
}
