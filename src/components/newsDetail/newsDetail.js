import React, {createElement} from 'react';
import { Comment, Avatar, Form, Button, List, Input, Tooltip, Modal, Carousel, Divider, Space} from 'antd';
import moment from 'moment';

import './newsDetail.css'

import Commentlist from './commentlist';
import { Children } from 'react/cjs/react.production.min';
import axios from 'axios';
import store from '../../store/index'

import API from '../../config/api'
import like from '../../utils/img/like.png'
import liked from '../../utils/img/liked.png'
import comment from '../../utils/img/comment.png'

const { TextArea } = Input;

// const CommentList = ({ comments } ) => (
//   <List
//     dataSource={comments}
//     header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
//     itemLayout="horizontal"
//     // renderItem={props => <Comment {...props} />}
//     renderItem={props => <Comment author={props.author}
//                                   avatar={<Avatar src={props.avatar} alt="Han Solo" />}
//                                   content={props.content}
//                                   datetime= {props.datetime}
//                                   actions= {[
//                                               <Tooltip key="comment-basic-like" title="Like">
//                                                 <span onClick={like(props.index)}>
//                                                   {createElement(props.action === 'liked' ? LikeFilled : LikeOutlined)}
//                                                   <span className="comment-action">{props.likes}</span>
//                                                 </span>
//                                               </Tooltip>,
//                                               <Tooltip key="comment-basic-dislike" title="Dislike">
//                                                 <span onClick={dislike(props.index)}>
//                                                   {React.createElement(props.action === 'disliked' ? DislikeFilled : DislikeOutlined)}
//                                                   <span className="comment-action">{props.dislikes}</span>
//                                                 </span>
//                                               </Tooltip>,
//                                               <span key="comment-basic-reply-to">Reply to</span>,
//                                           ]}
//                                 />}
//   />
// );

const Editor = ({ onChange, onSubmit, submitting, value}) => (
    <>
        <Form.Item>
            <TextArea rows={4} onChange={onChange} value={value} />
        </Form.Item>
        <Form.Item>
            <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
                Add Comment
            </Button>
        {/* <view class="reply" wx:if="{{reply.cid}}">回复 {{reply.nickname}}
            <icon type="clear" size="15" bindtap="onClickClearReply"></icon>
        </view> */}
        </Form.Item>
    </>
);

class newsDetail extends React.Component {
    state = {
        comments: [],
        userspoted: [],
        newsDetail: {},
        user: {},
        submitting: false,
        reply: {
            rid: null,
            cid: null,
            content: "",
            depth: 1,
        },
        value: '',
        showComment: false,
        newsliked: false,
    };
 
    handleSubmit = () => {
        const {reply,comments} = this.state;
        if (!reply.content) {
            return;
        }

        this.setState({
            submitting: true,
        });

        
        setTimeout(() => {

            if(reply.cid === null) {
                this.setState({
                    submitting: false,
                    value: '',
                    comments: [
                        ...this.state.comments,
                        {
                            author: 'Han Solo',
                            avatar: 'https://joeschmoe.io/api/v1/random',
                            content: reply.content,
                            datetime: moment().fromNow(),
                            likes: 0,
                            action: null,
                            index: this.state.comments.length === 0? 0: this.state.comments[this.state.comments.length-1].index+1,
                            children: [],
                            rid: null,
                            cid: null,
                            // new_id:
                        },
                    ],
                });
            }else {
                const rootIndex = reply.index
                const child = comments[rootIndex].children
                child.unshift()
            }
            
        }, 1000);
        this.setState({
            reply: {
                rid: null,
                cid: null,
                content: "",
                depth: 1,
            },
        })
    };

    handleChange = e => {
        
        const {reply} = this.state
        reply.content = e.target.value
        this.setState({
            reply: reply,
        });
    };


    componentWillMount() {
        const user = store.getState()
        console.log(user);
        this.setState({user:user.user})
        const {newsID} = this.props
        axios.get(API.News+newsID+'/').then (
            response => {
                const newsDetail = response.data
                for(var i=0; i<newsDetail.comment.length; i++) {
                    newsDetail.comment[i].action = '';
                    newsDetail.comment[i].index_1 = i+1;
                }
                
                var reg=new RegExp("<br/>","g");
                var stt= newsDetail.content.replace(reg,"\r\n");
                newsDetail.content = stt.replace(/s/g," ")
                console.log(newsDetail.content);
                this.setState({
                    newsDetail: newsDetail
                })
            })
        axios.get(API.Concern, {params: {user_id: user.user.id}}).then(
            response => {
                console.log(response);
                var arr=[]
                for(var i=0;i<response.data.length;i++) {
                    arr.push(parseInt(response.data[i].user_spotted_id))
                }
                this.setState({
                    userspoted: arr
                })
            }
        )
        // const { comments} = this.state;
        // for(var i=0; i<comments.length; i++) {
        //     comments.index = i
        //     // comments.likes=i
        //     // comments.action=null
        // }
    }

