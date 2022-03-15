import React,{useState} from 'react'

import { Avatar, Button, Input } from 'antd'

import SideBar from './sideBar/sideBar'
import Comment from '../../utils/code/comment/comment.js'

import avatar from '../../utils/img/avatar.jpg'
import land from '../../utils/img/land.jpg'
import favor1 from '../../utils/img/favor1.png'
import sponsor from '../../utils/img/sponsor.png'

import './eventDetail.css'


function EventDetail({eventID}) {
  const [detail,setDetail] = useState(
    { 
      id: 1,
      name: 'XIN',
      date: '2022/3/11',
      header: '东钱湖骑车',
      content:`  环湖骑行
  地点：xxx`,
      watches: 10,
      favors: 6,
      totalFavors: 99,
      totalSponsor: 6,
      comments: 4,
      registered: 9,
      deadLine: '2022/3/13 12:00',
    },
  )
  const [comments,setComments] = useState([{
    commentID: 1,
    avatar: land,
    name: 'uu',
    content: '内容20200304',
    favor_count: 831,
    comment_count: 9,
    date: '一天前',
    children: [{
      commentID: 2,
      avatar: avatar,
      name: 'xin',
      content: '20200304',
      favor_count: 831,
      comment_count: 9,
      date: '一天前',
      children: null,
      root_ID: 1,
      reply_ID: 1,
      reply_user_name: 'uu',
      depth:2
    }],
    root_ID: 1,
    reply_ID: null,
    reply_user_name: null,
    depth:1
  }])
  const {TextArea} = Input;
  return (
      <div className='eventDetail'>
        <div className='middle'>
          <div className='event'>
            <h1><b>{detail.header}</b></h1> 
            <div className='people'>
              {/* <div className='left'>
                <img src={avatar} />
                <div className='l-right'>
                  {detail.name}
                  <div className='l-r-bottom'>
                    <span>{detail.date}</span>
                    <span>阅读 {detail.watches}</span>
                  </div>
                </div>
              </div> */}
              <div className='info'>
                <img src={avatar}></img>
                <div className='l-right'>
                  {detail.name}
                  <div className='l-r-bottom'>
                    <span>{detail.date}</span>
                    <span>阅读 {detail.watches}</span>
                  </div>
                </div>
              </div>
              
              <Button>+ 关注</Button>
              {/* 判断帖子是否为当前用户以及是否已关注 */}
              {/* {detail.user.id === user.id?<div></div>:
                userspoted.indexOf(newsDetail.user.id)===0?
                <Button type='primary' onClick={()=>this.change_concern('delete')}>已关注</Button>:
                <Button onClick={()=> {this.change_concern('add')}}>关注</Button>} */}
            </div>
            <div className='content'>
              <p>{detail.content}</p>
            </div>
            <div className='bottom'> 
              <div className='deadLine'>
                <span>截止时间:{detail.deadLine}</span>
              </div>
              <div className='register'>
                <span className='span'>已有{detail.registered}人参与</span>
                <Button>报名</Button>
              </div>
            </div>
          </div>
          <div className='comment' id='comment'>
            <h2><b>评论</b></h2>
            <div className='publish'>
              <img src={avatar} />
              <TextArea />
            </div>
          </div>
          <div className='showComments'>
            <Comment comments={comments} />
          </div>
        </div>
        <div className='left'>
          <SideBar />
        </div>
        <div className='right'>
          <div className='user'>
            <div className='person'>
              <img src={avatar} />
              <div className='name'>
                <h5>{detail.name}</h5>
                <span>户外达人</span>
              </div>
            </div>
            <div className='honor'>
                <ul>
                  <li>
                    <img src={favor1} />
                    <span>获得点赞 <b>{detail.totalFavors}</b></span>
                  </li>
                  <li>
                    <img src={sponsor} />
                    <span>发起活动 <b>{detail.totalSponsor}</b></span>
                  </li>
                </ul>
            </div>
          </div>
        </div>
      </div>
  )
  function scrollToComment() {

  }
}

export default EventDetail;