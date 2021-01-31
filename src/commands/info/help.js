exports.run = async (client, message, args) => {
  const suggestions = ["The more the stress you put on the beautification of the description the more members you attract","Your description should be atleast 100 characters","Your description should not exceed more than 200 words", "More the impression you put on the server's aesthetics the more members you gain.","A server with a particular topic gains more members!"];
  let random = Math.floor(Math.random() * 5);
  client.embed.send(message, {
    title: 'Help',
    color:'#5EF7E5',
    code: true,
    desc: `**UpBump is an awesome bot just, for advertising your server to the right crowd! 
    \n Every command starts with \`up!\`**`,
    fields: [{
      name: '**<:link:792052799038423060> invite**',
      value: 'Invite the bot to your server.'
    },
    {
      name: '**<a:color:801051062302933012> autoad**',
      value: 'Synchronize advertisement channel.'
    },
    {
      name: '**:scroll: desc/d**',
      value: 'Set the description of your advertisement.'
    
    },
    {
      name: '**:eyes: preview/prev**',
      value: 'Preview your advertisement.'
  
    },
    {
      name: '**<:Microphone:801051562935451669> bump**',
      value: 'Bump your ad to all the other guilds.'
      
    },
    {
      name: '**:tools: help**',
      value: 'The command you just used!'
       
    },
     {
      name:`**<a:Verified:801052043413815297> Quick Suggestion:**`,
      value:`**${suggestions[random]}**`
    },
    {
      name:`\n :star2: **Helpful Links**`,
      value:`**[Support Server](https://discord.gg/RTh79cwxxp) | [Invite](https://discordapp.com/api/oauth2/authorize?client_id=790862257910710272&scope=bot&permissions=27681) | [Vote](https://discord.ly/upbump) | [Bump](https://dsc.gg/upbump)**`
    }
    ]
  
    
  })
}

/** Command Config */
exports.conf = {
  enabled: true,
  aliases: ['h'],
  guildOnly: false,
  permLevel: 'User'
}

/** Command Help */
exports.help = {
  name: 'help',
  usage: '',
  description: 'Helpful command.'
}