    render() {
        const { comments, submitting,value,newsDetail,newsliked,user,userspoted } = this.state;
        const {visible,closeDetail,} = this.props
        console.log(newsDetail.content);
        // for(item in comments) {
        //   const actions = [
        //     <Tooltip key="comment-basic-like" title="Like">
        //       <span onClick={like}>
        //         {createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
        //         <span className="comment-action">{likes}</span>
        //       </span>
        //     </Tooltip>,
        //     <Tooltip key="comment-basic-dislike" title="Dislike">
        //       <span onClick={dislike}>
        //         {React.createElement(action === 'disliked' ? DislikeFilled : DislikeOutlined)}
        //         <span className="comment-action">{dislikes}</span>
        //       </span>
        //     </Tooltip>,
        //     <span key="comment-basic-reply-to">Reply to</span>,
        //   ];
        //   comments.actions = actions
        // }    
    
        return (
            <div className='newsDetail'>
                {/* <Button type="primary" onClick={() => {this.setState({visible: true})}}>
                    Open Modal of 1000px width
                </Button> */}
                <Modal
                    title=""
                    centered
                    visible={visible}
                    onOk={() => {this.setState({visible: false})}}
                    onCancel={() => {closeDetail()}}
                    footer={null}
                    width={600}
                    mask={true}
                >
                    
                    {newsDetail.user != null && (
                        <div className='modal-content'>
                            <div className='header'>
                                
                                <div className='user'>
                                    <img src={newsDetail.user.avatar} className='avatar'/>
                                    <text>{newsDetail.user.nickname}</text>
                                </div>
                                
                                {newsDetail.user.id === user.id?<div></div>:
                                    userspoted.indexOf(newsDetail.user.id)===0?
                                    <Button type='primary' onClick={()=>this.change_concern('delete')}>已关注</Button>:
                                    <Button onClick={()=> {this.change_concern('add')}}>关注</Button>}
                               
                            </div>

                            <Divider/>
                            <div className='content'>
                                <div>&nbsp;&nbsp;{newsDetail.content}</div>
                            </div>

                            <div>
                                <Carousel autoplay className='Car'>
                                    {
                                        newsDetail.images.map(item => {
                                            return  <div className='C-item'> 
                                                        <img src={item.cos_path} className='C-pic'/>
                                                    </div>  
                                        })
                                    }
                                </Carousel>
                            </div>
                            
                            <div className='bottom'>
                                <h4>浏览次数:{newsDetail.viewer_count}次</h4>
                                <div>
                                    {this.state.newsliked?<img src={liked} className='news_like' onClick={()=>{this.news_like(newsliked)}}/>
                                    :<img src={like} className='news_like' onClick={()=>{this.news_like(newsliked)}}/>}
                                    {newsDetail.favor_count}
                                    
                                    <img src={comment} className='comment'  onClick={this.showComment}/>
                                </div>
                            </div>
                            
                            {this.state.showComment && 
                                <div className='makeComment' >
                                    <Comment
                                        avatar={<Avatar src={user.avatar} />}
                                        content={
                                            <Editor
                                                onChange={this.handleChange}
                                                onSubmit={this.handleSubmit}
                                                submitting={submitting}
                                                value={this.state.reply.content}
                                            />
                                        }
                                    />
                                </div>
                            }
                            <div className='showComments'>
                                <Commentlist comments={newsDetail.comment} like={this.like.bind(this)} reply={this.reply.bind(this)} />
                            </div>
                        </div>
                    )}
                </Modal>
            </div>
            
        );
    }

