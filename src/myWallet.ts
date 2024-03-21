import { Wallet, Provider, ethers, WeiPerEther } from "ethers";
/* global BigInt */

class myWalletClass{
    wallet: Wallet
    provider: Provider
    constructor(private_key: string){
        this.provider = new ethers.JsonRpcProvider('https://sepolia.infura.io/v3/9a729580802b4a5ba4cbab4c09eb1048');
        this.wallet = new Wallet(private_key, this.provider)
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

export default myWalletClass;

/*
async function main() {
    let wallet = new myWalletClass()
    console.log("its me")
    console.log(await wallet.getBalance())
    // console.log(await wallet.sendTransaction())
}

main() */
