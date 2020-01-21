import React from 'react'
import axios from 'axios'
import Auth from '../../lib/Auth'

class Edit extends React.Component {

  constructor() {
    super()
    this.state = {
      formData: {},
      errors: {}
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleArrayChange = this.handleArrayChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    axios.get(`/api/artists/${this.props.match.params.id}`)
      .then(res => this.setState({ formData: res.data }))
  }

  handleSubmit(e) {
    e.preventDefault()

    axios.put(`/api/artists/${this.props.match.params.id}`, this.state.formData, {
      headers: { Authorization: `Bearer ${Auth.getToken()}`}
    })
      .then(() => this.props.history.push(`/artists/${this.props.match.params.id}`))
      .catch(err => this.setState({ errors: err.response.data.errors }))
  }

  handleChange(e) {
    const formData = { ...this.state.formData, [e.target.name]: e.target.value }
    this.setState({ formData })
  }

  handleArrayChange(e) {
    const formData = { ...this.state.formData, [e.target.name]: e.target.value.split(',') }
    this.setState({ formData })
  }

  render() {
    return (
      <section className="section">
        <div className="container">

          <form onSubmit={this.handleSubmit}>
            <div className="field">
              <label className="label">Name</label>
              <input
                className="input"
                name="name"
                placeholder="eg: Bruce Wayne"
                value={this.state.formData.name || ''}
                onChange={this.handleChange}
              />
              {this.state.errors.name && <small className="help is-danger">{this.state.errors.name}</small>}
            </div>
            <div className="field">
              <figure className="image">Image</figure>
              <input
                className="input"
                name="image"
                placeholder="eg: https://idonsabi.com/wp-content/uploads/2019/02/IMG_20190203_010332-800x445.jpg"
                value={this.state.formData.image || ''}
                onChange={this.handleChange}
              />
              {this.state.errors.image && <small className="help is-danger">{this.state.errors.image}</small>}
            </div>
            <div className="field">
              <label className="label">Stage Name</label>
              <input
                className="input"
                name="stageName"
                placeholder="eg: Raekwon"
                value={this.state.formData.stageName || ''}
                onChange={this.handleChange}
              />
              {this.state.errors.stageName && <small className="help is-danger">{this.state.errors.stageName}</small>}
            </div>
            <div className="field">
              <label className="label">Nationality</label>
              <input
                className="input"
                name="nationality"
                placeholder="eg: Jamaican"
                value={this.state.formData.nationality || ''}
                onChange={this.handleChange}
              />
              {this.state.errors.nationality && <small className="help is-danger">{this.state.errors.nationality}</small>}
            </div>
            <div className="field">
              <label className="label">Date of Birth</label>
              <input
                className="input"
                name="dateOfBirth"
                placeholder="eg: 16-07-1990 "
                value={this.state.formData.dateOfBirth || ''}
                onChange={this.handleChange}
              />
              {this.state.errors.dateOfBirth && <small className="help is-danger">{this.state.errors.dateOfBirth}</small>}
            </div>
            <div className="field">
              <label className="label">Genre</label>
              <input
                className="input"
                name="genre"
                placeholder="eg: Hip Hop"
                value={this.state.formData.genre || ''}
                onChange={this.handleArrayChange}
              />
              {this.state.errors.genre && <small className="help is-danger">{this.state.errors.genre}</small>}
            </div>
            <div className="field">
              <label className="label">Occupation</label>
              <input
                className="input"
                name="occupation"
                placeholder="eg: Songwriter"
                value={this.state.formData.occupation || ''}
                onChange={this.handleChange}
              />
              {this.state.errors.occupation && <small className="help is-danger">{this.state.errors.occupation}</small>}
            </div>
            <div className="field">
              <label className="label">Instruments</label>
              <input
                className="input"
                name="instruments"
                placeholder="eg: Vocals"
                value={this.state.formData.instruments || ''}
                onChange={this.handleArrayChange}
              />
              {this.state.errors.instruments && <small className="help is-danger">{this.state.errors.instruments}</small>}
            </div>
            <div className="field">
              <label className="label">Years Active</label>
              <input
                className="input"
                name="yearsActive"
                placeholder="eg: 2011-present"
                value={this.state.formData.yearsActive || ''}
                onChange={this.handleChange}
              />
              {this.state.errors.yearsActive && <small className="help is-danger">{this.state.errors.yearsActive}</small>}
            </div>
            <div className="field">
              <label className="label">Labels</label>
              <input
                className="input"
                name="labels"
                placeholder="eg: Sony"
                value={this.state.formData.labels || ''}
                onChange={this.handleArrayChange}
              />
              {this.state.errors.labels && <small className="help is-danger">{this.state.errors.labels}</small>}
            </div>
            <div className="field">
              <label className="label">Cost Per Show</label>
              <input
                className="input"
                type="string"
                name="costPerShow"
                placeholder="N1000"
                value={this.state.formData.costPerShow || ''}
                onChange={this.handleChange}
              />
              {this.state.errors.costPerShow && <small className="help is-danger">{this.state.errors.costPerShow}</small>}
            </div>
            <div className="field">
              <label className="label">Associated Acts</label>
              <input
                className="input"
                name="associatedActs"
                placeholder="eg: Phyno, Banky W"
                value={this.state.formData.associatedActs || ''}
                onChange={this.handleArrayChange}
              />
              {this.state.errors.associatedActs && <small className="help is-danger">{this.state.errors.associatedActs}</small>}
            </div>

            <button className="button">Submit</button>
          </form>

        </div>
      </section>
    )
  }
}

export default Edit
