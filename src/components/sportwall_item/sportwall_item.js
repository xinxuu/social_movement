import React, { Component } from 'react'
import './sportwall_item.css'

import {CloseCircleFilled} from '@ant-design/icons'
import NewsDetail from "../newsDetail/newsDetail"
import axios from 'axios'

import API from '../../config/api'
import { Button } from 'antd'
import api from '../../config/api'

export default class Item extends Component {
    state = {
        visible: false,
        delete_visible: false,
    }
    render() {
        const {news,delete_visible,} = this.props;
        return (
            <div className='sportwall_item'>
                {/* <div className='delete' onClick={this.deleteImg}>
                    <CloseCircleFilled style={{fontSize: '20px',color:'red',}}/>
                </div> */}
                <div className='item'>
                    
                    <img src={news.cover} className="cover" onClick={this.showDetail}/>
                    <div className='bottom'>
                        <img src={news.user.avatar} className='avatar'/>
                        <text className='name'>{news.user.nickname}</text>
                    </div>
                    
                    {this.state.visible  && (
                        <>
                            <NewsDetail visible={this.state.visible} closeDetail={this.closeDetail} newsID={news.id}/>
                        </>
                    )}
                    {delete_visible === 1? <div className='delete'>
                        <Button type='text' danger onClick={()=>this.delete_news(news.id)}>删除</Button>
                    </div>: <div></div>}
                    
                </div>
            </div>
        )
    }

    showDetail = ()=> {
        const {id} = this.props.news
        console.log(id);
        axios.get(API.NewsViewer,{params: {id: id}}).then (
        response => {
            this.setState({
            visible: true
            })
        }
        ) 
    }
    closeDetail = ()=> {
        this.setState({
            visible: false
        })
    }

    delete_news =(id) => {
        console.log(id);
        
        
        axios.get(api.News,{params: {delete_id: id}}).then(
            response => {
                console.log(response)
                this.props.pop_news(id)
            }
        )
    }
}
