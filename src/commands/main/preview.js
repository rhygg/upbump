exports.run = async (client, message, args) => {
  client.database.get('SELECT * FROM settings WHERE guildid = ?', [message.guild.id]).then(row => {
    const str = [
                  `__**${message.guild.name}**__\n`,
                  `${row.desc === null ? 'No description set yet.' : row.desc}`
    ]

    client.embed.send(message, {color:'#5EF7E5', desc: str.join('\n') })
  })
}

/** Command Config */
exports.conf = {
  enabled: true,
  aliases: ['pre','prev'],
  guildOnly: false,
  permLevel: 'Server Owner'
}

/** Command Help */
exports.help = {
  name: 'preview',
  usage: '',
  description: 'Preview your advertisement.'
}
