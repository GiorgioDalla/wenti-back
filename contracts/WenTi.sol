// SPDX-License-Identifier: MIT

//Get funds from survey deployer
//distribute x amount of funds when the survey has been completed
//

pragma solidity ^0.8.11;

contract WenTi {
    /*Errors*/

    error WenTi__pumpingTooLittle();

    // State variables
    uint256 private constant MINI_VAL = 10 ether;
    uint256 public constant PRIZE = 0.5 ether;

    /*Functions*/

    function pumpIt() public payable {
        // if  () {
        //     revert with WenTi__pumpingTooLittle();
        // }

        if (msg.value < MINI_VAL) {
            revert WenTi__pumpingTooLittle();
        }
    }

    function earnPrize() public payable {
        //call function that would call another contract it is call that we gonna use. but I should learn about the differnces (send transfer)

        (bool callSucess, ) = payable(msg.sender).call{value: PRIZE}("");
        require(callSucess, "Call failed");
    }
}

// msg.value;
/**/
