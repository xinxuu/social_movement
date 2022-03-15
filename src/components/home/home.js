import React, { Component ,useState,useEffect} from 'react'

import { Button, Cascader } from 'antd';
import './home.css'

import Events from './events/events';
import Release from '../../utils/code/release/release';

function Home() {
  const [events,setEvents] = useState([
      {
        id: 1,
        name: 'xin',
        date: '2022/2/10',
        header: '东钱湖骑车',
        content: `环湖骑行
        地点：xxx`,
        watches: 10,
        favors: 6,
        comments: 4,
      },
      {
        name: 'xin',
        date: '2022/2/10',
        header: '东钱湖骑车',
        content: `环湖骑行
        地点：xxx`,
        watches: 10,
        favors: 6,
        comments: 4,
      },
      {
        name: 'xin',
        date: '2022/2/10',
        header: '东钱湖骑车',
        content: `环湖骑行
        地点：xxx`,
        watches: 10,
        favors: 6,
        comments: 4,
      },
      {
        name: 'xin',
        date: '2022/2/10',
        header: '东钱湖骑车',
        content: `环湖骑行
        地点：xxx`,
        watches: 10,
        favors: 6,
        comments: 4,
      },
  ]);
  const [options,setOptions] = useState([
    {
      value: '浙江',
      label: '浙江',
      children: [
        {
          value: '杭州',
          label: '杭州',
        },
        {
          value: '宁波',
          label: '宁波',
        },
      ]
    },
    {
      value: '江苏',
      label: '江苏',
      children: [
        {
          value: '南京',
          label: '南京',
        },
      ],
    },
  ]);
  const [type,setType] = useState(['篮球','足球','骑行','爬山','羽毛球']);
  const [curTypeIndex,setcurTypeIndex] = useState(0);
  const [isNewest,setisNewest] = useState(1);
  const [isShowModal,setIsShowModal] = useState(false);
  return (
      <div className='home'>
          <div className='classify'>
            <ul>
              {
                type.map((item,index) => {
                  return <li className={index==curTypeIndex?'selected':'select'} onClick={()=>setcurTypeIndex(index)}>{item}</li>
                })
              }
            </ul>
            <Cascader 
              options={options}
              onChange={onChange}
              placeholder="Please select"
              showSearch={{ filter }}
              onSearch={value => console.log(value)}
            />
          </div>
          <div className='container'>
            <div className='middle'>
              <Events eventsList={events} isNewest={isNewest} setisNewest={setisNewest}/>
            </div>
            <div className='left'>
              
            </div>
            <div className='right'>
              <Button type='primary' onClick={()=>setIsShowModal(!isShowModal)}>发起活动</Button>
            </div>
          </div>
          <Release isShowModal={isShowModal} setIsShowModal={setIsShowModal} title="活动详情"/>
      </div>
  )
  function onChange(value, selectedOptions) {
    console.log(value, selectedOptions);
  }
  
  function filter(inputValue, path) {
    return path.some(option => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);
  }
}

export default Home;    