//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

event NftMinted(location userLocation,address minter);

contract TreasureHuntNft is ERC721{
    // We store the address to the correct answers in an enum
    // We store the coordinates of the correct answers in a mapping 
    // We check the current location with the coordinates of the correct address
    // If the location is correct, the respective Nft will be minted
    uint256 public s_tokenCounter;
    string[] internal s_locationTokenUris ;
    enum location {
        location1,
        location2,
        location3
    }

    constructor() ERC721("Treasure Hunt NFT", "THT") {
        s_tokenCounter = 0;
    }
    
    mapping (uint256 => location) public pincodeToLocation;

    function mintNft(uint256 pincode)public{
        location newLocation = pincodeToLocation[pincode];
        address owner = msg.sender;
        uint256 newtokenId = s_tokenCounter;
        s_tokenCounter = s_tokenCounter + 1 ;
        _safeMint(owner,newtokenId);
        _setTokenURI(newtokenId, s_locationtokenUris[newLocation])
        emit NftMinted(newLocation,owner);
    }   

    function getTokenUris(uint256 index) public view returns (string memory) {
        return s_locationTokenUris[index];
    }

    function getTokenCounter() public view returns (uint256) {
        return s_tokenCounter;
    }
}
