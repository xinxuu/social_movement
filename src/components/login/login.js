import { Form, Input, Button, Checkbox, Tabs} from 'antd';
import { withRouter } from 'react-router-dom';
import React, { Component } from 'react'
import axios from 'axios'
import './login.css'

import store from '../../store/index'
import api from '../../config/api';
import { getCode } from '../../network/login';

class login extends Component {
    state = {
        loginType:  'account',
        isCountDown: false,
        countdown: 60,
        phone: null,
    }

    // constructor(props) {
    //     super(props)
    //     this.state.user = store.getState();
    //     this.storeChange = this.storeChange.bind(this)
    //     store.subscribe(this.storeChange)
    // }

    componentWillMount(){
        // const user = store.getState()
        // console.log(user);
        // this.setState({
        //     user: user
        // })
        // store.subscribe(this.storeChange).bind(this)
        // axios.get('http://localhost:3000/api/message', {params: {phone: 15703453653}}).then(
        //     response => {
        //         console.log(response);
        //     },
        //     err => {
        //         console.log(err);
        //     }
        // )
    }
    render() {
        const {isCountDown,countdown} = this.state
        return (
            <div className='login'>
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 8 }}
                    initialValues={{ remember: true }}
                    onFinish={this.onFinish}
                    onFinishFailed={this.onFinishFailed}
                    autoComplete="off"
                    >
                    <div className='tabs'>
                        <Tabs activeKey={this.state.loginType} onChange={(activeKey) => this.setLoginType(activeKey)} centered>
                            <Tabs.TabPane key={'account'} tab={'账号密码登录'} />
                            <Tabs.TabPane key={'phone'} tab={'手机号登录'} />
                        </Tabs> 
                    </div>
                    
                    {this.state.loginType === "account" && (
                    <>
                        <Form.Item
                            label="Username"
                            name="username"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input />
                        </Form.Item>
    
                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password />
                        </Form.Item>
    
                        <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>
    
                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                            <text>还没有账号?</text>
                            <text className='login_register' onClick={this.open_register}>点击注册</text>
                        </Form.Item>
                    </>
                            
                    )}
                    {this.state.loginType === "phone" && (
                    <>
                        <Form.Item
                            label="Phone"
                            name="phone"
                            placeholder={'手机号'}
                            rules={[{ required: true, message: '请输入手机号！' },
                            {pattern: /^1\d{10}$/,message: '手机号格式错误！',}]}
                        >
                            <Input onChange={(value)=>this.setState({phone: value.target.value})} />
                        </Form.Item>
    
                        <Form.Item
                            label="Code"
                            name="code"
                            placeholder={'请输入验证码'}
                            rules={[{ required: true, message: '请输入验证码!' }]}
                        >
                            <div className='yanzhenma'>
                                <Input/>
                                <Button onClick={this.getCode}>{isCountDown?countdown+'s':'获取验证码'}</Button>
                            </div>
                            
                        </Form.Item>
    
                        <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>
    
                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                            <text>还没有账号?</text>
                            <text className='login_register' onClick={this.open_register}>点击注册</text>
                        </Form.Item>
                    </>
                            
                    )}
                </Form>
            </div>
        )
    }
    setLoginType = (activeKey)=> {
        this.setState({
            loginType: activeKey
        })
    }
    onFinish = (values)=> {
        console.log('Success:', values);
        const loginType = this.state.loginType
        if(loginType === 'account') {
            axios.get(api.LoginA,{params: {nickname: values.username, password: values.password}}).then(
                response => {
                    console.log(response);
                    const action = {
                        type: "change_user",
                        user: response.data.User,
                    }
                    this.props.init_user(response.data.User)
                    store.dispatch(action)
                    this.props.close_login()
                    // const user = store.getState()
                    // this.props.history.push({pathname: "/home"})
                    // store.subscribe(this.handleChange) // 组件订阅 store，传递一个函数，只要 store 数据改变，这个函数就会被执行
                },
                err => {

                }
            )
        } else {
            axios.get(api.LoginM,{params: {phone: values.phone,code: values.code}}).then(
                response => {
                    console.log(response);
                     const action = {
                        type: "change_user",
                        user: response.data.User,
                    }
                    
                    this.props.init_user(response.data.User)
                    store.dispatch(action)
                    this.props.close_login()
                }
            )
        }
    }
    onFinishFailed = (errorInfo)=> {
        console.log('Failed:', errorInfo);
        this.props.close_login()
    }
    getCode = ()=> {
        const {phone} = this.state
        
        axios.get(api.Message, {params: {phone: phone}}).then(
            response => {
                console.log(response);
                this.makeCountDown()
            },
            err => {
                console.log(err);
            }
        )
    }

    // storeChange = ()=> {
    //     const User = store.getState().user
    //     const cuser = {
    //         avatar: User.avatar,
    //         nickname: User.nickname
    //     }
    //     this.setState({
    //         user: cuser
    //     })
    // }

    open_register =()=> {
        const that = this
        this.props.close_login()
        this.props.open_register()
    }

    //验证码倒计时
    makeCountDown= ()=> {
        var that = this
        this.setState({isCountDown: true})
        var count = setInterval((value=this.state.countdown) => {
          if(value===1) {
            that.setState({isCountDown:false,countdown:60})
            clearInterval(count)
          }
          else that.setState({countdown: value-1})
        }, 1000)  
      }
}

export default withRouter(login)