import { Form, Input, Button, Checkbox, Upload, Image} from 'antd';
import ImgCrop from 'antd-img-crop';
import React, { Component } from 'react'
import { LoadingOutlined, PlusOutlined,CloseCircleFilled } from '@ant-design/icons';
import axios from 'axios'
import './register.css'
import COS, { util } from 'cos-js-sdk-v5'
import api from '../../config/api';

import register_avatar from '../../utils/img/register_avatar.png'


import { getCode } from '../../network/login';
import UploadPic from '../upload/uploadPic'
import Item from 'antd/lib/list/Item';

export default class login extends Component {
    state = {
        userInfo: {},
        loading: false,
        phone: null,
        countdown: 60,
        isCountDown: false,
    }

    render() {
        const {isCountDown,countdown} = this.state

        const uploadButton = (
            <div>
                {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
                <div style={{ marginTop: 8 }}>Upload</div>
            </div>
        );
        
        return (
            <div className='register'>
                <div className='register_avatar'>
                    <img src={register_avatar}/>
                </div>
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 8 }}
                    initialValues={{ remember: true }}
                    onFinish={this.onFinish}
                    onFinishFailed={this.onFinishFailed}
                    autoComplete="off"
                    >
                        <Form.Item
                            label="头像"
                            name="avatar"
                            className='avatar'
                        >
                            <ImgCrop rotate>
                                <Upload
                                    name="avatar"
                                    listType="picture-card"
                                    className="avatar-uploader"
                                    action="#"
                                    showUploadList={false}
                                    customRequest={this.upload}
                                >
                                    {this.state.userInfo.avatar ? <img src={this.state.userInfo.avatar} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                                </Upload>
                            </ImgCrop>
                            {this.state.userInfo.avatar != null &&(
                                <div className='delete' onClick={this.deleteImg}>
                                    <CloseCircleFilled style={{fontSize: '20px',color:'red',}}/>
                                </div>
                            )}
                        </Form.Item>
    
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

                        <Form.Item
                            label="rePassword"
                            name="repassword"
                            rules={[{ required: true, message: 'Please input your repassword!' }]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item
                            label="Phone"
                            name="phone"
                            placeholder={'手机号'}
                            rules={[{ required: true, message: '请输入手机号！' },
                            {pattern: /^1\d{10}$/,message: '手机号格式错误！',}]}
                            className='register_phone'
                        >
                            <Input onChange={(value)=>this.setState({phone: value.target.value})} />
                            {/* <input type="text" ref={(c)=>{this.code = c}} id='register_phone'/> */}
                        </Form.Item>
    
                        <Form.Item
                            label="Code"
                            name="code"
                            placeholder={'请输入验证码'}
                            rules={[{ required: true, message: '请输入验证码!' }]}
                        >
                            <div className='yanzhenma'>
                                <Input/>
                                <Button onClick={()=>this.getCode()}>{isCountDown?countdown+'s':'获取验证码'}</Button>
                            </div>
                            
                        </Form.Item>
    
                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                            <text>已有账号</text>
                            <text className='register_login' onClick={()=>this.open_login()}>点击登录</text>
                        </Form.Item>
                </Form>
            </div>
        )
    }
    onFinish = (values)=> {
        console.log('Success:', values);
        const {phone,username,password,code} = values
        const userInfo = this.state.userInfo
        // userInfo.telephone = phone
        // userInfo.nickname = username
        // userInfo.password = password
        // userInfo.code = code
    
        console.log(phone,username,password,code,userInfo.avatar);
        console.log(api.Register);
        axios.post(api.Register,{
            phone:phone,
            nickname:username,
            password:password,
            code:code,
            avatar:userInfo.avatar
        }).then(
            response => {
                this.props.close_register()
                this.props.open_login()
                console.log(response);
            },
            err => {
                console.log(err);
            }
        )
    }
    onFinishFailed = (errorInfo)=> {
        console.log('Failed:', errorInfo);
    }
    getCode = ()=> {
        const {phone} = this.state
        console.log(phone);
        axios.get(api.Message, {params: {phone: phone}}).then(
            response => {
                this.makeCountDown()
                console.log(response);
            },
            err => {
                console.log(err);
            }
        )
    }
    upload = info => {
        console.log(info);
        this.setState({
            loading: true
        })
        var cos = new COS({
            SecretId: '',
            SecretKey: '' 
        })

    
        var that = this
        cos.putObject({
            Bucket: "test-1308585220",
            Region: "ap-shanghai",
            Key: info.file.uid+".jpg",
            StorageClass: 'STANDARD', // 上传模式, 标准模式
            Body: info.file
        },function(err,data) {
            const userInfo = that.state.userInfo
            userInfo.avatar = "http://"+data.Location
            that.setState({
                userInfo: userInfo,
                loading:false,
            })
        })
    }

    deleteImg =()=> {
        const userInfo = this.state.userInfo
        userInfo.avatar = null
        this.setState({
            userInfo: userInfo
        })
    }

    open_login = ()=> {
        this.props.close_register()
        this.props.open_login()
    }

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
