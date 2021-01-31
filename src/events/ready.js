module.exports = async client => {
  client.user.setActivity(`up!bump with ${client.users.cache.size} users`) 

  client.logger.log(`${client.user.tag} running on ${client.guilds.cache.size} users guilds with ${client.users.cache.size} guilds.`)

  client.database.run('CREATE TABLE IF NOT EXISTS settings (guildid TEXT UNIQUE, partner CHARACTER, desc VARCHAR)').then(() => {
    for (const guild of client.guilds.cache.values()) {
      client.database.run('INSERT OR IGNORE INTO settings (guildid) VALUES (?)', [guild.id])
    }
  })
}
