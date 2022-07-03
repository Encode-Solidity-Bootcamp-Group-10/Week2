# Group 10

# Weekend project 2

- Form groups of 3 to 5 students
- Complete the contracts together
- Structure scripts to
  - Deploy everything
  - Interact with the ballot factory
  - Query proposals for each ballot
  - Operate scripts
- Publish the project in Github
- Run the scripts with a few set of proposals, play around with token balances, cast and delegate votes, create ballots from snapshots, interact with the ballots and inspect results
- Write a report detailing the addresses, transaction hashes, description of the operation script being executed and console output from script execution for each step
- (Extra) Use TDD methodology

# 1-Deploy Token (MyToken)

## Execution

```
yarn run ts-node --files ./scripts/1-deployment-token.ts
```

## Console.log

```
Using address 0x95C1593f28d4623CB31E3510A929106283dE0D99
Wallet balance 4.653049768780829
Deploying MyToken contract
Awaiting confirmations
Completed
Contract deployed at 0xef1ee4975fD34dE8489FC7407e6FBF07593359f3
```

# 2-Give Vote Power

## Execution

```
yarn run ts-node --files ./scripts/2-give-vote-power.ts 0xef1ee4975fD34dE8489FC7407e6FBF07593359f3
```

## Console.log

```
Using address 0x95C1593f28d4623CB31E3510A929106283dE0D99
Wallet balance 4.646722215251301
Attaching MyToken contract interface to address 0xef1ee4975fD34dE8489FC7407e6FBF07593359f3
Giving Power vote of 10 to Account 1 0x732e645406536097EF5238753113728812284fE6
Awaiting Mint confirmation
Mint Transaction completed at block 12515784. Hash: 0x39981f570785ba844d5b43ce07b2e15491ad702554291df7de2090eb80134740
Awaiting Delegate confirmation
Delegate Transaction from 0x732e645406536097EF5238753113728812284fE6 to 0x732e645406536097EF5238753113728812284fE6  completed at block 12515786 . Hash: 0x85ef94f0e1cb7114205c7af23318afd708428e86fdbb2180e0271c798f46cdc0
Giving Power vote of 10 to Account 2 0xF233d122F96fFb3A283E712B4c439cba176C548d
Awaiting Mint confirmation
Mint Transaction completed at block 12515787. Hash: 0x092f1c3d367536a5d90c10e1b36ecdffc5f35f3f7e785e7fec833baacfc69cbe
Awaiting Delegate confirmation
Delegate Transaction from 0xF233d122F96fFb3A283E712B4c439cba176C548d to 0xF233d122F96fFb3A283E712B4c439cba176C548d  completed at block 12515789 . Hash: 0x0869784d0c9388b865518e38efd27ee7a40395ffc950cc61dd25fa1e7c60681c
Giving Power vote of 10 to Account 3 0x3dF475F4c39912e142955265e8f5c38dAd286FE3
Awaiting Mint confirmation
Mint Transaction completed at block 12515790. Hash: 0x52661125e03a5e57db3e69f53e3f70e56d4c9e129c126effac0c513c73bb64e7
Awaiting Delegate confirmation
Delegate Transaction from 0x3dF475F4c39912e142955265e8f5c38dAd286FE3 to 0x3dF475F4c39912e142955265e8f5c38dAd286FE3  completed at block 12515791 . Hash: 0x15fc175673f996063be5593bacb142487231867e659200f98a3c56560a21bd68
Awaiting Delegate confirmation
Delegate Transaction from 0x3dF475F4c39912e142955265e8f5c38dAd286FE3 to 0x4377CCB6c89659c47675a1f99315FCDDa9F48E0a  completed at block 12515792 . Hash: 0x134c49fd737e88cb0854b2e9659ddad8f78f2078cb85d81b2c38d9414aa2d588
```

# 3- Deploy CustomBallot Contract

## Execution

```
 yarn run ts-node --files ./scripts/3-deployment-custom-ballot.ts 0xef1ee4975fD34dE8489FC7407e6FBF07593359f3 Proposal1 Proposal2 Proposal3 Proposal4
```

## Console.log

```
Using address 0x95C1593f28d4623CB31E3510A929106283dE0D99
Wallet balance 4.64633850024951
Attaching MyToken contract interface to address 0xef1ee4975fD34dE8489FC7407e6FBF07593359f3
Deploying CustomBallot contract
Proposals:
Proposal N. 1: Proposal1
Proposal N. 2: Proposal2
Proposal N. 3: Proposal3
Proposal N. 4: Proposal4
Awaiting confirmations
Completed
Contract deployed at 0x84c894cf358e60be0E87835Bd576724F1f88431a at block Number 12515801
```

# 4- Cast Votes

## Execution

```
yarn run ts-node --files ./scripts/4-cast-votes.ts 0x84c894cf358e60be0E87835Bd576724F1f88431a
```

## Console.log

```
Attaching MyToken contract interface to address 0x84c894cf358e60be0E87835Bd576724F1f88431a
Using address 0x732e645406536097EF5238753113728812284fE6 to cast vote
Wallet balance 0.09884388099460478
Cast 10 votes for Account 1 0x732e645406536097EF5238753113728812284fE6 to Proposal 1
Awaiting Vote confirmation
Vote Transaction completed at block 12515806. Hash: 0xab23cc0b2acf7a675c57b953f95776cb107f10e37141a6b367166cfd8b4edadc
Using address 0xF233d122F96fFb3A283E712B4c439cba176C548d to cast vote
Wallet balance 0.09876162699422092
Cast 9 votes for Account 2 0xF233d122F96fFb3A283E712B4c439cba176C548d to Proposal 2
Awaiting Vote confirmation
Vote Transaction completed at block 12515807. Hash: 0xbeef9190eea0704003182940baffb2d786e54700e7c94a3ab0c8b394f69a1af0
Using address 0x3dF475F4c39912e142955265e8f5c38dAd286FE3 to cast vote
Wallet balance 0.09841025349258119
Cast 8 votes for Account 3 0x3dF475F4c39912e142955265e8f5c38dAd286FE3 to Proposal 3
Vote Transaction reverted.
Using address 0x4377CCB6c89659c47675a1f99315FCDDa9F48E0a to cast vote
Wallet balance 4.6083854125044645
Cast 7 votes for Account 4 0x4377CCB6c89659c47675a1f99315FCDDa9F48E0a to Proposal 4
Awaiting Vote confirmation
Vote Transaction completed at block 12515808. Hash: 0xcf0bc443ad2e7502394fd7ff4cda3acd777c1178c94132b960444abc439b7d64
```

# 5- Query Ballot Result

## Execution

```
yarn run ts-node --files ./scripts/5-query-voting-results.ts 0x84c894cf358e60be0E87835Bd576724F1f88431a
```

## Console.log

```
Using address 0x95C1593f28d4623CB31E3510A929106283dE0D99
Attaching ballot contract interface to address 0x84c894cf358e60be0E87835Bd576724F1f88431a
Voting Results:
Proposal N. 1 (Proposal1) : 10.0
Proposal N. 2 (Proposal2) : 9.0
Proposal N. 3 (Proposal4) : 7.0
Proposal N. 4 (Proposal3) : 0.0
```
