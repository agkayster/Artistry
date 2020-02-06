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
  genre: 'Hip Hop',
  occupation: ['Singer'],
  instruments: ['Vocals'],
  yearsActive: ['2011-present'],
  labels: ['Sony'],
  costPerShow: '3000',
  associatedActs: ['sick', 'one', 'mate'],
  comments: ['Good guy']
}

describe('POST /artists', () => {
  let token = null
  

  beforeEach(done => {
    User.create(testUser)
      .then(user => {
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
          'associatedActs',
          'comments'
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
        expect(res.body.streetAddress).to.eq(testData.streetAddress)
        expect(res.body.plotType).to.deep.eq(testData.plotType)
        expect(res.body.postCode).to.eq(testData.postCode)
        expect(res.body.latitude).to.eq(testData.latitude)
        expect(res.body.longitude).to.eq(testData.longitude)
        expect(res.body.bioWasteAccepted).to.eq(testData.bioWasteAccepted)
        expect(res.body.numOfSlots).to.eq(testData.numOfSlots)
        expect(res.body.slotsAvailable).to.eq(testData.slotsAvailable)
        expect(res.body.facilities).to.deep.eq(testData.facilities)
        expect(res.body.costInvolved).to.eq(testData.costInvolved)
        expect(res.body.costPerAnnum).to.eq(testData.costPerAnnum)
        expect(res.body.conditionsForUse).to.deep.eq(testData.conditionsForUse)
        expect(res.body.Volunteer).to.eq(testData.Volunteer)
        expect(res.body.primaryContactName).to.eq(testData.primaryContactName)
        expect(res.body.primaryContactEmail).to.eq(
          testData.primaryContactEmail
        )
        done()
      })
  })
})
