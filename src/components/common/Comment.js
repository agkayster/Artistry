import React from 'react'
import Auth from '../../lib/Auth'

const Comment = ({ user, createdAt, rating, content, _id, handleDeleteComment }) => {
  return (
    <article className="media">
      <div className="media-content">
        <div className="content" >
          <p>
            <strong className="commentUser">User: {user.username}</strong>
            {' '}
            <br />
            <small>{(new Date(createdAt)).toLocaleDateString()}</small>
            <br />
            Comment: {content}
            <br />
            Rating: {rating}
          </p>
        </div>
      </div>
      {Auth.isAuthenticated() && <div className="media-right">
        <button className="delete" id={_id} onClick={handleDeleteComment}></button>
      </div>}
    </article>
  )
}
export default Comment
