const Transaction = require('../walet/transaction')

class TransactionMinder {
  constructor ({ blockchain, transactionPool, wallet, pubsub }) {
    this.blockchain = blockchain
    this.transactionPool = transactionPool
    this.wallet = wallet
    this.pubsub = pubsub
  }

  mindeTransactions () {
    //get the transaction pool's valid transactions
    const validTransactions = this.transactionPool.validTransactions()

    //generate the miner's reward
    validTransactions.push(Transaction.rewardTransaction({ minerWallet: this.wallet }))

    //add a block consisting of these transaction to the blockchain
    this.blockchain.addBlock({data: validTransactions})

    // broadcast the updated blockchain
    this.pubsub.broeadcastChain()

    ////clear the pool
    this.transactionPool.clear()
  }
}

module.exports = TransactionMinder
