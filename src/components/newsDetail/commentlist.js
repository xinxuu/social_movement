import React, { Component,createElement } from 'react'
import { Comment, Avatar, Form, Button, List, Input, Tooltip} from 'antd';
import { DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled } from '@ant-design/icons';
import moment from 'moment';
import { Children } from 'react/cjs/react.production.min';

export default class commentlist extends Component {


    render() {

        const {comments} = this.props
        return (
            <List
                dataSource={comments}
                header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
                itemLayout="horizontal"
                locale={{emptyText:"暂无评论"}}
                // renderItem={props => <Comment {...props} />}
                renderItem={props => <Comment author={props.user__nickname}
                                            avatar={<Avatar src={props.user__avatar} alt="" />}
                                            content={props.content}
                                            datetime= {props.create_date}
                                            actions= {[
                                                        <Tooltip key="comment-basic-like" title="Like">
                                                            <span onClick={() => this.props.like(props.id,props.index_1)}>
                                                            {createElement(props.action === 'liked' ? LikeFilled : LikeOutlined)}
                                                            <span className="comment-action">{props.favor_count}</span>
                                                            </span>
                                                        </Tooltip>,
                                                        // <Tooltip key="comment-basic-dislike" title="Dislike">
                                                        //     <span onClick={() => this.props.dislike(props.index)}>
                                                        //     {React.createElement(props.action === 'disliked' ? DislikeFilled : DislikeOutlined)}
                                                        //     <span className="comment-action">{props.dislikes}</span>
                                                        //     </span>
                                                        // </Tooltip>,
                                                        <span key="comment-basic-reply-to" onClick={()=> this.props.reply(props)}>Reply to</span>,
                                                    ]}
                                            
                                    />}
            />
        )
    }
}
