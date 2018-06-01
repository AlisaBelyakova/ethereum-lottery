pragma solidity ^0.4.17; 

contract Lottery {
    address public manager; 
    address[] public players; 
    
    constructor () public {
        manager = msg.sender; 
    }
    
    function enter() public payable {
        require(msg.value > .01 ether);
        players.push(msg.sender);
    }
    
    function random() private view returns (uint) {
        return uint(keccak256(block.difficulty, now, players));
    }
    
    function pickWinner( ) public restricted{
        uint index = random() % players.length; 
        players[index].transfer(address(this).balance);
        players = new address[](0);
    }
    
    modifier restricted(){
        require(msg.sender == manager);
        _; //code of modified function runs here
    }
    
    function getAllPlayers() public view returns (address[]) {
        return players;
    }
    
}