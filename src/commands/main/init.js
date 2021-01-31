exports.run = async (client, message, args) => {
  if (args[0] === undefined) {
    return client.embed.send(message, {color:'#5EF7E5', desc: 'Please specify a channel.' })
  }
  const channel = client.guilds.cache.get(message.guild.id).channels.cache.find(channel => [channel.name, channel.id].includes(args[0].replace(/[<#>]/g, '')))
  if (channel) {
    client.database.run('UPDATE settings SET partner = ? WHERE guildid = ?', [channel.id, message.guild.id])
    client.embed.send(message, {color:'#5EF7E5', desc: `Success! Now go ahead and give your advertisement a \`${client.config.prefix}desc\` then \`${client.config.prefix}bump\` it!` })
  } else {
    client.embed.send(message, { color:'#5EF7E5',desc: 'Invalid channel.' })
  }
}

/** Command Config */
exports.conf = {
  enabled: true,
  aliases: ['in','autoad','ad'],
  guildOnly: false,
  permLevel: 'Server Owner'
}

/** Command Help */
exports.help = {
  name: 'init',
  usage: '<channel>',
  description: 'Setup the bot.'
}
