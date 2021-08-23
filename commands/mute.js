const {Discord, Client, Intents} = require('discord.js')

module.exports.run = async (prefix, message, content, bot) => {
    const isAdminRole = message.member.roles.cache.some(role => role.name === 'Admin')

    if(!isAdminRole) return `${message.member} dont have permision!`

    let user = message.mentions.members.first()
    let timeout = 5000
    user.voice.setMute(true)

    if(content[1]) {
        timeout = parseInt(content[2]) * 1000
        console.log()
    }

    setTimeout(() => {
        user.voice.setMute(false)
    }, timeout)

    message.channel.send(`${user.displayName} muted on ${timeout / 1000} seconds`)

    setTimeout(() => {
        message.channel.messages.cache.find(message => message.content === `${user.displayName} muted on ${timeout / 1000} seconds`).delete()
        message.delete()
    }, timeout)
}
    
module.exports.help = {
    name: 'mute'
}   
