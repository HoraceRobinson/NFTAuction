pragma solidity 0.8.9;

import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract auction is ERC721 {
    struct NFT {
        uint256 id;
        string name;
        string imgurl;
        address[] ownerhistory;
        bool isonsale;
        uint256 lowestprice;
        address[] bidderhistory;
        uint256[] pricehistory;
        bool tobeclaimed;
        uint256 endtime;
    }

    address[] public temp;
    address public finalOwner;
    NFT[] public nfts;
    NFT[] public result;

    constructor() public ERC721("GameItem", "ITM") {
        finalOwner = msg.sender;
    }

    function createNFT(string memory _name, string memory _imgurl)
        public
        payable
    {
        require(msg.value == 0.1 ether);
        uint256 id = nfts.length;
        delete temp;

        temp.push(msg.sender);
        address[] memory temp3;
        uint256[] memory temp2;
        nfts.push(
            NFT(
                id,
                _name,
                _imgurl,
                temp,
                false,
                0,
                temp3,
                temp2,
                false,
                block.timestamp
            )
        );
        _safeMint(msg.sender, id);
    }

    function createAuction(
        uint256 _id,
        uint256 _sec,
        uint256 _lowestprice
    ) public payable {
        require(msg.value == 0.1 ether);
        require(msg.sender == ownerOf(_id));
        require(nfts[_id].isonsale == false);
        require(nfts[_id].tobeclaimed == false);
        nfts[_id].isonsale = true;
        nfts[_id].endtime = block.timestamp + _sec;
        nfts[_id].lowestprice = _lowestprice;
    }

    function getNFT(address _sender) public returns (NFT[] memory) {
        delete result;
        for (uint256 i = 0; i < nfts.length; i++) {
            if (ownerOf(i) == _sender) {
                result.push(nfts[i]);
            }
        }
        return result;
    }

    function getAuction() public returns (NFT[] memory) {
        delete result;
        for (uint256 i = 0; i < nfts.length; i++) {
            if (nfts[i].isonsale == true) {
                result.push(nfts[i]);
            }
        }
        return result;
    }

    function checkAllOverTime(uint256 timestamp) public payable {
        for (uint256 i = 0; i < nfts.length; i++) {
            if (nfts[i].tobeclaimed == true) {
                if (timestamp >= nfts[i].endtime + 10 * 24 * 3600) {
                    uint256 index = nfts[i].bidderhistory.length;
                    if (index == 0) {
                        delete nfts[i].bidderhistory;
                        delete nfts[i].pricehistory;
                        nfts[i].tobeclaimed = false;
                    } else {
                        index = index - 1;
                        address buyer = nfts[i].bidderhistory[index];
                        approve(buyer, i);
                        uint256 money = nfts[i].pricehistory[index];
                        address payable owner = payable(msg.sender);
                        owner.transfer(money);
                        delete nfts[i].bidderhistory;
                        delete nfts[i].pricehistory;
                        nfts[i].tobeclaimed = false;
                    }
                }
            }
        }
    }

    function updateAuction() public payable returns (uint256) {
        checkAllOverTime(block.timestamp);
        for (uint256 i = 0; i < nfts.length; i++) {
            if (nfts[i].isonsale == true) {
                if (nfts[i].endtime <= block.timestamp) {
                    nfts[i].isonsale = false;
                    nfts[i].tobeclaimed = true;
                }
            }
        }
        return block.timestamp;
    }

    function bid(uint256 _id, address sender) public payable {
        require(msg.sender != ownerOf(_id));
        require(nfts[_id].isonsale = true);
        if (nfts[_id].bidderhistory.length == 0) {
            nfts[_id].bidderhistory.push(msg.sender);
            nfts[_id].pricehistory.push(
                (100 * msg.value) / 1000000000000000000
            );
        } else {
            uint256 index = nfts[_id].bidderhistory.length - 1;
            payable(nfts[_id].bidderhistory[index]).transfer(
                nfts[_id].pricehistory[index]
            );
            nfts[_id].bidderhistory.push(msg.sender);
            nfts[_id].pricehistory.push(
                (100 * msg.value) / 1000000000000000000
            );
        }
    }

    function getbid(address _sender) public returns (NFT[] memory) {
        delete result;
        for (uint256 i = 0; i < nfts.length; i++) {
            if (nfts[i].isonsale == true || nfts[i].tobeclaimed == true)
                for (uint256 j = 0; j < nfts[i].bidderhistory.length; j++) {
                    if (nfts[i].bidderhistory[j] == _sender) {
                        result.push(nfts[i]);
                        break;
                    }
                }
        }
        return result;
    }

    function ownerconfirm(uint256 _id) public payable {
        require(nfts[_id].tobeclaimed == true);

        require(msg.sender == ownerOf(_id));
        uint256 index = nfts[_id].bidderhistory.length;
        if (index == 0) {
            delete nfts[_id].bidderhistory;
            delete nfts[_id].pricehistory;
            nfts[_id].tobeclaimed = false;
        } else {
            index = index - 1;
            require(index >= 0);
            address buyer = nfts[_id].bidderhistory[index];
            approve(buyer, _id);
            uint256 money = nfts[_id].pricehistory[index];
            address payable owner = payable(msg.sender);
            uint256 money1 = (money * 90) / 10000;
            uint256 money2 = ((money - money1) * 1) / 100;
            owner.transfer(money1);
            payable(finalOwner).transfer(money2);
        }
    }

    function buyerconfirm(uint256 _id) public payable {
        require(nfts[_id].tobeclaimed == true);
        require(msg.sender != ownerOf(_id));
        transferFrom(ownerOf(_id), msg.sender, _id);
        nfts[_id].tobeclaimed = false;
        delete nfts[_id].pricehistory;
        nfts[_id].ownerhistory.push(msg.sender);
        delete nfts[_id].bidderhistory;
    }
}
