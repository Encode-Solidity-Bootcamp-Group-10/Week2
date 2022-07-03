import { Contract, ethers } from "ethers";
import "dotenv/config";
import * as myTokenJson from "../artifacts/contracts/Token.sol/MyToken.json";
import { MyToken } from "../typechain";

const BASE_VOTE_POWER = 10;
const ACCOUNTS = [
  process.env.VOTER1_PRIVATE_KEY,
  process.env.VOTER2_PRIVATE_KEY,
  process.env.VOTER3_PRIVATE_KEY,
  process.env.VOTER4_PRIVATE_KEY,
];

if (process.env.PRIVATE_KEY === "" || process.env.MNEMONIC === "") {
  console.warn("Must provide PRIVATE_KEY or MNEMONIC environment variable");
  process.exit(1);
}

if (process.env.INFURA_PROJECT_ID === "") {
  console.warn("Must provide INFURA_PROJECT_ID environment variable");
  process.exit(1);
}

async function main() {
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY!);
  console.log(`Using address ${wallet.address}`);
  const provider = new ethers.providers.InfuraProvider(
    "ropsten",
    process.env.INFURA_PROJECT_ID
  );
  const signer = wallet.connect(provider);
  const balanceBN = await signer.getBalance();
  const balance = Number(ethers.utils.formatEther(balanceBN));
  console.log(`Wallet balance ${balance}`);
  if (balance < 0.01) {
    throw new Error("Not enough ether");
  }

  // Attach to the MyToken Contract
  if (process.argv.length < 3) throw new Error("MyToken address missing");
  const MyTokenAddress = process.argv[2];
  console.log(
    `Attaching MyToken contract interface to address ${MyTokenAddress}`
  );
  const myTokenContract: MyToken = new Contract(
    MyTokenAddress,
    myTokenJson.abi,
    signer
  ) as MyToken;

  for (let index = 0; index < 3; index++) {
    const voterWallet = new ethers.Wallet(ACCOUNTS[index]!);
    const voterSignedWallet = voterWallet.connect(provider);

    console.log(
      `Giving Power vote of ${BASE_VOTE_POWER} to Account ${index + 1} ${
        voterWallet.address
      }`
    );
    const mintTx = await myTokenContract.mint(
      voterWallet.address,
      ethers.utils.parseEther(BASE_VOTE_POWER.toFixed(18))
    );
    console.log("Awaiting Mint confirmation");
    const mintReceipt = await mintTx.wait();
    console.log(
      `Mint Transaction completed at block ${mintReceipt.blockNumber}. Hash: ${mintTx.hash}`
    );
    const delegateTx = await myTokenContract
      .connect(voterSignedWallet)
      .delegate(voterWallet.address);
    console.log("Awaiting Delegate confirmation");
    const delegateReceipt = await delegateTx.wait();
    console.log(
      `Delegate Transaction from ${voterWallet.address} to ${voterWallet.address}  completed at block ${delegateReceipt.blockNumber} . Hash: ${delegateTx.hash}`
    );
  }
  // Delegation to a new account without minting
  const voter3Wallet = new ethers.Wallet(ACCOUNTS[2]!);
  const voterSigned3Wallet = voter3Wallet.connect(provider);
  const voter4Wallet = new ethers.Wallet(ACCOUNTS[3]!);

  const delegateTx = await myTokenContract
    .connect(voterSigned3Wallet)
    .delegate(voter4Wallet.address);
  console.log("Awaiting Delegate confirmation");
  const delegateReceipt = await delegateTx.wait();
  console.log(
    `Delegate Transaction from ${voter3Wallet.address} to ${voter4Wallet.address}  completed at block ${delegateReceipt.blockNumber} . Hash: ${delegateTx.hash}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
