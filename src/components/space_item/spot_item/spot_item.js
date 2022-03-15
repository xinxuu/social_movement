import { Button } from 'antd'
import React, { Component } from 'react'
import axios from 'axios'
import api from '../../../config/api'
import './spot_item.css'

export default class spot_item extends Component {
    state = {
        isDelete: false
    }
    render() {
        const {user_spotted} = this.props
        const {isDelete} = this.state
        return (
            <div className='spot_item'>
                <div className='user'>
                    <img src={user_spotted.user_spotted__avatar} />
                    <text>{user_spotted.user_spotted__name}</text>
                </div>
                {isDelete === false?
                    <Button type='primary' onClick={()=>this.change_concern('delete')}>已关注</Button>:
                    <Button onClick={()=> {this.change_concern('add')}}>关注</Button>}
            </div>
        )
    }
    change_isDelete = ()=> {
        this.setState({
            isDelete: !this.state.isDelete
        })
    }
    change_concern = (isConcern)=> {
        console.log(isConcern);

        const {user,user_spotted} = this.props
        
        console.log(user);
        console.log(user_spotted);
        axios.post(api.ConcernChange,{
            user_id: user.id,
            user_spotted_id: user_spotted.user_spotted_id,
            type: isConcern
        }).then(
            response => {
                console.log(response); 
                this.setState({
                    isDelete: !this.state.isDelete
                })
                // var arr = userspoted
                // if(response.data.type === 'add') {
                //     arr.push(parseInt(response.data.user_spotted_id))

                // } else {
                //     arr = userspoted.filter((item)=> {
                //         return item!=parseInt(response.data.user_spotted_id)
                //     })
                // }
                // this.setState({
                //     userspoted: arr
                // })
            }
        )
        
    }
}

