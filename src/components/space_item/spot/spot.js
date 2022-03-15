import React, { Component } from 'react'
import store from '../../../store/index'
import axios from 'axios'
import API from '../../../config/api'
import './spot.css'

import Spot_item from '../spot_item/spot_item'

export default class spot extends Component {
    state = {
        user: {},
        userspoted: [],
    }
    componentWillMount() {
        const user = store.getState()
        console.log(user);
        this.setState({user:user.user})

        axios.get(API.Concern, {params: {user_id: user.user.id}}).then(
            response => {
                console.log(response);
                var arr=[]
                for(var i=0;i<response.data.length;i++) {
                    arr.push(response.data[i])
                }
                this.setState({
                    userspoted: arr
                })
            }
        )
    }
    render() {
        const {userspoted,user} = this.state
        return (
            <div className='spot'>
                {
                    userspoted.map((item)=> {
                        return <Spot_item user_spotted={item} user={user} key={item.user_spotted_id}/>
                    })
                }
            </div>
        )
    }
}
