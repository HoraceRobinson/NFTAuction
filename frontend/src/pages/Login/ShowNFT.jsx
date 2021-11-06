import React, { Component } from 'react';
import { Card, Button, Col, Row, Modal, List, Image, Descriptions, Tag, Form, InputNumber } from 'antd'
import { LeftOutlined, CheckOutlined } from '@ant-design/icons'
import { Divider } from 'antd'
import { Link } from 'react-router-dom'
const { Meta } = Card
let web3 = require('./web3');
let lotteryInstance = require('./eth')


function States(e) {
    if (e.e.isonsale) {
        return <Tag color="magenta">拍卖中</Tag>
    }
    else {
        if (e.e.tobeclaimed == true) {
            return <Tag color="orange">待确认交易</Tag>
        }
        else {
            return <Tag color="blue">未拍卖</Tag>
        }
    }
}

class App extends Component {

    constructor() {
        super()
        this.state = {
            data: [],
            loading: false,
            visible: false,
            visible2: false,
            visible3: false,
            visible4: false,
            ownerhistory: [],
            bidderhistory: [],
            model: 0,
            day: 0,
            hour: 0,
            minute: 0,
            maxprice: 0,
            lowestprice: 0,
        }
    }

    async componentWillMount() {
        let accounts = await web3.eth.getAccounts()
        if (accounts.length != 0) {
            console.log(accounts.length)
            this.state.disabled = false;
        }
        let result = await lotteryInstance.methods.getNFT(accounts[0]).call();
        console.log(result);
        for (let i = 0; i <= result.length - 1; i++) {
            this.state.data.push({
                id: i,
                ntfid: result[i][0],
                name: result[i][1],
                imgurl: result[i][2],
                ownerhistory: result[i][3],
                isonsale: result[i][4],
                lowestprice: result[i][5] * 1.0 / 100,
                bidderhistory: result[i][6],
                pricehistory: result[i][7],
                tobeclaimed: result[i][8],
            })
        }
        this.setState({

        })
    }


    showModal = (e) => {

        delete this.state.ownerhistory
        this.state.ownerhistory = [];

        for (let i = 0; i <= e.ownerhistory.length - 1; i++) {
            this.state.ownerhistory.push({
                hi: e.ownerhistory[i]
            })
        }
        this.setState({
            visible: true,
            model: e.id,
        });
        if (e.bidderhistory.length == 0) {
            this.setState({
                maxprice: e.lowestprice
            })
        }
        else {
            this.setState({
                maxprice: e.pricehistory[e.bidderhistory.length - 1] * 1.0 / 100
            })
        }
    };

    sell = (e) => {
        if (e.isonsale == true || e.tobeclaimed == true) {
            alert('该产品目前正在进行拍卖');
        }
        else {
            this.setState({ visible2: true });
        }
    }

    auctionstatus = (e) => {
        if (this.state.data[this.state.model].isonsale == true || this.state.data[this.state.model].tobeclaimed == true) {
            delete this.state.bidderhistory;
            this.state.bidderhistory = [];
            for (let i = 0; i <= e.bidderhistory.length - 1; i++) {
                this.state.bidderhistory.push({
                    buyer: e.bidderhistory[i],
                    price: e.pricehistory[i] * 1.0 / 100
                })

            }
            console.log(e.bidderhistory);
            console.log(this.state.bidderhistory);
            this.setState({
                visible3: true,
            })
        }
        else {
            alert("该产品当前未进行拍卖");
        }
    }

    confirm = async () => {
        let accounts = await web3.eth.getAccounts()
        console.log(accounts);
        if (this.state.data[this.state.model].isonsale == false && this.state.data[this.state.model].tobeclaimed == true) {
            if (this.state.data[this.state.model].bidderhistory.length == 0) {
                try {
                    await lotteryInstance.methods.ownerconfirm(this.state.data[this.state.model].ntfid).send({
                        from: accounts[0],
                        value: 0,
                        gas: '200000',
                    })
                    // alert("Sell success!");
                    alert("产品拍卖已结束，无人竞拍");
                }
                catch (e) {
                    alert("操作失败！");
                    console.log(e);
                }

            }
            else {
                this.setState({
                    visible4: true,
                })
            }
        }
        else {
            alert("拍卖未结束，无法确认");
        }
    }

    confirm2 = async () => {
        let accounts = await web3.eth.getAccounts()
        try {
            await lotteryInstance.methods.ownerconfirm(this.state.data[this.state.model].ntfid).send({
                from: accounts[0],
                value: 0,
                gas: '200000',
            });
            alert("操作成功，等待买方确认交易");
        }
        catch (e) {
            alert("操作失败，请检查合约调用是否正常");
            console.log(e);
        }
    }

    changeauctiondurationday = (value) => {
        this.setState({
            day: value
        })
    }

    changeauctiondurationhour = (value) => {
        this.setState({
            hour: value
        })
    }
    changeauctiondurationminute = (value) => {
        this.setState({
            minute: value
        })
    }

