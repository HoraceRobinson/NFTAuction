from web3 import Web3
from config import SETTING
from config import w3


abi = """[
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "approved",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "Approval",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "operator",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "bool",
          "name": "approved",
          "type": "bool"
        }
      ],
      "name": "ApprovalForAll",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "Transfer",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "approve",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "nfts",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "imgurl",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "magic",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "strength",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "intelligence",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "luck",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "level",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "isonsale",
          "type": "bool"
        },
        {
          "internalType": "uint256",
          "name": "lowestprice",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "tobeclaimed",
          "type": "bool"
        },
        {
          "internalType": "uint256",
          "name": "endtime",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "finalOwner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "getApproved",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "operator",
          "type": "address"
        }
      ],
      "name": "isApprovedForAll",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "name",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "ownerOf",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "result",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "imgurl",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "magic",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "strength",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "intelligence",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "luck",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "level",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "isonsale",
          "type": "bool"
        },
        {
          "internalType": "uint256",
          "name": "lowestprice",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "tobeclaimed",
          "type": "bool"
        },
        {
          "internalType": "uint256",
          "name": "endtime",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "safeTransferFrom",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        },
        {
          "internalType": "bytes",
          "name": "_data",
          "type": "bytes"
        }
      ],
      "name": "safeTransferFrom",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "operator",
          "type": "address"
        },
        {
          "internalType": "bool",
          "name": "approved",
          "type": "bool"
        }
      ],
      "name": "setApprovalForAll",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes4",
          "name": "interfaceId",
          "type": "bytes4"
        }
      ],
      "name": "supportsInterface",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "symbol",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "temp",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "tokenURI",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "transferFrom",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_imgurl",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_magic",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_strength",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_intelligence",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_luck",
          "type": "uint256"
        }
      ],
      "name": "createNFT",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function",
      "payable": true
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_sender",
          "type": "address"
        }
      ],
      "name": "getNFT",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "id",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "imgurl",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "magic",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "strength",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "intelligence",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "luck",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "level",
              "type": "uint256"
            },
            {
              "internalType": "address[]",
              "name": "ownerhistory",
              "type": "address[]"
            },
            {
              "internalType": "bool",
              "name": "isonsale",
              "type": "bool"
            },
            {
              "internalType": "uint256",
              "name": "lowestprice",
              "type": "uint256"
            },
            {
              "internalType": "address[]",
              "name": "bidderhistory",
              "type": "address[]"
            },
            {
              "internalType": "uint256[]",
              "name": "pricehistory",
              "type": "uint256[]"
            },
            {
              "internalType": "bool",
              "name": "tobeclaimed",
              "type": "bool"
            },
            {
              "internalType": "uint256",
              "name": "endtime",
              "type": "uint256"
            }
          ],
          "internalType": "struct auction.NFT[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getAuction",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "id",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "imgurl",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "magic",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "strength",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "intelligence",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "luck",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "level",
              "type": "uint256"
            },
            {
              "internalType": "address[]",
              "name": "ownerhistory",
              "type": "address[]"
            },
            {
              "internalType": "bool",
              "name": "isonsale",
              "type": "bool"
            },
            {
              "internalType": "uint256",
              "name": "lowestprice",
              "type": "uint256"
            },
            {
              "internalType": "address[]",
              "name": "bidderhistory",
              "type": "address[]"
            },
            {
              "internalType": "uint256[]",
              "name": "pricehistory",
              "type": "uint256[]"
            },
            {
              "internalType": "bool",
              "name": "tobeclaimed",
              "type": "bool"
            },
            {
              "internalType": "uint256",
              "name": "endtime",
              "type": "uint256"
            }
          ],
          "internalType": "struct auction.NFT[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_id",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_sec",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_lowestprice",
          "type": "uint256"
        }
      ],
      "name": "createAuction",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function",
      "payable": true
    },
    {
      "inputs": [],
      "name": "updateAuction",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "payable",
      "type": "function",
      "payable": true
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "timestamp",
          "type": "uint256"
        }
      ],
      "name": "checkAllOverTime",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function",
      "payable": true
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_id",
          "type": "uint256"
        }
      ],
      "name": "ownerconfirm",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function",
      "payable": true
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_id",
          "type": "uint256"
        }
      ],
      "name": "buyerconfirm",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function",
      "payable": true
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_id",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "sender",
          "type": "address"
        }
      ],
      "name": "bid",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function",
      "payable": true
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_sender",
          "type": "address"
        }
      ],
      "name": "getbid",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "id",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "imgurl",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "magic",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "strength",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "intelligence",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "luck",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "level",
              "type": "uint256"
            },
            {
              "internalType": "address[]",
              "name": "ownerhistory",
              "type": "address[]"
            },
            {
              "internalType": "bool",
              "name": "isonsale",
              "type": "bool"
            },
            {
              "internalType": "uint256",
              "name": "lowestprice",
              "type": "uint256"
            },
            {
              "internalType": "address[]",
              "name": "bidderhistory",
              "type": "address[]"
            },
            {
              "internalType": "uint256[]",
              "name": "pricehistory",
              "type": "uint256[]"
            },
            {
              "internalType": "bool",
              "name": "tobeclaimed",
              "type": "bool"
            },
            {
              "internalType": "uint256",
              "name": "endtime",
              "type": "uint256"
            }
          ],
          "internalType": "struct auction.NFT[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ] """

contractObj = w3.eth.contract(address=Web3.toChecksumAddress(SETTING["CONTRACT_ADDRESS"]), abi=abi)


def doitForUni(ethAmount):
    tx_dic = contractObj.functions.updateAuction().buildTransaction({
        'from': SETTING["WALLET_ADDRESS"],
        'gas': 200000,
        'value': 0
    })
    return tx_dic
