import React from "react";
import { Breadcrumb } from 'antd';

import './events.css'

import EventItem from "../eventItem/eventItem";

function events({eventsList,isNewest,setisNewest}) {
  
  return (
    <div className="eventsList">
      
      <div className="Eheader">
        <span className={isNewest?'selected':'select'} onClick={()=>setisNewest(!isNewest)}>最新</span>
        |
        <span className={isNewest?'select':'selected'} onClick={()=>setisNewest(!isNewest)}>最热</span>
      </div>
      {
        eventsList.map(item => {
          return <EventItem item={item} />
        })
      }
    </div>
  )
}

export default events