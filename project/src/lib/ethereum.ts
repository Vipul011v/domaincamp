import { ethers } from 'ethers';
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '../config/contract';

export class EthereumService {
  private provider: ethers.BrowserProvider;
  private contract: ethers.Contract | null = null;
  private signer: ethers.Signer | null = null;

  constructor() {
    this.provider = new ethers.BrowserProvider(window.ethereum);
  }

  async init() {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      this.signer = await this.provider.getSigner();
      this.contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, this.signer);
    } catch (error) {
      console.error('Failed to initialize Ethereum service:', error);
      throw error;
    }
  }

  async issueCertificate(hash: string, studentName: string, course: string, issueDate: number) {
    if (!this.contract) throw new Error('Contract not initialized');

    const tx = await this.contract.issueCertificate(
      ethers.id(hash),
      studentName,
      course,
      issueDate
    );
    await tx.wait();
    return tx.hash;
  }

  async verifyCertificate(hash: string): Promise<boolean> {
    if (!this.contract) throw new Error('Contract not initialized');
    return await this.contract.verifyCertificate(ethers.id(hash));
  }
}

export const ethereum = new EthereumService();