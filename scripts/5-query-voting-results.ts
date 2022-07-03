import { Contract, ethers } from "ethers";
import "dotenv/config";
import * as customBallotJson from "../artifacts/contracts/CustomBallot.sol/CustomBallot.json";
import { CustomBallot } from "../typechain";

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
  // const provider = ethers.providers.getDefaultProvider("ropsten");
  const provider = new ethers.providers.InfuraProvider(
    "ropsten",
    process.env.INFURA_PROJECT_ID
  );
  const signer = wallet.connect(provider);
  // Attach to the Ballot Contract
  if (process.argv.length < 3) throw new Error("Ballot address missing");
  const customBallotAddress = process.argv[2];
  console.log(
    `Attaching ballot contract interface to address ${customBallotAddress}`
  );
  const customBallotContract: CustomBallot = new Contract(
    customBallotAddress,
    customBallotJson.abi,
    signer
  ) as CustomBallot;
  // Query proposals until error
  console.log("Voting Results: ");
  const proposals: any[] = [];
  let lastProposal = false;
  let i = 0;
  while (!lastProposal) {
    try {
      const proposal = await customBallotContract.proposals(i);
      proposals.push(proposal);
      i++;
    } catch (error) {
      // console.log(error);
      lastProposal = true;
    }
  }
  proposals.sort((a, b) => b.voteCount.sub(a.voteCount));
  proposals.forEach((proposal, index) => {
    console.log(
      `Proposal N. ${index + 1} (${ethers.utils.parseBytes32String(
        proposal.name
      )}) : ${ethers.utils.formatEther(proposal.voteCount)}`
    );
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
