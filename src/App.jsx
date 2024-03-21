import React, { useState } from 'react';
import myWalletClass from './myWallet';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    margin: 'auto'
  },
};

const MyWallet = () => {
  const [privateKey, setPrivateKey] = useState('');
  const [address, setAddress] = useState('');
  const [balance, setBalance] = useState('');
  const [message, setMessage] = useState('');
  const [signedMessage, setSignedMessage] = useState('');
  const [wallet, setWallet] = useState('');
  const [to, setTo] = useState('');
  const [amount, setAmount] = useState(0);
  const [transactionHash, setTransactionHash] = useState('');
  const [gasLimit, setGasLimit] = useState('');

  const createWallet = () => {
    const wallet = new myWalletClass(privateKey);
    setWallet(wallet);
    setAddress(`Your address is: ${wallet.wallet.address}`);
  };

  const getBalance = async () => {
    const balance = await wallet.getBalance();
    setBalance(`Your balance is ${balance}`);
  };

  const signMessage = async () => {
    const signed = await wallet.signMessage(message);
    setSignedMessage(`The signed message is: ${signed}`);
  };

  const sendTransaction = async () => {
    const hash = await wallet.sendTransaction(to, amount);
    setTransactionHash(`The transaction hash is: ${hash}`);
  };

  return (
    <div style={styles.container}>
      <h1>My Wallet</h1>
      <h3>Create Wallet</h3>
      <p>Enter your private key to use your wallet</p>
      <input type="text" value={privateKey} onChange={(e) => setPrivateKey(e.target.value)} />
      <button onClick={createWallet}>Enter</button>
      <p>{address}</p>

      <h3>Balance</h3>
      <button onClick={getBalance}>Get Balance</button>
      <p>{balance}</p>

      <h3>Sign Message</h3>
      <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={signMessage}>Enter Message</button>
      <p>{signedMessage}</p>

      <h3>Sign Transaction</h3>
      <p>To:</p>
      <input type="text" value = {to} onChange={(e) => setTo(e.target.value)}/>
      <p>Amount:</p>
      <input type="number" value = {amount} onChange={(e) => setAmount(e.target.value)}/>
      <p>Gas Limit?</p>
      <input type="text" value = {gasLimit} onChange={(e) => setGasLimit(e.target.value)}/>
      <button onClick={sendTransaction}> Send Transaction</button>
      <p>{transactionHash}</p>
    </div>
  );
};

export default MyWallet;
