const {Discord, Client, Intents} = require('discord.js')
const config = require('./config.json')

const { promisify } = require('util');
const readdir = promisify(require('fs').readdir);

const token = config.token
const prefix = config.prefix

const bot = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]})

bot.commands = new Map();

bot.on('ready', async () => {
  readdir('./commands/', (error, files) => {
    if (error) throw error
    files.forEach(file => {
      if (!file.endsWith('.js')) return
      try {
        const properties = require(`./commands/${file}`)
        bot.commands.set(properties.help.name, properties)
        console.log(`Properties:  ${properties.help.name} || ${properties}`)
      } catch (err) {
        throw err
      }  
    })
  })
  console.log(`${bot.user.tag} is activated`)
  console.log(`Bot commands:  ${bot.commands}`)
})

bot.on('message', (message) => {
    if(message.type === 'dm') return
    const content = message.content.toLowerCase().replace(/\s+/g, ' ').trim().split(' ')
    console.log(content)

    if(content[0] === prefix + 'stop'){
      process.exit()
    }

    const command = content.shift().slice(prefix.length).toLowerCase()

    const cmd = bot.commands.get(command)

    if (!cmd) return
    cmd.run(prefix, message, content, bot)

})

bot.login(token)