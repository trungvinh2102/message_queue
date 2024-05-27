'use strict'

const {
  connectionToRabbidMQForTest
} = require('../dbs/init.rabbit')

describe('RabitMQ Connection', () => {
  it('should connect to successfull RabbitMQ', async () => {
    const result = await connectionToRabbidMQForTest();
    expect(result).toBeUndefined();
  })
})