    changelowestprice = (value) => {
        this.setState({
            lowestprice: value
        })
        console.log(this.state.lowestprice * 100)
    }

    createauction = async () => {
        let accounts = await web3.eth.getAccounts()
        console.log(this.state.lowestprice, this.state.auctionduration);
        let seconds = this.state.day * 24 * 3600 + this.state.hour * 3600 + this.state.minute * 60;
        try {
            await lotteryInstance.methods.createAuction(this.state.data[this.state.model].ntfid, seconds, this.state.lowestprice * 100).send({
                from: accounts[0],
                value: web3.utils.toWei('0.1', 'ether'),
                gas: '3000000',
            })
            alert("创建拍卖成功");
        }
        catch (e) {
            alert("创建拍卖失败，请检查相关信息是否正确");
            console.log(e);
        }
    }

    handleCancel = () => {
        this.setState({ visible: false });
    };

    handleCancel2 = () => {
        this.setState({ visible2: false });
    };

    handleCancel3 = () => {
        this.setState({ visible3: false });
    };

    handleCancel4 = () => {
        this.setState({ visible4: false });
    };

    render() {
        return (
            <div className="login2">
                <div className="login-content-wrap2">
                    <br /><br /><h1 style={{ textAlign: "center" }} >我的NFT</h1>
                    <Divider />
                </div>
                <div className="login-content-wrap3" >
                    <Button style={{ marginLeft: 20, marginTop: 10 }} shape="round" ghost type="primary">
                        <Link to={{ pathname: "/MainMenu" }}>
                            <LeftOutlined />返回拍卖列表
                        </Link>
                    </Button>
                </div>

                <div className="login-content-wrap4">
                    <br />
                    <List
                        grid={{
                            gutter: 0,
                            xs: 1,
                            sm: 2,
                            md: 6,
                            lg: 6,
                            xl: 6,
                            xxl: 6,
                        }}
                        pagination={{
                            hideOnSinglePage: false,
                            onChange: page => {
                                console.log(page);
                            },
                            pageSize: 6,
                            // position: ["bottomCenter"],
                        }}
                        dataSource={this.state.data}
                        renderItem={item => (
                            <List.Item>
                                <Card
                                    hoverable
                                    style={{ width: 200, marginLeft: 10, marginTop: 50 }}
                                    cover={<img width={200} height={150} alt="example" src={item.imgurl} />}
                                    onClick={() => this.showModal(item)}
                                >
                                    <Meta title={item.name} description={item.imgurl} style={{ textAlign: 'center' }} />
                                </Card>

                                <Modal
                                    visible={this.state.visible}
                                    title="详细信息"
                                    onOk={this.handleOk}
                                    onCancel={this.handleCancel}
                                    footer={[
                                        <Button key="back" onClick={this.handleCancel}>
                                            返回
                                        </Button>,
                                        <Button key="submit" type="primary" onClick={() => this.auctionstatus(item)}>
                                            查看拍卖状态
                                        </Button>,
                                        <Button key="submit" type="primary" onClick={() => this.sell(item)}>
                                            拍卖该产品
                                        </Button>,
                                    ]}
                                    width={window.innerWidth * 0.6}
                                >
                                    <Row>
                                        <Col span={10}>
                                            <Image
                                                width={300}
                                                height={200}
                                                src={this.state.data[this.state.model].imgurl}
                                            />
                                        </Col>
                                        <Col span={14}>
                                            <Descriptions layout="vertical" bordered size={"small"}>
                                                <Descriptions.Item label="产品名称" span={3}>{this.state.data[this.state.model].name}</Descriptions.Item>
                                                <Descriptions.Item label="图片地址" span={3}>{this.state.data[this.state.model].imgurl}</Descriptions.Item>
                                                <Descriptions.Item label="拍卖状态" span={1.5}><States e={this.state.data[this.state.model]} /></Descriptions.Item>
                                                <Descriptions.Item label="流转历史">
                                                    <List dataSource={this.state.ownerhistory}
                                                        renderItem={item2 => (
                                                            <div>{item2.hi}</div>
                                                        )}
                                                    />
                                                </Descriptions.Item>
                                            </Descriptions>
                                        </Col>
                                    </Row>


                                </Modal>
                                <Modal
                                    visible={this.state.visible2}
                                    title={"创建拍卖项"}
                                    onCancel={this.handleCancel2}
                                    footer={[
                                    ]}
                                    width={window.innerWidth * 0.4}
                                >
                                    <div id="body" className="login-formown">
                                        <Form onFinish={this.createauction} style={{ textAlign: 'center' }}>
                                            <Form.Item label={<div>起拍价格<svg t="1634640039778" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2518" width="20" height="20"><path d="M509.610667 766.72L195.413333 581.12 509.568 1024l314.453333-442.88-314.538666 185.6h0.128zM514.389333 0L200.106667 521.514667l314.24 185.770666 314.24-185.6L514.389333 0z" p-id="2519"></path></svg></div>} name="startingsrice" rules={
                                                [
                                                    { required: true, message: '请确认起拍价格' }
                                                ]
                                            }>
                                                <InputNumber min={0.01} max={59} value={this.state.lowestprice} onChange={this.changelowestprice} />
                                            </Form.Item>
                                            <Form.Item label="拍卖时长/日：" name="auctiondurtionday" rules={
                                                [
                                                    { required: true, message: '请确认拍卖时间' },

                                                ]
                                            }>
                                                <InputNumber min={0} max={23} value={this.state.day} onChange={this.changeauctiondurationday} />
                                            </Form.Item >
                                            <Form.Item label="拍卖时长/时：" name="auctiondurtionhour" rules={
                                                [
                                                    { required: true, message: '请确认拍卖时间' },

                                                ]
                                            }>
                                                <InputNumber min={0} max={29} value={this.state.hour} onChange={this.changeauctiondurationhour} />
                                            </Form.Item >
                                            <Form.Item label="拍卖时长/分：" name="auctiondurtionminute" rules={
                                                [
                                                    { required: true, message: '请确认拍卖时间' },

                                                ]
                                            }>

                                                <InputNumber min={1 - this.state.day - this.state.hour} value={this.state.minute} onChange={this.changeauctiondurationminute} />
                                            </Form.Item >
                                            <Form.Item>
                                                <Button htmlType="submit" type="primary" shape="round" size='large'>
                                                    <CheckOutlined />确认
                                                </Button>
                                            </Form.Item>
                                        </Form>
                                    </div>
                                </Modal>
                                <Modal
                                    visible={this.state.visible3}
                                    title={"拍卖状态"}
                                    onCancel={this.handleCancel3}
                                    footer={[
                                        <Button key="back" onClick={this.handleCancel3}>
                                            返回
                                        </Button>,
                                        <Button key="submit" type="primary" onClick={() => this.confirm(item)}>
                                            确认
                                        </Button>,
                                    ]}
                                    width={window.innerWidth * 0.6}
                                >
                                    <Descriptions layout="vertical" bordered size={"small"}>
                                        <Descriptions.Item label="拍卖品名称" span={3}>{this.state.data[this.state.model].name}</Descriptions.Item>
                                        <Descriptions.Item label="拍卖状态" span={1.5}><States e={this.state.data[this.state.model]} /></Descriptions.Item>
                                        <Descriptions.Item label="起拍价格" span={1.5}>
                                            <svg t="1634640039778" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2518" width="16" height="16"><path d="M509.610667 766.72L195.413333 581.12 509.568 1024l314.453333-442.88-314.538666 185.6h0.128zM514.389333 0L200.106667 521.514667l314.24 185.770666 314.24-185.6L514.389333 0z" p-id="2519"></path></svg>
                                            {this.state.data[this.state.model].lowestprice}
                                        </Descriptions.Item>
                                        <Descriptions.Item label="当前最高竞价" span={1.5}>
                                            <svg t="1634640039778" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2518" width="16" height="16"><path d="M509.610667 766.72L195.413333 581.12 509.568 1024l314.453333-442.88-314.538666 185.6h0.128zM514.389333 0L200.106667 521.514667l314.24 185.770666 314.24-185.6L514.389333 0z" p-id="2519"></path></svg>
                                            {this.state.maxprice}
                                        </Descriptions.Item>
                                        <Descriptions.Item label="竞价历史记录">
                                            <List dataSource={this.state.bidderhistory}
                                                renderItem={item2 => (
                                                    <div>
                                                        {item2.buyer}:
                                                        <svg t="1634640039778" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2518" width="16" height="16"><path d="M509.610667 766.72L195.413333 581.12 509.568 1024l314.453333-442.88-314.538666 185.6h0.128zM514.389333 0L200.106667 521.514667l314.24 185.770666 314.24-185.6L514.389333 0z" p-id="2519"></path></svg>
                                                        {item2.price}
                                                    </div>
                                                )}
                                            />
                                        </Descriptions.Item>
                                    </Descriptions>
                                </Modal>
                                <Modal
                                    visible={this.state.visible4}
                                    title={<div>确认以<svg t="1634640039778" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2518" width="16" height="16"><path d="M509.610667 766.72L195.413333 581.12 509.568 1024l314.453333-442.88-314.538666 185.6h0.128zM514.389333 0L200.106667 521.514667l314.24 185.770666 314.24-185.6L514.389333 0z" p-id="2519"></path></svg>{this.state.maxprice}将产品"{this.state.data[this.state.model].name}"卖出吗？</div>}
                                    onCancel={this.handleCancel4}
                                    footer={[
                                        <Button key="back" onClick={this.handleCancel4}>
                                            取消
                                        </Button>,
                                        <Button key="submit" type="primary" onClick={() => this.confirm2(item)}>
                                            确认
                                        </Button>,
                                    ]}
                                    width={window.innerWidth * 0.5}
                                >
                                    <div id="body">
                                        <h3>交易不可逆，一旦确认将转让该产品所有权</h3>
                                    </div>
                                </Modal>
                            </List.Item>
                        )}
                    />
                </div>
            </div>
        );
    }
}

export default App;