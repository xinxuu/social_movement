import axios from 'axios';
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { Button } from 'antd';
import Item from '../../sportwall_item/sportwall_item'
import {DeleteOutlined, CloseCircleFilled } from '@ant-design/icons';

import './dynamic.css'
import api from '../../../config/api';

class dynamic extends Component {
    state = {
        delete_visible: false,
        news: []
    }
    componentWillMount() {
        const {user} = this.props
        axios.get(api.News,{params: {user_id: user.id}}).then(
            response => {
                console.log(response);
                this.setState({
                    news:response.data
                })
            }
        )
    }

  

    render() {
        const {delete_visible,news} = this.state
        
        return (
            <div className='dynamic'>

                <div className='button'>
                    <Button type="primary" shape="round" icon={<DeleteOutlined /> }  size='middle' className='deleteButton' onClick={this.change_visible}>
                        删除你的动态
                    </Button>
                </div>        
                <div className='wall'>
                    {/* <div className='delete' onClick={this.deleteImg}>
                        <CloseCircleFilled style={{fontSize: '20px',color:'red'}}/>
                    </div> */}
                    {
                        news.map( item =>{
                            return <Item news={item} className='item' key={item.id} className='item' delete_visible={delete_visible===true?1:null} pop_news={this.pop_news.bind(this)}/>
                        })
                    }
                </div>        
               
            </div>
        )
    }

    change_visible =()=> {
        console.log('1');
        this.setState({
            delete_visible: !this.state.delete_visible
        })
    }

    pop_news =(id)=> {

        console.log(id);
        const {news} = this.state
        const nnews = news.filter((item)=> {
            return item.id!=id
        })
        console.log(nnews);
        this.setState({
            news:nnews
        })
    }    
}

export default withRouter(dynamic)
