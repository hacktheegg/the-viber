const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

let user = await lib.discord.users['@0.2.0'].retrieve({
  user_id: `${context.params.event.user_id}`
});
await lib.discord.channels['@0.2.0'].messages.create({
  "channel_id": `939780327000387654`,
  "content": '${user} test',
  "tts": false,
});