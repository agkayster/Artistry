import React from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import Auth from '../../lib/Auth'
import Comment from '../common/Comment'



class ArtistsShow extends React.Component {
  constructor(){
    super()

    this.state = {
      formData: {rating: 1, content: ''}

    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDelete =  this.handleDelete.bind(this)
    this.handleDeleteComment =  this.handleDeleteComment.bind(this)
  }

  componentDidMount(){
    axios.get(`/api/artists/${this.props.match.params.id}`)
      .then(res => this.setState({artist: res.data}))
  }

  handleChange(e){
    const formData = {...this.state.formData, [e.target.name]: e.target.value}
    this.setState({formData})
  }

  handleSubmit(e){
    e.preventDefault()

    axios.post(`/api/artists/${this.props.match.params.id}/comments`, this.state.formData, {
      headers: {Authorization: `Bearer ${Auth.getToken()}`}
    })
      .then(res => this.setState({artist: res.data, formData: { rating: 1, content: ''} }))
  }


  handleDelete(e){
    console.log(e.target)
    axios.delete(`/api/artists/${this.props.match.params.id}/comments/${e.target.id}`,{
      headers: { Authorization: `Bearer ${Auth.getToken()}`}
    })

      .then(()=> this.props.history.push('/api/artists'))
  }

  handleDeleteComment(e){
    console.log(e.target.id)
    axios.delete(`/api/artists/${this.props.match.params.id}/comments/${e.target.id}`, {
      headers: {Authorization: `Bearer ${Auth.getToken()}`}
    })
      .then(res => this.setState({ artist: res.data }))
  }

  render(){
    console.log(this.state)
    if(!this.state.artist) return null
    return (
      <section className="section">
        <div className="container">


          {!this.state.artist && <h2 className="title is-2">Loading...</h2>}

          {this.state.artist && <div>
            <header>
              <h1 className="title is-2">Name: {this.state.artist.name}</h1>

              <hr />
            </header>


            <div className="card-image">
              <figure className="image">
                <img src={this.state.artist.image} alt={this.state.artist.name} />
              </figure>
            </div>
            <h2 className="subtitle is-4">Stage Name: {this.state.artist.stageName}</h2>
            <h2 className="subtitle is-4">Nationality: {this.state.artist.nationality}</h2>
            <h2 className="subtitle is-4">Date of Birth: {this.state.artist.dateOfBirth}</h2>
            <h2 className="subtitle is-4">Genre: {this.state.artist.genre.join(', ')}</h2>
            <h2 className="subtitle is-4">Occupation: {this.state.artist.occupation.join(', ')}</h2>
            <h2 className="subtitle is-4">Instruments: {this.state.artist.instruments}</h2>
            <h2 className="subtitle is-4">Years Active: {this.state.artist.yearsActive}</h2>
            <h2 className="subtitle is-4">Labels: {this.state.artist.labels.join(', ')}</h2>
            <h2 className="subtitle is-4">Associated Acts: {this.state.artist.associatedActs.join(', ')}</h2>
            {Auth.isCurrentUser(this.state.artist.user) && <div className="buttons">
              <Link
                className="button"
                to={`/artists/${this.state.artist._id}/edit`}
              >Edit</Link>

              <button className="button is-danger">Delete</button>
            </div>}
            <hr />
          </div>}
          <div className="columns">


            <div className="column">

              {this.state.artist.comments.map(comment =>
                <Comment key={comment._id} {...comment} handleDeleteComment={this.handleDeleteComment}/>
              )}


              {Auth.isAuthenticated() && <form onSubmit= {this.handleSubmit}>
                <hr />
                <div className="field">
                  <label  className="label">Comment</label>
                  <textarea
                    name="content"
                    className="textarea"
                    placeholder="Add a comment..."
                    onChange={this.handleChange}
                    value= {this.state.formData.content}
                  />
                </div>
                <div className="field">
                  <label className="label">Rating (1 - 5)</label>
                  <input
                    name="rating"
                    className="input"
                    type="range"
                    min="1"
                    max="5"
                    onChange={this.handleChange}
                    value= {this.state.formData.rating}
                  />
                </div>
                <button className="button is-info">Submit</button>
              </form>}
            </div>
          </div>
        </div>

      </section>
    )
  }
}
export default ArtistsShow
