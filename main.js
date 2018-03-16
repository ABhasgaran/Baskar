const SHA256 = require('crypto-js/sha256')

class Block{
    constructor(index, timeStamp, data, previousHash = '')
    {
        this.index = index;
        this.timeStamp = timeStamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }

    calculateHash(){
        return SHA256(this.index, this.previousHash + this.timeStamp + JSON.stringify(this.data)).toString();

    }
}
    class BlockChain{
        constructor(){
            //genesis block
            this.chain = [this.createGenesisBlock()];
        }

        //genesis block
        createGenesisBlock(){
            return new Block(0, '03/01/2018', 'Genesis Block', "0");

        }

        getLatestBlock(){
            return this.chain[this.chain.length - 1];
        }

        //any change in block, hash function has to change as well
        addBlock(newBlock){
            newBlock.previousHash = this.getLatestBlock().hash;
            newBlock.hash = newBlock.calculateHash();
            this.chain.push(newBlock);
        }
    }
    
    let BlockCoin = new BlockChain();
    BlockCoin.addBlock(new Block(1, "03/10/2018", {amount:4}));
    BlockCoin.addBlock(new Block(2, "03/12/2018", {amount:10}));

    console.log(JSON.stringify(BlockCoin, null, 4));
