'use strict'

const {
  connectToRabbitMQ,
  consumerToQueue
} = require('../dbs/init.rabbit')

const messageService = {
  consumerToQueue: async (queueName) => {
    try {
      const { channel, connection } = await connectToRabbitMQ()
      await consumerToQueue(channel, queueName)
    } catch (error) {
      console.error(`Error consumerQueue::`, error)
    }
  }
}

module.exports = messageService