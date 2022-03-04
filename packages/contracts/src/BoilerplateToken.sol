// src/BoilerplateToken.sol
// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract BoilerplateToken is ERC20 {
    constructor(
        string memory name,
        string memory symbol,
        uint256 initialSupply,
        address beneficiary
    ) ERC20(name, symbol) {
        _mint(beneficiary, initialSupply);
    }
}
