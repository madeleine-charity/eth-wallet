"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
/* global BigInt */
// implementation of myWallet
// users can either provide private key to interface with existing wallet
// or if they do not provide a private key, a new wallet is generated
class myWallet {
    wallet;
    provider;
    constructor(private_key) {
        this.provider = new ethers_1.ethers.JsonRpcProvider('https://sepolia.infura.io/v3/9a729580802b4a5ba4cbab4c09eb1048');
        if (private_key) {
            this.wallet = new ethers_1.Wallet(private_key, this.provider);
        }
        else {
            this.wallet = ethers_1.ethers.Wallet.createRandom(this.provider);
            console.log(this.wallet.privateKey);
        }
    }
    // ret: string with balance in eth
    // get the current balance of the wallet
    async getBalance() {
        let weiBalance = await this.provider.getBalance(this.wallet.address);
        let balance = ethers_1.ethers.formatUnits(weiBalance, "ether");
        return balance;
    }
    // ret: string 
    // returns signed message
    async signMessage(msg) {
        return await this.wallet.signMessage(msg);
    }
    //ret: transactionHash: string 
    // sends a transaction on the blockchain
    async sendTransaction(to, amount, gasLimit) {
        let weiAmount = BigInt(amount * Number(ethers_1.WeiPerEther));
        if (!gasLimit) {
            gasLimit = "53000";
        }
        try {
            let transaction = {
                to: to,
                value: weiAmount,
                gasLimit: gasLimit,
                chainId: 11155111
            };
            const tx = await this.wallet.sendTransaction(transaction);
            return tx.hash;
        }
        catch (error) {
            console.log(error);
            return "transaction error: " + error;
        }
    }
}
exports.default = myWallet;
