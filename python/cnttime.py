from config import w3, sendTransation
from contract import doitForUni
import time

if __name__ == '__main__':
    while 1:
        tx_dic_one = doitForUni(w3.toWei('0.1', 'ether'))
        sendTransation(tx_dic_one)
        print("the program is running")
        time.sleep(30)
