const Discord = require('discord.js')

module.exports.run = async (prefix, message, content, bot) => {
    const isAdminRole = message.member.roles.cache.some(role => role.name === 'Admin')

    if(!isAdminRole) return `${message.member} dont have permision!`

    const user = message.mentions.members.first()
    let count = 1
    console.log(`Content: ${content}`)

    if(content[1]) count = parseInt(content[1])

    let sum = 0

    message.channel.messages.fetch()
        .then(messages => {
            msgs = messages.filter(m => {
                return m.author.id === user.id
            })

            msgs.forEach(m => {
                if(sum < count) {
                    m.delete()
                }
                sum++
            })
        })
        .catch(console.error)
    message.channel.send(`${message.author} deleted last ${count} ${user ? user : bot.user} ${count === 1 ? 'message' : 'messages'}`)
}
    
module.exports.help = {
    name: 'clear'
}