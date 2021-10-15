import { Client, Command, CommandoMessage } from "discord.js-commando";
import { HypixelAPI } from "hypixel-api-v2";

export default class FollowCommand extends Command {
	constructor(client: Client) {
		super(client, {
			name: "follow",
			group: "hypixel",
			memberName: "follow",
			description: "Get updates when a specific user leaves the server on hypixel",
			examples: ["follow EliTheCoder", "follow golemsrus"],
			guildOnly: false,
			args: [
				{
					key: "player",
					prompt: "What player would you like to follow?",
					type: "username",
				},
			],
		});
	}

	async run(msg: CommandoMessage, args: string | object | string[], _: boolean): Promise<CommandoMessage | null> {
		if (!process.env.HYPIXEL_API_KEY) return null;
		const hypixel = new HypixelAPI(process.env.HYPIXEL_API_KEY);
		const player = await hypixel.player(args[0]);
		msg.reply(JSON.stringify(player));
	}
}
