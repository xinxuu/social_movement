import React, { Component } from 'react'
import { Route, NavLink ,Redirect, } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import {Collapse, Menu} from 'antd'
import api from '../../config/api';
import './space.css'

import store from '../../store/index'

import Dynamic from '../space_item/dynamic/dynamic'
import Spot from '../space_item/spot/spot'
import Collect from '../space_item/collect/collect'

class space extends Component {
    state = {
        user: {},
    }
    componentWillMount() {
        const user = store.getState()
        this.setState({
            user: user.user
        })
        
    }
    render() {
        const {user,} =this.state
       
        return (    
            <div className='space'> 
                <div className='left'></div>

                <div className='middle'>
                    <img src="https://hbimg.huabanimg.com/f44202fa7dea0d85988077865c92360a981151253f95e-KtaMai_fw658/format/webp" className='landscape'/>
                    <div className='sheader'>
                        <img src={user.avatar} />
                        <text>{user.nickname}</text>
                    </div>
                    <div className='content'>
                        <Menu mode="horizontal" >
                            
                            <Menu.Item key="dynamic" >
                                <NavLink to={{pathname:"/space/dynamic"}}>我的动态</NavLink>
                            </Menu.Item>
                            <Menu.Item key="spot" >
                                <NavLink to={{pathname:"/space/spot"}} >关注</NavLink>
                            </Menu.Item>
                            <Menu.Item key="collect" >
                                <NavLink to={{pathname:"/space/collect"}} >收藏</NavLink>
                            </Menu.Item>
                        </Menu>
                        <switch>
                            <Route component={()=>{return <Dynamic user={user} />}} path="/space/dynamic" /> 
                            <Route component={()=>{return <Spot />}} path="/space/spot" /> 
                            <Route component={()=>{return <Collect/>}} path="/space/collect" /> 
                            <Route component={()=>{return <Dynamic user={user}/>}} path="/space" exact /> 
                            {/* <Redirect path="/" to="/space/spot" />  */}
                        </switch>
                    </div>
                </div>

                <div className='right'></div>
            </div>
        )
    }

    
}

export default  withRouter(space)
