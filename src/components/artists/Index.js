import React from 'react'
import axios from 'axios'
import _ from 'lodash'

import { Link } from 'react-router-dom'
import StarRatingComponent from 'react-star-rating-component'

class ArtistsIndex extends React.Component {

  constructor() {
    super()
    this.state = {
      searchTerm: '',
      sortTerm: 'name|asc',
      artists: []

    }

    this.filterArtists = this.filterArtists.bind(this)
    this.handleKeyUp = this.handleKeyUp.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    axios.get('/api/artists')
      .then(res => this.setState({ artists: res.data }))
  }

  handleKeyUp(e) {
    this.setState({ searchTerm: e.target.value })
  }

  handleChange(e) {
    this.setState({ sortTerm: e.target.value })
  }

  filterArtists() {
    const re = new RegExp(this.state.searchTerm, 'i')
    const [field, order] = this.state.sortTerm.split('|')

    const filterArtists = _.filter(this.state.artists, artist => {
      return re.test(artist.stageName) || re.test(artist.name) || re.test(artist.nationality)
    })
    const sortedArtists = _.orderBy(filterArtists, [field], [order])

    return sortedArtists
  }

  render() {
    return (
      <section className="section index-background">
        <div className="container">
          <div className="box tableBorder">
            <h3 className="subtitle is-size-3">Learn more about your favourite artists</h3>

            <div className="columns">
              <div className="column is-half">
                <div className="field control has-icons-left">
                  <span className="icon is-left">
                    <i className="fas fa-search"></i>
                  </span>
                  <input className="input is-half" placeholder="search" onKeyUp={this.handleKeyUp} />
                </div>
              </div>

              <div className="column is-half">
                <div className="field">
                  <div className="select is-fullwidth">
                    <select onChange={this.handleChange}>
                      <option value="stageName|asc">Name A-Z</option>
                      <option value="stageName|desc">Name Z-A</option>
                      <option value="averageRating|asc">Rated Lo-Hi</option>
                      <option value="averageRating|desc">Rated Hi-Lo</option>
                      <option value="costPerShow|asc">Cost Lo-Hi</option>
                      <option value="costPerShow|desc">Cost Hi-Lo</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="columns is-multiline">

            {!this.state.artists && <h2 className="title is-2">Loading...</h2>}

            {this.filterArtists().map(artist =>
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
                    <div>
                      <StarRatingComponent
                        name="rate2"
                        editing={false}
                        renderStarIcon={() => <span><i className="fas fa-headphones"></i></span>}
                        starCount={5}
                        starColor={'rgb(255,140,0)'}
                        emptyStarColor={'rgb(192,192,192)'}
                        value={artist.averageRating}
                      />
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
