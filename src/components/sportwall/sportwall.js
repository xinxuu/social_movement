import React, { Component } from 'react'
import Item from '../sportwall_item/sportwall_item'
import { Breadcrumb, Modal, Upload,Form,Input,Button,Select } from 'antd';
import { PlusOutlined,FormOutlined } from '@ant-design/icons';
import axios from 'axios'
import COS, { util } from 'cos-js-sdk-v5'

import './sportwall.css'
import API from '../../config/api'

const {Option} =Select

function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

export default class sportwall extends Component {
    state = {
        news: [],
        visible: false,
        topic:[],
        select_topic_id: 1,
        publish: {
            topic_id: '3'
        },
        previewVisible: false,
        previewImage: '',
        previewTitle: '',
        fileList: [],
    }

    componentDidMount() {
        axios.get(API.News).then(
            response => {
                this.setState({
                    news: response.data
                })
            },
            err => {

            }
        )
        axios.get(API.Topic).then(
            response => {
                this.setState({
                    topic: response.data
                })
            }
        )
    }

    render() {
        const {news,visible} = this.state
        const { previewVisible, previewImage, fileList, previewTitle, topic, select_topic_id } = this.state;
        const {user} = this.props
        const {TextArea} = Input;
        const uploadButton = (
            <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
            </div>
        )
        return (
            <div className='sportwall'>
                <div className='sportwall_header'> 
                    <div className='classify'>
                        {
                            topic.map(item => {
                                return <div className={select_topic_id===item.id?'classify_item_selected':'classify_item'} onClick={()=>this.choose_news(item.id)}>{item.title}</div>
                            })
                        }
                    </div>
                </div>
                <div className='button'>
                    <Button type="primary" shape="round" icon={<FormOutlined /> } onClick={()=>this.setState({visible: true})} size='middle' className='publishButton'>
                        发表你的动态
                    </Button>
                </div>
                
                <Modal
                    visible={visible}
                    title={previewTitle}
                    footer={null}
                    onCancel={this.handlePublish}
                    width={700}
                    className='modal'
                    >
                        
                    
                    <div className='shabi'>
                        <img src={user.avatar}/>
                        <h1>分享你的运动生活</h1>
                    </div>
                    <Form
                        name="basic"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 13 }}
                        initialValues={{ remember: true }}
                        onFinish={this.onFinish}
                        onFinishFailed={this.onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="content"
                            name="content"
                            placeholder={'请输入内容'}
                        >
                            <TextArea/>
                        </Form.Item>

                        <Form.Item
                            label="Img"
                            name="Img"
                        >
                           
                            <Upload
                                action="#"
                                listType="picture-card"
                                fileList={fileList}
                                onPreview={this.handlePreview}
                                // onRemove={this.handleRemove}
                                onChange={this.handleChange}
                                multiple={true}
                                customRequest={this.upload}
                            >
                                {fileList.length >= 8 ? null : uploadButton}
                            </Upload>

                            <Modal
                                visible={previewVisible}
                                title={previewTitle}
                                footer={null}
                                onCancel={this.handleCancel}
                                >
                                <img alt="example" style={{ width: '100%' }} src={previewImage} />
                            </Modal>
                        </Form.Item>
                        <Form.Item label='type' name='类型'>
                            <Select style={{ width: 120 }} onChange={this.changeType}>
                                {topic.map(item => {
                                    if(item.id!=1) return <Option value={item.id}>{item.title}</Option>
                                })}
                            </Select>
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button type="primary" htmlType="submit">
                            发表
                            </Button>
                        </Form.Item>
                    </Form>
                    
                </Modal>

                
                
                <div className='swall'>
                    {
                        news.map( item =>{
                            return <Item news={item} className='item' key={item.id}/>
                        })
                    }
                </div>
                
            </div>
        )
    }

    handlePublish = ()=> {
        this.setState({visible: false})
    }

    handleCancel = () => this.setState({ previewVisible: false });

    handlePreview = async file => {
        if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
        }

        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
            previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
        });
    };

    handleChange = (info) => {
        const {fileList,file} = info
        
        if(file.status === "removed") {
            
            var cos = new COS({
                SecretId: '',
                SecretKey: '',
            })
    
            var that = this
            cos.deleteObject({
                Bucket: "test-1308585220",
                Region: "ap-shanghai",
                Key: file.key,
            },function(err,data) {
                console.log(data);
                that.setState({
                    fileList: fileList
                })
            })
        } 
    }


    handleRemove = (info) => {
        console.log(info);
    }

    upload =(info)=> {
        const {fileList} = this.state
        console.log(info.file);
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
            const newImg = {
                uid: fileList.length+1,
                index: fileList.length+1,
                key: info.file.uid+".jpg",
                url: "http://"+data.Location
            }
            fileList.push(newImg)   
            that.setState({
                fileList: fileList
            })
            console.log(data);
            // const userInfo = that.state.userInfo
            // userInfo.avatar = "http://"+data.Location
            // that.setState({
            //     userInfo: userInfo,
            //     loading:false,
            // })
        })
    }

    onFinish= (value)=>{
        let {content} = value;
        console.log(content);
        content = content.replace(/\n/g,"<br/>").replace(/\s/g,"\s");
        const {fileList,publish,news} = this.state
        const {user} = this.props
        const img = {
            key: '',
            cos_path: ''
        }
        const imageList = [];
        for(var i=0;i<fileList.length;i++) {
            img.key=fileList[i].key
            img.cos_path=fileList[i].url
            imageList.push(img)
        }
        axios.post(API.NewsCreate,{
            cover: fileList[0].url,
            content: content,
            topic: publish.topic_id,
            user: user.id,
            imageList: imageList,
        }).then(
            response=> {
                console.log(response);
                const createNews = response.data
                createNews.user = user
                news.unshift(createNews)
                this.setState({
                    visible: false,
                    news: news
                })
            }
        )
    }

    changeType = (value)=> {
        const {publish} = this.state
        publish.topic_id=value
        this.setState({
            publish: publish
        })
    }

    choose_news = (id) => {
        console.log(id);
        axios.get(API.News,{params:{topic_id: id}}).then(
            response => {
                console.log(response);
                this.setState({
                    news: response.data,
                    select_topic_id: id
                })
            },
            err => {

            }
        )
    }
}
