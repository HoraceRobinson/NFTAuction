import React, { Component } from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import Home from './Home'
import Introduction from './Introduction'
import MainMenu from './MainMenu'
import CreateNFT from './CreateNFT'
import ShowNFT from './ShowNFT'
import ShowAuction from './ShowAuction'
export default class Login extends Component {
    render() {
        return (
            <Switch>
                <Route path="/Home" component={Home}></Route>
                <Route path="/Introduction" component={Introduction}></Route>
                <Route path="/MainMenu" component={MainMenu}></Route>
                <Route path="/ShowNFT" component={ShowNFT}></Route>
                <Route path="/ShowAuction" component={ShowAuction}></Route>
                <Route path="/CreateNFT" component={CreateNFT}></Route>
                <Redirect to="/Home"></Redirect>
            </Switch>
        )
    }
}