import { ethers } from './ethers.js';
import { abi } from './constants.js';
import { contractAddress } from './constants.js';

// const provider = new ethers.providers.Web3Provider(window.ethereum);
let isConnected = false;
const connectButton = document.getElementById('connectBtn');
const fundButton = document.getElementById('fundBtn');
const balanceBtn = document.getElementById('balanceBtn');
const withdrawButton = document.getElementById('withdrawBtn');
const balanceForm = document.getElementById('balance');
connectButton.onclick = connect;
fundButton.onclick = fund;
balanceBtn.onclick = getBalance;
withdrawButton.onclick = withdraw;
// await provider.send('eth_requestAccounts', []);
// const signer = provider.getSigner();
async function connect() {
  if (typeof window.ethereum !== 'undefined') {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    connectButton.textContent = 'Connected';
    isConnected = true;
  } else {
    connectButton.textContent = 'Install metamask';
  }
}
async function fund(ethAmount) {
  ethAmount = document.getElementById('ethAmount').value;
  if (isConnected == true) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);
    try {
      const transactionResponse = await contract.fund({
        value: ethers.utils.parseEther(ethAmount),
      });
    } catch (error) {
      console.log(error);
    }
  } else {
    alert('Connect metamask');
  }
}
async function getBalance() {
  if (isConnected == true) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const balance = await provider.getBalance(contractAddress);
    balanceForm.textContent = `${ethers.utils.formatEther(balance)} Eth`;
  } else {
    alert('Connect metamask');
  }
}
async function withdraw() {
  if (isConnected == true) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);
    try {
      const transactionResponse = await contract.withdraw();
    } catch (error) {
      console.log(error);
    }
  } else {
    alert('Connect metamask');
  }
}
