const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

const username = `${context.params.event.author.username}`;
let adminRole = '939782660102955008';

if (context.params.event.content.match(/sus|sussy|amongus|amogus/i))  {
  await lib.discord.channels['@0.2.0'].messages.create({
    "channel_id": `${context.params.event.channel_id}`,
    "content": `${username} is now sus`,
    "tts": false,
  });
  if (!context.params.event.member.roles.includes(adminRole)) {
    await lib.discord.guilds['@0.2.3'].members.roles.update({
      role_id: `948154200804696094`,
      user_id: `${context.params.event.author.id}`,
      guild_id: `${context.params.event.guild_id}`
    });
  }
}