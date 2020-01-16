import React from 'react'
import axios from 'axios'

import { Link } from 'react-router-dom'

class ArtistsIndex extends React.Component {

  constructor() {
    super()
    this.state = {artists: []}
  }

  componentDidMount() {
    axios.get('/api/artists')
      .then(res => this.setState({ artists: res.data }))
  }

  render() {
    return (
      <section className="section">
        <div className="container">
          <div className="columns is-multiline">

            {!this.state.artists && <h2 className="title is-2">Loading...</h2>}

            {this.state.artists && this.state.artists.map(artist =>
              <div className="column is-one-quarter-desktop" key={artist._id}>
                <Link to={`/artists/${artist._id}`}>
                  <div className="card">
                    <div className="card-header">
                      <h2 className="card-header-title">{artist.stageName}</h2>
                    </div>
                    <div className="card-image">
                      <figure className="image">
                        <img src={artist.image} alt={artist.name} />
                      </figure>
                    </div>
                  </div>
                </Link>
              </div>
            )}

          </div>
        </div>
      </section>
    )
  }
}

export default ArtistsIndex
