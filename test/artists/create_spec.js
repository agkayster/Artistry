/* global api, describe, it, expect, afterEach, beforeEach */
const Artist = require('../../models/Artist')
const User = require('../../models/User')
const jwt = require('jsonwebtoken')
const { secret } = require('../../config/environment')
const testUser = {
  username: 'Ejike',
  email: 'agkayster@gmail.com',
  password: 'test',
  passwordConfirmation: 'test'
}
const testData = {
  name: 'Jeffs plot',
  image: 'hvkgiyg',
  stageName: 'Brackash',
  nationality: 'Nigerian',
  dateOfBirth: '12-01-2020',
  genre: ['Hip Hop'],
  occupation: ['Singer'],
  instruments: ['Vocals'],
  yearsActive: '2011-present',
  labels: ['Sony'],
  costPerShow: '3000',
  associatedActs: ['sick', 'one', 'mate']
}

describe('POST /artists', () => {
  let token = null

  beforeEach(done => {
    User.create(testUser).then(user => {
      token = jwt.sign({ sub: user._id }, secret, { expiresIn: '6h' })
      done()
    })
  })

  afterEach(done => {
    Artist.remove({})
      .then(() => User.remove({}))
      .then(() => done())
  })

  it('should return a 401 response without a token', done => {
    api
      .post('/api/artists')
      .send(testData)
      .end((err, res) => {
        expect(res.status).to.eq(401)
        done()
      })
  })

  it('should return a 201 response with a token', done => {
    api
      .post('/api/artists')
      .set('Authorization', `Bearer ${token}`)
      .send(testData)
      .end((err, res) => {
        expect(res.status).to.eq(201)
        done()
      })
  })

  it('should return an object', done => {
    api
      .post('/api/artists')
      .set('Authorization', `Bearer ${token}`)
      .send(testData)
      .end((err, res) => {
        expect(res.body).to.be.an('object')
        done()
      })
  })

  it('should return the correct fields', done => {
    api
      .post('/api/artists')
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
      .post('/api/artists')
      .set('Authorization', `Bearer ${token}`)
      .send(testData)
      .end((err, res) => {
        expect(res.body.name).to.eq(testData.name)
        expect(res.body.image).to.eq(testData.image)
        expect(res.body.stageName).to.deep.eq(testData.stageName)
        expect(res.body.nationality).to.eq(testData.nationality)
        expect(res.body.dateOfBirth).to.eq(testData.dateOfBirth)
        expect(res.body.genre).to.deep.eq(testData.genre)
        expect(res.body.occupation).to.deep.eq(testData.occupation)
        expect(res.body.instruments).to.deep.eq(testData.instruments)
        expect(res.body.yearsActive).to.eq(testData.yearsActive)
        expect(res.body.labels).to.deep.eq(testData.labels)
        expect(res.body.costPerShow).to.eq(testData.costPerShow)
        expect(res.body.associatedActs).to.deep.eq(testData.associatedActs)
        done()
      })
  })
})
