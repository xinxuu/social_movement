import React from 'react'

import favor from '../../../utils/img/favor.png'
import favored from '../../../utils/img/favored.png'
import comment_sideBar from '../../../utils/img/comment_sideBar.png'
import collect_sideBar from '../../../utils/img/collect_sideBar.png'

import './sideBar.css'


function SideBar(props) {
  return (
    <div className='sideBar'>
      <span>
        <img src={favor} />
      </span>
      <span>
        <a href='#comment'><img src={comment_sideBar} /></a>
      </span>
      <span>
        <img src={collect_sideBar} />
      </span>
    </div>
  )
}

export default SideBar;