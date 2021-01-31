const prettyMS = require('pretty-ms')
const lastDate = []

/**
 * Execute command
 * @param {Discord.Client} client - The Discord client
 * @param {Discord.Message} message - The message of the command
 * @param {string} args - The arguments of the command
 */
exports.run = async (client, message, args) => {
  const ignoreCooldown = false
  const now = new Date()
  const cooldown = (20 * 60 * 1000)

  if (!message.guild.me.hasPermission('CREATE_INSTANT_INVITE') || !message.guild.me.hasPermission('MANAGE_GUILD')) {
    client.embed.send(message, { desc: 'I need the `CREATE_INSTANT_INVITE` and `MANAGE_GUILD` permissions to bump.' })
    return
  }

  if (lastDate[message.guild.id] === undefined) {
    lastDate[message.guild.id] = 0
  }

  if (now - lastDate[message.guild.id] > cooldown || ignoreCooldown) {
    // It's been more than the set cooldown
    client.database.all('SELECT * FROM settings').then(async row => {
      message.guild.fetchInvites().then(async invites => {
        if (row.length - 1 <= 0) {
          client.embed.send(message, { desc: 'There are no other guilds for your advertisement to go, `up!invite` and setup the bot on other guilds before trying again.' })
          return
        }

        let invite

        if (invites.size > 0) {
          invite = invites.first() // Invite Exists
        } else {
          let channelID // Invite does not exist. Create one.
          const channels = message.guild.channels.cache
          for (const c of channels) {
            const channelType = c[1].type
            if (channelType === 'text') {
              channelID = c[0]
              break
            }
          }

          const channel = channels.get(message.guild.systemChannelID || channelID)
          invite = await channel.createInvite()
        }

        bumpLogic(client, message, row, invite)
        lastDate[message.guild.id] = now
      }).catch(console.error)
    })
  } else {
    // It's been less than the set cooldown.
    const remaining = prettyMS(Math.round((cooldown) - (now - lastDate[message.guild.id])), { verbose: true, unitCount: 3, secondsDecimalDigits: 0 })
    client.embed.send(message, { desc: `You must wait **${remaining}** before you can use this command again.` })
  }
}

function bumpLogic(client, message, row, invite) {
  for (let i = 0; i < row.length; i++) {
    const guild = client.guilds.cache.get(row[i].guildid)
    let desc = null

    for (let a = 0; a < row.length; a++) {
      const temp = client.guilds.cache.get(row[a].guildid)
      if (temp) {
        if (temp.id === message.guild.id) {
          if (!message.guild.channels.cache.has(row[a].partner)) {
            client.embed.send(message, { desc: `You must first initialize a channel for the bot in ${message.guild.name} with \`${client.config.prefix}init\` before you can bump your server.` })
            lastDate[message.guild.id] = 0
            return
          }
          desc = row[a].desc
          break
        }
      }
    }

    if (desc === undefined || desc === null) {
      lastDate[message.guild.id] = 0
      return client.embed.send(message, { desc: `A description for ${message.guild.name} has not been set yet. Please set one.` })
    }

    if (guild) {
      if (guild.channels.cache.has(row[i].partner) && guild.id !== message.guild.id) {
        const guildInfo = getGuildInfo(message.guild)
        guild.channels.cache.get(row[i].partner).send({
          embed: {
            title: guildInfo.name,
            description: `${desc}`,
            color: '#5EF7E5',
            fields: [

              {
                name: `:crown: **Owner**`,
                value: `${message.guild.owner.user.username}`,
                inline: true

              },
              {
                name: `:busts_in_silhouette: **Members**`,
                value: `${message.guild.members.cache.size}`,
                inline: true
              },

              {
                name: `:tools: **Created at**`,
                value: `${message.guild.createdAt}`,
                inline: true

              },

              {
                name: `:earth_americas: **Region**`,
                value: `${message.guild.region}`,
                inline: true
              },
              {
                name: `<:link:792052799038423060> **Join**`,
                value: `**[Join ${guildInfo.name} Now!](${invite.url})**`,
                inline: true
              }

            ],
            thumbnail: {
              url: message.guild.iconURL()
            },

            footer: {
              text: `✪ UpBump ✪`
            }
          }
        })
      }
    }
  }

  client.embed.send(message, { desc: `<a:ok:801050281634693181> Bumped to \`${client.guilds.cache.size}\` guilds! \n Thank you for choosing UpBump, a Bump Bot just made to advertise your server to the right crowd! \n\n This bot was made by **[Devify Development!](https://discord.gg/RTh79cwxxp)!** If you need any kind of support be sure to get on asking! We're always ready to help you!` })
}

}

exports.conf = {
  enabled: true,
  aliases: ['b'],
  guildOnly: false,
  permLevel: 'User'
}

exports.help = {
  name: 'bump',
  usage: '',
  description: 'Bump your advertisement.'
}
