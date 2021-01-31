const Discord = require('discord.js');
module.exports = async (client, guild) => {
  client.logger.log(`I have joined the guild ${guild.name}`)
  const suggestions = ["The more the stress you put on the beautification of the description the more members you attract","Your description should be atleast 100 characters","Your description should not exceed more than 200 words", "More the impression you put on the server's aesthetics the more members you gain.","A server with a particular topic gains more members!"];
  let random = Math.floor(Math.random() * 5);
  client.database.run('INSERT OR IGNORE INTO settings (guildid) VALUES (?)', [guild.id])
  const embed = new Discord.MessageEmbed()
  .setColor('#5EF7E5')
  .addField('<a:nitro_s:790166844799451198> Thank you for bringing **UpBumper** to your server.',`To configure UpBumper and get it running let me take you throgh an example mindmap! \n ✪ \`up!autoad #channel\` \n ✪ \`up!desc This is my awesome server\` \n ✪ \`up!preview\` \n ✪ \`up!bump\` \n\n And that's all you need to do!! \n\n **<a:tick:791208682607870003> Quick Suggestion**: ${suggestions[random]}`);
  guild.owner.user.send(embed);
}
