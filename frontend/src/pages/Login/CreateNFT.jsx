import React, { Component } from 'react';
import { Button, Form, Input, Image } from 'antd'
import { RedoOutlined, LeftOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { Divider } from 'antd';
let web3 = require('./web3');
let lotteryInstance = require('./eth')

const data = [
    {
        title: 'Title 1',
    },
    {
        title: 'Title 2',
    },
    {
        title: 'Title 3',
    },
    {
        title: 'Title 4',
    },
    {
        title: 'Title 5',
    },
    {
        title: 'Title 6',
    },
];
for (let i = 0; i < 23; i++) {
    data.push({
        title: 'Title' + i,
    });
}

class App extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            imgurl: "",
        };
    }

    async componentWillMount() {
        let accounts = await web3.eth.getAccounts()
        if (accounts.length != 0) {
            console.log(accounts.length)
            this.state.disabled = false;
        }
        this.setState({

        })

    }

    onFinish = async () => {
        let accounts = await web3.eth.getAccounts()
        try {
            await lotteryInstance.methods.createNFT(this.state.name, this.state.imgurl).send({
                from: accounts[0],
                value: web3.utils.toWei('0.1', 'ether'),
                gas: '3000000',
            })
            alert("创建成功！");
        }
        catch (e) {
            console.log(e)
            alert("创建失败！请检查账户是否响应");
        }

    }

    onFinishFailed = () => {

    }

    nameChange = (value) => {
        this.setState({
            name: value.target.value
        })
    }

    reload = () => {
        this.setState({

        })
    }

    imgurlChange = (value) => {
        console.log(value.target.value)
        this.setState({
            imgurl: value.target.value,
        })
    }

    render() {
        return (
            <div className="login2">
                <div className="login-content-wrap2">
                    <br /><br /><h1 style={{ textAlign: "center" }} >创建我的NFT</h1>
                    <Divider />
                </div>
                <div className="login-content-wrap6" style={{}}>
                    <Button style={{ marginLeft: 20, marginTop: 10 }} shape="round" ghost type="primary">
                        <Link to={{ pathname: "/MainMenu" }}>
                            <LeftOutlined />返回拍卖列表
                        </Link>
                    </Button>
                </div>
                <div className="login-content-wrap5">
                    <div className="login-content-wrapr">
                        <div id="body" className="login-form">
                            <Form
                                initialValues={{ remember: true }}
                                onFinish={this.onFinish}
                                style={{ marginTop: 30 }}>

                                <Form.Item label="产品名称：" name="name" rules={
                                    [
                                        { required: true, message: '请输入产品名称！' }
                                    ]
                                }>
                                    <Input value={this.state.name} onChange={this.nameChange} placeholder="例：MyNFT1" />
                                </Form.Item>
                                <Form.Item label="图片地址" name="imgurl" rules={
                                    [
                                        { required: true, message: '请输入正确的图片地址！' },

                                    ]
                                }>
                                    <Input value={this.state.imgurl} onChange={this.imgurlChange} placeholder="例：https://imgurl.com" />
                                </Form.Item >

                                <Form.Item>
                                    <Button ghost className="login-form-button2" htmlType="submit" type="primary" shape="round" size='large'>
                                        开始创建
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <Image
                                preview={{
                                    src: this.state.imgurl
                                }}
                                width={420}
                                height={260}
                                src={this.state.imgurl}
                                fallback="https://images.unsplash.com/photo-1499988921418-b7df40ff03f9?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8bm90aGluZ3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60"
                            />
                            <br />
                            <Button type="primary" onClick={this.reload} shape="round"><RedoOutlined />重新加载</Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;