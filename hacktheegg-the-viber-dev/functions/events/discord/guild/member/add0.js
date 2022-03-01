const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

let event = context.params.event;

const guild = await lib.discord.guilds['@0.1.0'].retrieve({
  guild_id: event.guild_id,
});

const get_all_members = async (limit = 1000) => {
  const allMembers = [];
  let last_id;

  while (true) {
    const options = {limit};
    if (last_id) {
      options.after = `${last_id}`;
    }

    const members = await lib.discord.guilds['@0.1.0'].members.list({
      guild_id: event.guild_id,
      ...options,
    });
    allMembers.push(...members);

    if (members[members.length - 1]) {
      last_id = members[members.length - 1].user.id;
    }

    if (members.length !== limit) {
      break;
    }
  }

  return allMembers;
};

const welcomeMESSAGES = [
  `A wild **${event.user.username}** has been spotted joining the server!`,
  `What's up **${event.user.username}**?`,
  `Hey there **${event.user.username}**!`,
  `Enjoy your stay here in ${guild.name}, **${event.user.username}**!`,
  `Welcome ${event.user.username}! Hope you brought pizza. 🍕😋`,
  `Thanks for joining us here in ${guild.name}, ${event.user.username}!`,
];

const randomWMESSAGE =
  welcomeMESSAGES[Math.floor(Math.random() * welcomeMESSAGES.length)];

let allMembers = await get_all_members();
await lib.discord.channels['@0.2.0'].messages.create({
  channel_id: process.env.WELCOME_CHANNEL_ID,
  content: `New Member`,
  tts: false,
  embeds: [
    {
      type: 'rich',
      title: ``,
      description: `${randomWMESSAGE}`,
      color: 0xffffff,
      author: {
        name: `${event.user.username}#${event.user.discriminator}`,
        icon_url: `https://cdn.discordapp.com/avatars/${context.params.event.user.id}/${context.params.event.user.avatar}.png`,
      },
      footer: {
        text: `#${allMembers.length} Member`,
        icon_url: `${guild.icon_url}`,
      },
    },
  ],
});
