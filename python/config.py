from web3 import Web3

SETTING = {
    "ROPSTEN_URL": "https://ropsten.infura.io/v3/XXX",
    "MAINNET_URL": "http://127.0.0.1:8545",
    "CONTRACT_ADDRESS": "0x59E22F02386a0F7987D9EE0e7437cce141563efD",
    "WALLET_PRIVATEKEY": "f2b4b39a7054f725818644f9f874b4e6c4c7ec06c9387546db99fbf2ce1e667f",
    "WALLET_ADDRESS": "0x8055a413b80ECbCB892Fac3B0860618985134bA9",
    "TIME_SPAN": 100
}

w3 = Web3(Web3.HTTPProvider(SETTING["MAINNET_URL"]))


def sendTransation(tx_dic):
    nonce = w3.eth.getTransactionCount(SETTING["WALLET_ADDRESS"])
    tx_dic["nonce"] = nonce
    tx_dic['gasPrice'] = w3.eth.gasPrice
    sign_tx = w3.eth.account.signTransaction(tx_dic, private_key=SETTING["WALLET_PRIVATEKEY"])
    return w3.eth.sendRawTransaction(sign_tx.rawTransaction)


def sendTransationWithMoreGas(tx_dic, gwei):
    nonce = w3.eth.getTransactionCount(SETTING["WALLET_ADDRESS"])
    tx_dic['nonce'] = nonce
    tx_dic['gasPrice'] = w3.eth.gasPrice + w3.toWei(gwei, 'gwei')
    sign_tx = w3.eth.account.signTransaction(tx_dic, private_key=SETTING["WALLET_PRIVATEKEY"])
    return w3.eth.sendRawTransaction(sign_tx.rawTransaction)
