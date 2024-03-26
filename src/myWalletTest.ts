import { wait } from '@testing-library/user-event/dist/utils';
import myWallet from './myWallet';
import assert from 'assert';

async function testWallet() {
    // Test 1: Create a new random wallet
    const wallet1 = new myWallet();
    console.log('New Random Wallet Address:', wallet1.wallet.address);

    // Test 2: Create a wallet from a private key
    const privateKey = '0xc70fa64b9e9b9f5394f26713f4b75217a8334e3c4362fdb81c60edd066265d50'; // Replace with a valid private key
    const wallet2 = new myWallet(privateKey);
    assert.strictEqual(wallet2.wallet.address, '0x2d85DdC88EFa2B9c9cD7Cd9dAd6Acb9110Aa374C');


    // Test 3: Get balance
    const balance1 = await wallet1.getBalance();
    const balance2 = await wallet2.getBalance();
    assert.strictEqual(balance1, '0.0')

    // Test 4: Sign a message
    const message = 'Hello, World!';
    const signature1 = await wallet1.signMessage(message);
    const signature2 = await wallet2.signMessage(message);
    assert.strictEqual(signature2, '0xa3ff9f523ea55928d0977698cbbd018b891beedabd8183aa93ad9202c9fbde760ead32acba63472a34d3d3198f149a1799932c7ba40b5f32f0c84ba9272e41a81b')
    console.log('Random Wallet Signature:', signature1);

    // Test 5: Send a transaction
    const wallet3 = new myWallet('0xee44bc68ca6a5ab9268f9c1f24511e46c2b04692eec82e51c8cf0bcbb2395b46');
    const recipient = wallet3.wallet.address
    let startBalance = Number(await wallet3.getBalance())
    const amount = 0.001; // Amount in Ether
    const gasLimit = '53000'; // Optional gas limit
    if (Number(balance2) > 0.003){
        const txHash1 = await wallet2.sendTransaction(recipient, amount, gasLimit);
        console.log('Transaction Hash:', txHash1);
        assert(typeof txHash1 == 'string')// assert hash 
    } else {
        console.log("Add Sepolia to test transaction")
    }
    
  
}

testWallet()
  .then(() => console.log('Tests completed.'))
  .catch((error) => console.error('Tests failed:', error));