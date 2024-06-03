'use strict'

const {
  connectToRabbitMQ,
  consumerToQueue
} = require('../dbs/init.rabbit')

const log = console.log

console.log = (function () {
  log.apply(console, [new Date()].concat(arguments))
})

const messageService = {

  // ---------------- consumer to queue --------------------------
  consumerToQueue: async (queueName) => {
    try {
      const { channel, connection } = await connectToRabbitMQ()
      await consumerToQueue(channel, queueName)
    } catch (error) {
      console.error(`Error consumerQueue::`, error)
    }
  },

  // ----------------------- case processing-----------------------
  consumerToQueueNormal: async () => {
    try {
      const { channel, connection } = await connectToRabbitMQ()

      const notificationQueue = 'noticationQueueProcess'

      const timeExpried = 5000
      setTimeout(() => {
        channel.consume(notificationQueue, msg => {
          console.log(`Send to notification queue successfully process: `, msg.content.toString());
          channel.ack(msg)
        })
      }, timeExpried)
    } catch (error) {
      console.error(error)
    }
  },

  // ----------------------- case processing-----------------------
  consumerToQueueFailed: async () => {
    try {
      const { channel, connection } = await connectToRabbitMQ()

      const notificationExchangeDLX = 'notificationExchangeDLX'
      const notificationRoutingKeyDLX = 'notificationRoutingKeyDLX'
      const notificationQueueHandler = 'notificationQueueHotFix'

      await channel.assertExchange(notificationExchangeDLX, 'direct', {
        durable: true
      })

      const queueResult = await channel.assertQueue(notificationQueueHandler, {
        exclusive: false
      })

      await channel.bindQueue(queueResult.queue, notificationExchangeDLX, notificationRoutingKeyDLX)
      await channel.consume(queueResult.queue, msgFailed => {
        console.log('this notification error:', msgFailed.content.toString(), {
          noAck: true
        });
      })
    } catch (error) {
      console.error(error)
      throw error
    }
  }

}

module.exports = messageService