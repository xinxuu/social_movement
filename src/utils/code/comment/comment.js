import React from "react";

import CommentItem from "../commentItem/commentItem";

import './comment.css'


function Comments({comments}) {
  return (
    <div className="comments">
      {comments.map((item)=> {
        return <CommentItem comment={item}/>
      })}
    </div>
  )
}

export default Comments;