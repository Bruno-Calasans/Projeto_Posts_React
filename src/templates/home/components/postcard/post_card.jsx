
import {Component} from 'react'
import './post_card.css'

export class Post extends Component{

    render(){

        let {postID, title:postTitle, body} = this.props.post
        let {thumbnailUrl, title:photoTitle} = this.props.photo

        return (
            <>
                <div className='post' id={postID}>
                    <img src={thumbnailUrl} alt={photoTitle}>
                    </img>
                    <h1 className='postTitle'>{postTitle}</h1>
                    <p className='postBody'>{body}</p>
                </div>
            </>
        )
    }
}

