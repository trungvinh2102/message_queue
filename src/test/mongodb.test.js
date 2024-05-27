'use strict'

const mongoose = require('mongoose')
const connectString = 'mongodb://localhost:27017/shopDEV'

const TestSchema = new mongoose.Schema({ name: String })
const Test = mongoose.model('Test', TestSchema)

describe('Mongoose Connection', () => {
  let connection
  beforeAll(async () => {
    connection = await mongoose.connect(connectString)
  })
  afterAll(async () => {
    await connection.disconnect()
  })

  it('should connect to moongose', () => {
    expect(mongoose.connection.readyState).toBe(1)
  })
  it('should save a document to the database', async () => {
    const user = new Test({ name: 'Welcome Shoppoint!' })
    await user.save()
    expect(user.isNew).toBe(false)
  })
  it('should find a document to the database', async () => {
    const user = await Test.findOne({ name: 'Welcome Shoppoint!' })
    // expect(user).toBeUndefined();
    expect(user.name).toBe('Welcome Shoppoint!')
  })
})