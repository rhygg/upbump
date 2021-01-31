exports.run = async (client, message, args) => {
  const msg = await client.embed.send(message, { desc: 'Ping?' }, false)
  await client.embed.edit(message, msg, { desc: `<a:color:787891503354609684> Pong! Latency is ${msg.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`,
  color: '#5EF7E5' })
}

/** Command Config */
exports.conf = {
  enabled: true,
  aliases: ['p','pin'],
  guildOnly: false,
  permLevel: 'User'
}

/** Command Help */
exports.help = {
  name: 'ping',
  usage: '',
  description: 'Send a ping and receive a pong!'
}
