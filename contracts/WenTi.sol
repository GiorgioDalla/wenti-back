// SPDX-License-Identifier: MIT

pragma solidity ^0.8.11;

contract WenTi {
    uint256 public constant PRIZE = 0.00005 ether;
    event Received(address, uint256);

    /*Functions*/

    receive() external payable {
        emit Received(msg.sender, msg.value);
    }

    function earnPrize() public {
        (bool callSucess, ) = payable(msg.sender).call{value: PRIZE}("");
        require(callSucess, "Call failed");
    }
}
