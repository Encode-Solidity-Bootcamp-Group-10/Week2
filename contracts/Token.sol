// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/draft-ERC20Permit.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";

/// @title Voting to NFT's porposals
/// @author Group 10

contract MyToken is ERC20, AccessControl, ERC20Permit, ERC20Votes {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE"); /// @dev the role required to give vote power to other addresses

    /// @notice Create a new Token
    /// @notice expanding ERC20 and ERC20Permit tokens
    /// @notice Giving Admin and Mint role to the creator
    constructor() ERC20("MyToken", "MTK") ERC20Permit("MyToken") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender); /// @dev give default Admin role to the address deploying the contract
        _grantRole(MINTER_ROLE, msg.sender); /// @dev give default Mint role to the address deploying the contract
    }

    /// @notice Public function to mint tokens
    /// @notice Limited to addresses with Mint role
    /// @param to Address of the person receiving the tokens
    /// @param amount Quantity of tokens minted
    function mint(address to, uint256 amount) public onlyRole(MINTER_ROLE) {
        _mint(to, amount); /// @dev call to private function
    }

    /// @notice The following functions are overrides required by Solidity.
   
    /// @notice Hook that is called after any transfer of tokens
    /// @param from Address of the person emitting the tokens
    /// @param to Address of the person receiving the tokens
    /// @param amount Quantity of tokens transfered
    function _afterTokenTransfer(address from, address to, uint256 amount)
        internal
        override(ERC20, ERC20Votes)
    {
        super._afterTokenTransfer(from, to, amount); /// @dev private function calling ERC20 and ERC20Votes _afterTokenTransfer method
    }

    /// @notice Private function to mint tokens
    /// @param to Address of the person receiving the tokens
    /// @param amount Quantity of tokens minted
    function _mint(address to, uint256 amount)
        internal
        override(ERC20, ERC20Votes)
    {
        super._mint(to, amount); /// @dev private function calling ERC20 and ERC20Votes mint method
    }

    /// @notice Private function to burn tokens
    /// @param account Address of the person storing the tokens
    /// @param amount Quantity of tokens burned
    function _burn(address account, uint256 amount)
        internal
        override(ERC20, ERC20Votes)
    {
        super._burn(account, amount); /// @dev private function calling ERC20 and ERC20Votes burn method
    }
}