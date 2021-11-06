import React, { Component } from 'react'
import { Button } from 'antd'
import { Link } from 'react-router-dom'
import { LeftOutlined, CheckCircleOutlined } from '@ant-design/icons';
let web3 = require('./web3');
let lotteryInstance = require('./eth')

class App extends Component {
    render() {
        return (
            <div className="login2">
                <div className="login-content-wrap"><br /><br /><h1 style={{ textAlign: "center" }} >欢迎使用去中心化NFT拍卖平台</h1></div>
                <div className="textblock">
                    <div className="login-content-wrap53" style={{ top: 0 }}>
                        <Button style={{ marginLeft: 20, marginTop: 10 }} shape="round" ghost type="primary">
                            <Link to={{ pathname: "/Home" }}>
                                <LeftOutlined />返回首页
                            </Link>
                        </Button>
                    </div>
                    <div className="textshow">
                        <div style={{ fontSize: 20 }}>去中心化NFT拍卖平台,是一个为用户提供<a href="https://zh.wikipedia.org/zh-cn/%E9%9D%9E%E5%90%8C%E8%B3%AA%E5%8C%96%E4%BB%A3%E5%B9%A3" style={{ color: 'green' }}>NFT</a>交易的线上平台，您可以在平台上进行有关NFT的相关操作。</div>
                        <div style={{ fontSize: 20, marginTop: 30 }}><CheckCircleOutlined />创建您自己的NFT<br /><CheckCircleOutlined />选择您拥有的NFT进行竞价拍卖，包括设置起拍价格和拍卖时间<br /><CheckCircleOutlined />查看其他用户正在进行拍卖的产品，并进行出价<br /><CheckCircleOutlined />查看您的拍卖品的最高出价以及目前的所属权流转信息<br /><CheckCircleOutlined />拍卖结束后，确认您的卖出信息，在买方确认之后方为结束交易</div>
                        <div style={{ fontSize: 20, marginTop: 60 }}>请在交易过程中遵循相关法规，因交易不当产生的财产纠纷本平台概不负责!</div>
                    </div>
                </div>

            </div>
        );
    }
}

export default App;