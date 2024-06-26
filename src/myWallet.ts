import { Wallet, Provider, ethers, WeiPerEther, HDNodeWallet } from "ethers";
/* global BigInt */

// implementation of myWallet
// users can either provide private key to interface with existing wallet
// or if they do not provide a private key, a new wallet is generated
class myWallet{
    wallet:  HDNodeWallet | Wallet
    provider: Provider
    constructor(private_key?: string){
        this.provider = new ethers.JsonRpcProvider('https://sepolia.infura.io/v3/9a729580802b4a5ba4cbab4c09eb1048');
        if (private_key) {
            this.wallet = new Wallet(private_key, this.provider)
        } else{
            this.wallet = ethers.Wallet.createRandom(this.provider)
            console.log(this.wallet.privateKey)
        }
    }

    // ret: string with balance in eth
    // get the current balance of the wallet
    async getBalance() {
        let weiBalance =  await this.provider.getBalance(this.wallet.address)
        let balance = ethers.formatUnits(weiBalance, "ether")
        return balance 
    }

    // ret: string 
    // returns signed message
    async signMessage(msg: string) {
        return await this.wallet.signMessage(msg)
    }

    //ret: transactionHash: string 
    // sends a transaction on the blockchain
    async sendTransaction(to: string, amount: number, gasLimit?: string) { 
        let weiAmount = BigInt(amount * Number(WeiPerEther))
        if (!gasLimit) {
            gasLimit =  "53000"
        }
        try {
            let transaction = {
                to: to,
                value: weiAmount,
                gasLimit: gasLimit,
                chainId: 11155111
              }
            const tx = await this.wallet.sendTransaction(transaction);
            return tx.hash
        }
        catch (error: any){
            console.log(error)
            return "transaction error: " + error
        }
    }
}

export default myWallet;