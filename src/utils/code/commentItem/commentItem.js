import React, {useState} from "react";

import { Input, Button } from "antd";

import favor from '../../img/favor.png'
import favored from '../../img/favored.png'
import commentPic from '../../img/comment.png'

import './commentItem.css'


function CommentItem({comment}) {

  const [isShowComment,setIsShowComment] = useState(false);

  const [reply,setReply] = useState({
    content: '',
    replyId: null,
    root_ID: null,
    depth:1,
  })

  const {TextArea} = Input;
  return (
    <div className="commentItem">
      <img src={comment.avatar} />
      <div className="main">
        <div className="self">
          <div className="top">
            <div>
              <span>{comment.name}</span>
              {comment.reply_user_name && 
                <span>回复  {comment.reply_user_name}</span>
              }
            </div>
            <span>{comment.date}</span>
          </div>
          <p>{comment.content}</p>
          <div className="bottom">
            <img src={favor} /> 
            {comment.favor_count?<span>{comment.favor_count}</span>
            :<span>点赞</span>}
            <img src={commentPic} onClick={()=>{setIsShowComment(!isShowComment)}}/>
            {comment.comment_count?<span>{comment.comment_count}</span>
            :<span >回复</span>}
            
          </div>
        </div>
        {
          isShowComment && 
          <div className="addComment">
            <TextArea onChange={(e) => {setReply({...reply,content: e.target.value})} } value={reply.content} />
            <div className="c-bottom">
              {
                reply.content.length?<Button type="primary" >发布</Button>:
                                      <Button type="primary" disabled>发布</Button>
              }
              
            </div>
          </div>
        }
        <div className="child">
          {comment.children && comment.children.map((item)=> {
            return <CommentItem comment={item} />
          })}
        </div>
      </div>
    </div>
  )
}

export default CommentItem;