
import './App.css';

import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { Route, NavLink ,Redirect, } from 'react-router-dom';
import { Menu, Modal, Drawer, Button} from 'antd';
import { HomeOutlined, ShopOutlined, SettingOutlined,AppstoreOutlined } from '@ant-design/icons';
import Login from "./components/login/login";
import Register from "./components/register/register"
import SportWall from "./components/sportwall/sportwall"
import Home from './components/home/home'
import Space from './components/space/space'
import EventDetail from './components/eventDetail/eventDetail'

import store from './store/index'

import liked from './utils/img/like.png'


class App extends Component{
    state = {
        user: {
            id: '',
            avatar: '',
            nickname: '',
        },
        login_visible: false,
        register_visible: false,
        drawer_visivle: false,
    }
    componentWillMount() {
        // const user = store.getState()
        // console.log(user);
        // this.setState({
        //     user: user
        // })
    }
    render() {
        const {user,login_visible,register_visible,drawer_visivle} = this.state
        console.log(user);
        return (
            <div className='app'>
                <div className='header'>
                    <Menu mode="horizontal" >
                        <Menu.Item key="home"  icon={<HomeOutlined />}>
                            <NavLink to={{pathname:"/home"}} >主页</NavLink>
                        </Menu.Item>
                        <Menu.Item key="sportWall"  icon={<AppstoreOutlined />}>
                            <NavLink to={{pathname:"/sportWall"}} >运动墙</NavLink>
                        </Menu.Item>
                        <Menu.Item key="space"  icon={<AppstoreOutlined />}>
                            <NavLink to={{pathname:"/space"}} >个人空间</NavLink>
                        </Menu.Item>
                    </Menu>
                    
                    <div className='user'>
                        
                        {/* {user != null? (
                            <>
                            <NavLink to={{pathname:"/login"}}>登录</NavLink>
                            <NavLink to={{pathname:"/register"}} >注册</NavLink>
                        </>
                        ):(<>
                            
                        </>)} */}
                        {user.avatar != '' ? (<>
                            <img src={user.avatar} className='avatar' onClick={()=>{this.showDrawer()}}/>
                            <text>{user.nickname}</text>
                        </>):(
                            <text onClick={()=>this.setState({login_visible: true})} className='user_login'>登录</text>
                        )}
                        <Drawer title={'你好 '+user.nickname} placement="right" onClose={()=> {this.closeDrawer()}} visible={drawer_visivle}>
                            <p>Some contents...</p>
                            <p>Some contents...</p>
                            <p>Some contents...</p>
                            <Button onClick={this.log_out}>退出登录</Button>
                        </Drawer>
                    </div>
                </div>
                <Modal
                    title=""
                    centered
                    visible={login_visible}
                    onOk={() => {this.close_login()}}                          
                    onCancel={() => {this.close_login()}}
                    footer={null}
                    width={600}
                    mask={true}
                >
                    <Login init_user={this.init_user.bind(this)} close_login={this.close_login.bind(this)} open_register={this.open_register.bind(this)}/>    
                </Modal>
                <Modal
                    title=""
                    centered
                    visible={register_visible}
                    onOk={() => {this.close_register()}}                          
                    onCancel={() => {this.close_register()}}
                    footer={null}
                    width={600}
                    mask={true}
                >
                    <Register  close_register={this.close_register.bind(this)} open_login={this.open_login.bind(this)}/>    
                </Modal>
                <div className='body'>
                    <switch>
                        <Route component={()=>{return <Home/>}} path="/home" />
                        <Route component={()=>{return <Space/>}} path="/space" /> 
                        <Route component={()=>{return <SportWall user={user}/>}} path="/sportwall" />
                        <Route component={()=>{return <EventDetail />}} path="/eventDetail/:id" />
                        <Redirect to="/home" />
                    </switch>
                </div>
            </div>
        )
    }

    addMsg = (newMsg)=> {
        newMsg.id = this.state.msg.length+1
        newMsg.checked = false
        const msg1 = this.state.msg
        msg1.push(newMsg)
        this.setState({
        msg: msg1
        })
        this.props.history.push({pathname: "/home",msg: this.state.msg})
    }
    
    init_user = (user) => {
        this.setState({user:user})
    }

    close_login = ()=> {
        this.setState({
            login_visible: false
        })
    }

    close_register = ()=> {
        this.setState({
            register_visible: false
        })
    }

    open_login = ()=> {
        this.setState({
            login_visible: true
        })
    }

    open_register = ()=> {

        console.log('register');
        this.setState({
            register_visible: true
        })
    }

    showDrawer =()=> {
        this.setState({
            drawer_visivle: true
        })
    }

    closeDrawer =()=> {
        this.setState({
            drawer_visivle: false
        })
    }

    log_out =()=> {
        const user = {
            id: '',
            avatar: '',
            nickname: '',
        }
        this.setState({
            user:user
        })
        const action = {
            type: "change_user",
            user: user,
        }
        store.dispatch(action)
        this.closeDrawer()
    }
}

export default withRouter(App) 
