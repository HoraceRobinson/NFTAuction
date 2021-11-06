import React, { Component } from 'react';
import { Button } from 'antd'
import { Link } from 'react-router-dom'
import { QuestionCircleOutlined } from '@ant-design/icons';
let web3 = require('./web3');
let lotteryInstance = require('./eth')

class App extends Component {
    oc = () =>{
        console.log("click")
    }
    constructor() {
        super()
        this.state = {
            disabled:true,
            manager: '',
            round: '',
            winner: '',
            playerCounts: 0,
            balance: 0,
            players: [],
            currentAccount: '',
            isClicked: false,
            isShowButton: '',
        }
    }

    componentDidMount() {

    }

    async componentWillMount() {
        let accounts = await web3.eth.getAccounts()
        if(accounts.length!=0){
            console.log(accounts.length)
            this.state.disabled=false;
        }
        this.setState({
            
        })
    }
    render() {
        return (
            <div className="login2">
                <div className="login-content-wrap"><br /><br /><h1 style={{ textAlign: "center" }} >欢迎使用去中心化NFT拍卖平台</h1></div>
                <div style={{ textAlign: "center", padding: 100, verticalAlign: "middle" }}>
                    <Button disabled={this.state.disabled} className="login-form-button" type="primary" onClick={this.oc} size="large" ghost shape="round" style={{ marginTop: window.innerHeight * 0.3 }}>
                        <Link to={{ pathname: "/MainMenu" }}>开始使用</Link>
                    </Button>
                    <Button disabled={this.state.disabled} className="login-form-button" type="primary" onClick={this.oc} size="large" shape="round" style={{ marginTop: window.innerHeight * 0.3 }}>
                        <Link to={{ pathname: "/Introduction" }}><QuestionCircleOutlined />平台简介</Link>
                    </Button>
                </div>

            </div>
        );
    }
}

export default App;