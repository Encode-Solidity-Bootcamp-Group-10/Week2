import { Contract, ethers } from "ethers";
import "dotenv/config";
import * as customBallotJson from "../artifacts/contracts/CustomBallot.sol/CustomBallot.json";
import { CustomBallot } from "../typechain";

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
  const provider = new ethers.providers.InfuraProvider(
    "ropsten",
    process.env.INFURA_PROJECT_ID
  );

  // Attach to the MyToken Contract
  if (process.argv.length < 3) throw new Error("CustomBallot address missing");
  const customBallotAddress = process.argv[2];
  console.log(
    `Attaching MyToken contract interface to address ${customBallotAddress}`
  );

  for (let index = 0; index < ACCOUNTS.length; index++) {
    const account = ACCOUNTS[index];
    const wallet = new ethers.Wallet(account!);
    console.log(`Using address ${wallet.address} to cast vote`);
    const signer = wallet.connect(provider);
    const balanceBN = await signer.getBalance();
    const balance = Number(ethers.utils.formatEther(balanceBN));
    console.log(`Wallet balance ${balance}`);
    if (balance < 0.01) {
      throw new Error("Not enough ether");
    }
    const customBallotContract: CustomBallot = new Contract(
      customBallotAddress,
      customBallotJson.abi,
      signer
    ) as CustomBallot;
    const votePower = BASE_VOTE_POWER - index;
    console.log(
      `Cast ${votePower} votes for Account ${index + 1} ${
        wallet.address
      } to Proposal ${index + 1}`
    );
    try {
      const voteTx = await customBallotContract.vote(
        index,
        ethers.utils.parseEther(votePower.toFixed(18))
      );
      console.log("Awaiting Vote confirmation");
      const voteReceipt = await voteTx.wait();
      console.log(
        `Vote Transaction completed at block ${voteReceipt.blockNumber}. Hash: ${voteTx.hash}`
      );
    } catch (error: any) {
      console.error(`Vote Transaction reverted.`);
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