    news_like = (newsisliked)=> {
        const {newsDetail} = this.state
        const type = newsisliked?'reduce':'add'
        console.log(newsDetail.id,type);
        axios.get(API.NewsLike,{params: {id: newsDetail.id, type: type}}).then(                     
            response => {
                console.log(response);
                newsDetail.favor_count=newsisliked?newsDetail.favor_count-1:newsDetail.favor_count+1
                this.setState({
                    newsliked: !newsisliked,
                    newsDetail: newsDetail
                })
            }
        )
        // this.setState({
        //     newsliked: !newsisliked
        // })
        // if(newsisliked) {
        //     newsDetail.favor_count=newsDetail.favor_count-1
        //     this.setState({
        //         newsDetail:newsDetail
        //     })
        //     //向后端请求
        // }
        // else {
        //     newsDetail.favor_count=newsDetail.favor_count+1
        //     this.setState({
        //         newsDetail:newsDetail
        //     })
        // }
    }
    showComment = ()=> {
        this.setState({showComment: !this.state.showComment})

        // inputRef.current!.focus({
        //     cursor: 'start',
        //   });
        // this.inputRef.current.focus({
        //     cursor: 'start',
        // });
        //获取焦点
    }
    handleChange = (e)=> {
        const {reply} = this.state
        console.log(e);
        reply.content = e.target.value
        this.setState({
            reply: reply            
        })
    }
    handleSubmit = ()=> {
        const {newsDetail,user,reply} = this.state     
        axios.post(API.Comment,{
            news: newsDetail.id,
            content: reply.content,
            user: user.id,
            reply: reply.cid,
            depth: reply.depth,
            root: reply.rid,
        }).then(
            response=> {
                console.log(response);
                var newComment = response.data
                newComment['action'] = ''
                newComment['index_1'] = newsDetail.comment.length+1
                console.log(newComment);
                newsDetail.comment.push(newComment)
                this.setState({
                    newsDetail: newsDetail 
                })
            }
        )
    }
    like = (id,index) => {
        const {newsDetail} = this.state
        const {comment} =this.state.newsDetail
        console.log(index,id);
        const type = comment[index-1].action === 'liked'? 'reduce':'add'
        console.log(index,type,id);
        axios.get(API.CommentLike,{params: {id: id,type: type}}).then(
            response => {
                comment[index-1].action === 'liked'? (comment[index-1].action ='')
                : (comment[index-1].action='liked')
                comment[index-1].action === 'liked'? (comment[index-1].favor_count++)
                : (comment[index-1].favor_count--)
                newsDetail.comment = comment
                this.setState({
                    newsDetail:newsDetail
                })
            }
        )
        
        
        // comment[index].likes = action === "liked"? likes: likes+1
        // comments[index].dislikes = action === "disliked"? dislikes-1: dislikes
        // comments[index].action = "liked"
        // this.setState({
        //     newsDetail:newsDetail
            // ["comments["+ index+"].likes"]: action === "like"? likes: likes+1,
            // ["comments["+ index+"].dislikes"]: action === "dislike"? dislikes-1: dislikes,
            // ["comments["+ index+"].action"]: "likes",
        // })

        //向后端发送点赞增加请求
    }
    reply = (item) => {
        console.log(item);
        const {reply} = this.state
        reply.depth=item.depth+1
        reply.cid=item.id
        reply.rid=item.id
        this.showComment()
    }
    // dislike = (index)=> {
    //     const {likes,dislikes,action} = this.state.comments[index]
    //     const {comments} =this.state
    //     comments[index].dislikes = action === "disliked"? dislikes: dislikes+1
    //     comments[index].likes = action === "liked"? likes-1: likes
    //     comments[index].action = "disliked"
    //     this.setState({
    //         comments: comments
    //         // ["comments["+ index+"].dislikes"]: action === "dislike"? dislikes: dislikes+1,
    //         // ["comments["+ index+"].likes"]: action === "like"? likes-1: likes,
    //         // ["comments["+ index+"].action"]: "dislikes",
    //     })
    // }

    change_concern = (isConcern)=> {
        console.log(isConcern);
        const {user,newsDetail,userspoted} = this.state;                            
        
        axios.post(API.ConcernChange,{
            user_id: user.id,
            user_spotted_id: newsDetail.user.id,
            type: isConcern
        }).then(
            response => {
                console.log(response); 
                var arr = userspoted
                if(response.data.type === 'add') {
                    arr.push(parseInt(response.data.user_spotted_id))

                } else {
                    arr = userspoted.filter((item)=> {
                        return item!=parseInt(response.data.user_spotted_id)
                    })
                }
                this.setState({
                    userspoted: arr
                })
            }
        )
        
    }
}

export default newsDetail