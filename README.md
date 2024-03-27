# Eth Wallet

This project consists of a basic React front end that allows a user to interact with an Ethereum Wallet. The user can either enter their own private key to use an exisiting wallet, or generate a new random wallet by not entering a private key. With their non-custodial wallet, the user can 
  - getBalance() →  balance: number (get the current balance on the wallet.
  - signMessage(msg: string) → signedMessage: string (The signed message with the private key)
  - sendTransaction(to: string, amount: number) → transactionHash: string (sends a transaction on the blockchain)

The backend uses ethers.js and runs on the Sepolia testnet. The code I wrote is in src/myWallet.ts, src/myWalletTest.ts, and App.jsx.

# Security considerations 
1. Private key generation 
   The security of the wallet is dependent on the security of the private key. A user can port their existing private key, which they trust was generated securely, or have a new private key generated. This construction generates private keys using the built in functionality of ether.js
2. Private key storage
   The private key is not a variable directly in the class, it is only held by the instance of the ethers wallet. This limits where the private key needs to be stored and prevents adversaries from gaining access to it. 
