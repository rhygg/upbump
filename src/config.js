const config = {
  statusURL: 'https://srhpyqt94yxb.statuspage.io/api/v2/status.json',
  prefix: 'up!',
  botGuildID: '778614194857574412',
  ownerID: '749936830098571335',
  ad: {
    desc: {
      min_length: 100,
      max_length: 2000
    }
  },
  botMaintenance: false,
  deleteCommands: true,
  deleteTime: 30000,
  emojis: {
    delete: '689328295958806639'
  },
  permLevels: [
    {
      level: 0,
      name: 'User',
      check: () => {
        return new Promise((resolve, reject) => {
          resolve(true)
        })
      }
    },
    {
      level: 4,
      name: 'Server Owner',
      check: (client, message) => {
        return new Promise((resolve, reject) => {
          resolve(message.member.id === message.guild.owner.id)
        })
      }
    },
    {
      level: 10,
      name: 'Bot Owner',
      check: (client, message) => {
        return new Promise((resolve, reject) => {
          resolve(message.member.id === config.ownerID)
        })
      }
    }
  ]
}

module.exports = config
