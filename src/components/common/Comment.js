import React from 'react'
import Auth from '../../lib/Auth'
import StarRatingComponent from 'react-star-rating-component'

const Comment = ({ user, createdAt, rating, content, _id, handleDeleteComment }) => {
  return (

    <article className="media">
      <div className="media-content">
        <div className="content" >
          <span>
            <strong className="commentUser">User: {user.username}</strong>
            {' '}
            <br />
            <small>{(new Date(createdAt)).toLocaleDateString()}</small>
            <br />
            Comment: {content}
            <br />
            <div>
              <StarRatingComponent
                name="rating"
                editing={false}
                renderStarIcon={() => <span><i className="fas fa-headphones"></i></span>}
                starColor={'rgb(255,140,0)'}
                emptyStarColor={'rgb(192,192,192)'}
                starCount={5}
                value={rating}
              />
            </div>
          </span>
        </div>
      </div>
      {Auth.isCurrentUser(user) && <div className="media-right">
        <button className="delete" id={_id} onClick={handleDeleteComment}></button>
      </div>}
    </article>
  )
}
export default Comment
