/* global api, describe, it, expect, beforeEach, afterEach */
const Artist = require('../../models/Artist')
const artistData = require('../../db/data/artistData')

describe('GET /artists/:id', () => {
  let artist = null

  beforeEach(done => {
    Artist.create(artistData).then(artists => {
      artist = artists[0]
      done()
    })
  })

  afterEach(done => {
    Artist.remove({})
      .then(() => done())
  })

  it('should return a 200 response with a token', done => {
    api.get(`/api/artists/${artist._id}`).end((err, res) => {
      expect(res.status).to.eq(200)
      done()
    })
  })

  it('should return an object', done => {
    api.get(`/api/artists/${artist._id}`).end((err, res) => {
      expect(res.body).to.be.an('object')
      done()
    })
  })

  it('should return the correct fields', done => {
    api.get(`/api/artists/${artist._id}`).end((err, res) => {
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
        'associatedActs',
        'comments'
      ])
      done()
    })
  })

  it('should return the correct data types', done => {
    api.get(`/api/artists/${artist._id}`).end((err, res) => {
      expect(res.body._id).to.be.a('string')
      expect(res.body.name).to.be.a('string')
      expect(res.body.image).to.be.a('string')
      expect(res.body.stageName).to.be.a('string')
      expect(res.body.nationality).to.be.a('string')
      expect(res.body.dateOfBirth).to.be.a('string')
      expect(res.body.genre).to.be.a('array')
      expect(res.body.occupation).to.be.a('array')
      expect(res.body.instruments).to.be.a('array')
      expect(res.body.yearsActive).to.be.an('string')
      expect(res.body.labels).to.be.a('array')
      expect(res.body.costPerShow).to.be.a('string')
      expect(res.body.associatedActs).to.be.an('array')
      expect(res.body.comments).to.be.a('array')
      done()
    })
  })
})
