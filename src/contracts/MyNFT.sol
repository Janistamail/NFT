// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract MyNFT is Ownable, ERC721URIStorage {
    address public admin;

    constructor() ERC721("NFTCertificate", "NFT_cert") {
        admin = msg.sender;
    }

    function mint(
        address recipient,
        uint256 tokenId,
        string memory tokenURI
    ) public onlyOwner {
        _mint(recipient, tokenId);
        _setTokenURI(tokenId, tokenURI);
    }
   
}

