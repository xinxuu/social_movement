import React from "react";
import {NavLink ,Link } from 'react-router-dom';
import './eventItem.css'

import watches from '../../../utils/img/watch.png'
import favor from '../../../utils/img/favor.png'
import favored from '../../../utils/img/favored.png'
import comment from '../../../utils/img/comment_event.png'

function eventItem({item}) {
  console.log(item);
  return (
      
    <div className="eventItem">
      <Link to={`/eventDetail/${item.id}`}>
        <div className="eHeader">
            <span>{item.name}</span>
            <span>{item.date}</span>
        </div>
        <h3><b>{item.header}</b></h3>
        <p>{item.content}</p>
        <div className="bottom">
            <div className="watches">
                <img src={watches} />   
                <text>{item.watches}</text>
            </div>
            <div className="favors">
                <img src={favor} />
                <text>{item.favors}</text>    
            </div>
            <div className="comments">
                <img src={comment} />
                <text>{item.comments}</text>    
            </div>
        </div>
      </Link>
    </div>
      
  )
}

export default eventItem;