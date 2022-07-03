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
Wallet balance 4.683703386423879
Deploying MyToken contract
Awaiting confirmations
Completed
Contract deployed at 0xb11aE8198ae3D1D049FC11940FB59e534B5eEC3f
```

# 2-Give Vote Power

## Execution

```
yarn run ts-node --files ./scripts/2-give-vote-power.ts 0xb11aE8198ae3D1D049FC11940FB59e534B5eEC3f
```

## Console.log

```
Using address 0x95C1593f28d4623CB31E3510A929106283dE0D99
Wallet balance 4.677375832894351
Attaching MyToken contract interface to address 0xb11aE8198ae3D1D049FC11940FB59e534B5eEC3f
Giving Power vote of 10 to Account 1 0x732e645406536097EF5238753113728812284fE6
Awaiting Mint confirmation
Mint Transaction completed at block 12515099. Hash: 0x820a70fa5fe48dd2ddf19ac851510919b082a448853b96dbcf5869cb8db356a4
Awaiting Delegate confirmation
Delegate Transaction from 0x732e645406536097EF5238753113728812284fE6 to 0x732e645406536097EF5238753113728812284fE6  completed at block 12515100 . Hash: 0xdde9b4fa02dccbe31f182f75c4305977f9d13dd97061dacab4495713a3ac6f9a
Giving Power vote of 10 to Account 2 0xF233d122F96fFb3A283E712B4c439cba176C548d
Awaiting Mint confirmation
Mint Transaction completed at block 12515102. Hash: 0x5fe19c8a736e5b5139a5f4edf89ec41c7ba8eb1ec2834bbf4add604a561907fe
Awaiting Delegate confirmation
Delegate Transaction from 0xF233d122F96fFb3A283E712B4c439cba176C548d to 0xF233d122F96fFb3A283E712B4c439cba176C548d  completed at block 12515104 . Hash: 0x074125aa214cc2f74fcb0502408a4885ad0077051393284b23fde9116f4de3c8
Giving Power vote of 10 to Account 3 0x3dF475F4c39912e142955265e8f5c38dAd286FE3
Awaiting Mint confirmation
Mint Transaction completed at block 12515106. Hash: 0xc232186b08ec8ca17809944ac884d1df1e822465bae51a4e65eb5e56e2a419f0
Awaiting Delegate confirmation
Delegate Transaction from 0x3dF475F4c39912e142955265e8f5c38dAd286FE3 to 0x3dF475F4c39912e142955265e8f5c38dAd286FE3  completed at block 12515108 . Hash: 0x9402d62ea23a7690b171043d0af024ce63cf7761312125fe87ab429518d676e1
```

# 3- Deploy CustomBallot Contract

## Execution

```
 yarn run ts-node --files ./scripts/3-deployment-custom-ballot.ts 0xb11aE8198ae3D1D049FC11940FB59e534B5eEC3f Proposal1 Proposal2 Proposal3
```

## Console.log

```
Using address 0x95C1593f28d4623CB31E3510A929106283dE0D99
Wallet balance 4.67699211789256
Attaching MyToken contract interface to address 0xb11aE8198ae3D1D049FC11940FB59e534B5eEC3f
Deploying CustomBallot contract
Proposals:
Proposal N. 1: Proposal1
Proposal N. 2: Proposal2
Proposal N. 3: Proposal3
Awaiting confirmations
Completed
Contract deployed at 0x695333bF9391Aa544B60F90d3406cd23C4414233 at block Number 12515118
```

# 4- Cast Votes

## Execution

```
yarn run ts-node --files ./scripts/4-cast-votes.ts 0x695333bF9391Aa544B60F90d3406cd23C4414233
```

## Console.log

```
Using address 0x732e645406536097EF5238753113728812284fE6 to cast vote
Wallet balance 0.09985528599932467
Cast 10 votes for Account 1 0x732e645406536097EF5238753113728812284fE6 to Propossal 1
Awaiting Vote confirmation
Vote Transaction completed at block 12515127. Hash: 0x3cf646166613fd11c4e0574a99d0f20c7d25a0574b4a286c76b66bd23756b828
Using address 0xF233d122F96fFb3A283E712B4c439cba176C548d to cast vote
Wallet balance 0.09977308599894107
Cast 9 votes for Account 2 0xF233d122F96fFb3A283E712B4c439cba176C548d to Propossal 2
Awaiting Vote confirmation
Vote Transaction completed at block 12515129. Hash: 0x08083719ec5696fc15199fe3e2dccd54ad4f1f31c1bdb73cd68cb6fb21f411ce
Using address 0x3dF475F4c39912e142955265e8f5c38dAd286FE3 to cast vote
Wallet balance 0.09974576799881359
Cast 8 votes for Account 3 0x3dF475F4c39912e142955265e8f5c38dAd286FE3 to Propossal 3
Awaiting Vote confirmation
Vote Transaction completed at block 12515130. Hash: 0x13d58812362275cd8945dfd2979b7799d997c07d2ac25999245a522b1f8b7882
```

# 5- Query Ballot Result

## Execution

```
yarn run ts-node --files ./scripts/5-query-voting-results.ts 0x695333bF9391Aa544B60F90d3406cd23C4414233
```

## Console.log

```
Using address 0x95C1593f28d4623CB31E3510A929106283dE0D99
Attaching ballot contract interface to address 0x695333bF9391Aa544B60F90d3406cd23C4414233
Voting Results:
Proposal N. 1 (Proposal1) : 10.0
Proposal N. 2 (Proposal2) : 9.0
Proposal N. 3 (Proposal3) : 8.0
```
