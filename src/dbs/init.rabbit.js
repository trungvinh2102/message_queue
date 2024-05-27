'use strict'

const amqplib = require('amqplib')

const connectToRabbitMQ = async () => {
  try {
    const connection = await amqplib.connect('amqp://guest:guest@localhost')
    if (!connection) throw new Error('Connection not established!')

    const channel = await connection.createChannel()

    return { channel, connection }
  } catch (error) {

  }
}

const connectionToRabbidMQForTest = async () => {
  try {
    const { channel, connection } = await connectToRabbitMQ()

    const queue = 'test-queue'
    const message = 'Welcome!!!'
    await channel.assertQueue(queue)
    await channel.sendToQueue(queue, Buffer.from(message))

    await connection.close()
  } catch (error) {
    console.log('Error connecting to RabbidMQ', error);
  }
}


module.exports = {
  connectToRabbitMQ,
  connectionToRabbidMQForTest
}