import React, {useState} from 'react'

import {Modal, Form, Upload, Input, Button, Option, Select } from 'antd'
import { PlusOutlined,FormOutlined } from '@ant-design/icons';

import COS, { util } from 'cos-js-sdk-v5'

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

function Release({isShowModal,setIsShowModal,avatar,title}) {

  const [fileList,setFileList] = useState([]);
  const [previewVisible,setPreviewVisible] = useState(false);
  const [previewImage,setPreviewImage] = useState('');
  const [previewTitle,setPreviewTitle] = useState('');
  const [publish,setPublish] = useState({});
  const [topic,setTopic] = useState([
    {
      id:0,
      title: '篮球'
    },
    {
      id:1,
      title: '足球',
    },
    {
      id:2,
      title: '骑车'
    }
  ])

  const {TextArea} = Input;
  const {Option} =Select;
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  )
  return (
    <Modal
      title={previewTitle}
      footer={null}
      onCancel={()=>setIsShowModal(!isShowModal)}
      width={700}
      className='modal'
      visible={isShowModal}
      >
          
      
      <div className='shabi'>
          {/* <img src={avatar}/> */}
          <h1>{title}</h1>
      </div>
      <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 13 }}
          initialValues={{ remember: true }}
          // onFinish={this.onFinish}
          // onFinishFailed={this.onFinishFailed}
          autoComplete="off"
      >
          <Form.Item
            label="header"
            name="header"
            placeholder={'请输入标题'}
          >
            <Input />
          </Form.Item>
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
              onPreview={handlePreview}
              // onRemove={this.handleRemove}
              onChange={handleChange}
              multiple={true}
              customRequest={upload}
            >
              {fileList.length >= 8 ? null : uploadButton}
            </Upload>

            <Modal
              visible={previewVisible}
              title={previewTitle}
              footer={null}
              onCancel={()=>setPreviewVisible(false)}
              >
              <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
          </Form.Item>
          <Form.Item label='type' name='类型'>
              <Select style={{ width: 120 }} onChange={(value) => {setPublish({...publish,topic_id:value})}}>
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
  )

 
  async function handlePreview (file) {
    if (!file.url && !file.preview) {
    file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));

    // this.setState({
    //     previewImage: file.url || file.preview,
    //     previewVisible: true,
    //     previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    // });
  }

  function handleChange (info) {
    const {fileList,file} = info;
    
    if(file.status === "removed") {
        
        var cos = new COS({
            SecretId: '',
            SecretKey: '',
        })

        var that = this;
        cos.deleteObject({
            Bucket: "test-1308585220",
            Region: "ap-shanghai",
            Key: file.key,
        },function(err,data) {
            setFileList(fileList);
        })
    }
  }
    
    function upload(info) {
      var cos = new COS({
          SecretId: '',
          SecretKey: ''
      })

      var that = this;
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
          // fileList.push(newImg);  
          setFileList([...fileList,newImg]);
      })
    }

}

export default Release;