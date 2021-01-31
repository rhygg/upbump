const Discord = require('discord.js');
exports.run = async (client, message, args) => {
  client.embed.send(message, { desc: 'I\'ve sent you a private message with the bot invite link.',
  color: '#5EF7E5' })
  const embed = new Discord.MessageEmbed()
  .addField(`Thank you for showing interest in UpBumper`,` This bot was soley made to serve the purpose of advertising **your** server to the right crowd. This bot is sponsered by [Xentris hosting](https://discord.gg/RTh79cwxxp) an awesome hosting service just to provide **free** bot hosting for those incredible bot developers.\n\n **Here is an invite link to the bot:**\n\n <https://discordapp.com/api/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=27681> \n`)
  .setColor('#5EF7E5')
  message.author.send(embed);

}

/** Command Config */
exports.conf = {
  enabled: true,
  aliases: ['inv','in','i'],
  guildOnly: false,
  permLevel: 'User'
}

/** Command Help */
exports.help = {
  name: 'invite',
  usage: '',
  description: 'Invite the bot.'
}
