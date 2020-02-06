/* global api, describe, it, expect, beforeEach, afterEach */
const Artist = require('../../models/Artist')
const artistData = require('../../db/data/artistData')

describe('GET /artists', () => {
  beforeEach(done => {
    Artist.create(artistData).then(() => done())
  })

  afterEach(done => {
    Artist.remove({}).then(() => done())
  })

  it('should return a 200 response', done => {
    api.get('/api/artists').end((err, res) => {
      expect(res.status).to.eq(200)
      done()
    })
  })

  it('should return an array', done => {
    api.get('/api/artists').end((err, res) => {
      expect(res.body).to.be.an('array')
      done()
    })
  })

  it('should return an array of objects', done => {
    api.get('/api/artists').end((err, res) => {
      res.body.forEach(artist => {
        expect(artist).to.be.an('object')
      })
      done()
    })
  })

  it('should return the correct fields', done => {
    api.get('/api/artists').end((err, res) => {
      res.body.forEach(artist => {
        expect(artist).to.includes.keys([
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
      })
      done()
    })
  })

  it('should return the correct data types', done => {
    api.get('/api/artists').end((err, res) => {
      res.body.forEach(artist => {
        expect(artist._id).to.be.a('string')
        expect(artist.name).to.be.a('string')
        expect(artist.image).to.be.a('string')
        expect(artist.stageName).to.be.a('string')
        expect(artist.nationality).to.be.a('string')
        expect(artist.dateOfBirth).to.be.a('string')
        expect(artist.genre).to.be.a('array')
        expect(artist.occupation).to.be.a('array')
        expect(artist.instruments).to.be.a('array')
        expect(artist.yearsActive).to.be.an('string')
        expect(artist.labels).to.be.a('array')
        expect(artist.costPerShow).to.be.a('string')
        expect(artist.associatedActs).to.be.an('array')
        expect(artist.comments).to.be.a('array')
      })
      done()
    })
  })
})
