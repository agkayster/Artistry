/* global api, describe, it, expect, beforeEach, afterEach */
const Artist = require('../../models/Artist')
const User = require('../../models/User')

let artistData = require('../../db/data/artistData')
const userData = require('../../db/data/userData')

const jwt = require('jsonwebtoken')
const { secret } = require('../../config/environment')
const testData = {
  name: 'Jeffs plot',
  image: 'hvkgiyg',
  stageName: 'Brackash',
  nationality: 'Nigerian',
  dateOfBirth: '12-01-2020',
  genre: ['HipHop'],
  occupation: ['Singer'],
  instruments: ['Vocals'],
  yearsActive: '2011-present',
  labels: ['Sony'],
  costPerShow: '3000',
  associatedActs: ['sick', 'one', 'mate'],
  comments: [
    { content: 'Olamide is Dope', rating: 4 },
    { content: 'E too dey form big boy', rating: 3 }
  ]
}

describe('PUT /artists/:id', () => {
  let artist = null
  let token = null

  beforeEach(done => {
    User.create(userData)
      .then(users => {
        return artistData.map(artist => {
          artist.user = users[0]._id
          return artist
        })
      })
      .then(artistData => Artist.create(artistData))
      .then(artists => {
        artist = artists[0]
        token = jwt.sign({ sub: artist.user._id }, secret, { expiresIn: '6h' })
        done()
      })
  })

  // beforeEach(done => {
  //   User.create(userData)
  //     .then(users => {
  //       artistData = artistData.map(artist => {
  //         artist.user = users[0]
  //         return artist
  //       })
  //       return Artist.create(artistData)
  //     })
  //     .then(artists => {
  //       artist = artists[0]
  //       token = jwt.sign({ sub: artist.user._id }, secret, { expiresIn: '6h' })
  //       done()
  //     })
  // })

  afterEach(done => {
    Artist.remove({})
      .then(() => User.remove({}))
      .then(() => done())
  })

  it('should return a 401 response without a token', done => {
    api
      .put(`/api/artists/${artist._id}`)
      .send(testData)
      .end((err, res) => {
        expect(res.status).to.eq(401)
        done()
      })
  })

  it('should return a 200 response with a token', done => {
    api
      .put(`/api/artists/${artist._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(testData)
      .end((err, res) => {
        expect(res.status).to.eq(200)
        done()
      })
  })

  it('should return an object', done => {
    api
      .put(`/api/artists/${artist._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(testData)
      .end((err, res) => {
        expect(res.body).to.be.an('object')
        done()
      })
  })

  it('should return the correct fields', done => {
    api
      .put(`/api/artists/${artist._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(testData)
      .end((err, res) => {
        expect(res.body).to.contains.keys([
          '_id',
          'name',
          'image',
          'stageName',
          'nationality',
          'dateOfBirth',
          'genre',
          'occupation',
          'instruments',
          'yearsActive',
          'labels',
          'costPerShow',
          'associatedActs'
        ])
        done()
      })
  })

  it('should return the correct data', done => {
    api
      .put(`/api/artists/${artist._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(testData)
      .end((err, res) => {
        expect(res.body._id).to.be.a('string')
        expect(res.body.name).to.be.a('string')
        expect(res.body.image).to.be.a('string')
        expect(res.body.stageName).to.be.a('string')
        expect(res.body.nationality).to.be.a('string')
        expect(res.body.dateOfBirth).to.be.a('string')
        expect(res.body.genre).to.be.an('array')
        expect(res.body.occupation).to.be.an('array')
        expect(res.body.instruments).to.be.an('array')
        expect(res.body.yearsActive).to.be.a('string')
        expect(res.body.labels).to.be.an('array')
        expect(res.body.costPerShow).to.be.a('string')
        expect(res.body.associatedActs).to.be.an('array')
        done()
      })
  })
})
