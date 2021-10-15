const { Client, FriendlyError } = require("discord.js-commando");
import { join } from "path";
import { existsSync, writeFileSync } from "fs";
import { oneLine } from "common-tags";
require("better-logging")(console);

const client = new Client({
	owner: "470935011722395651",
	commandPrefix: "-",
});

if (!existsSync(join(__dirname, "commands/hypixel/users.json"))) writeFileSync(join(__dirname, "commands/swipe/users.json"), "{}");

client
	.on("error", console.error)
	.on("warn", console.warn)
	.on("debug", console.log)
	.on("ready", () => {
		console.log(`Client ready; logged in as ${client.user.username}#${client.user.discriminator} (${client.user.id})`);
		client.user.setPresence({
			activity: { name: "-help", type: "PLAYING" },
			status: "online",
		});
	})
	.on("disconnect", () => {
		console.warn("Disconnected!");
	})
	.on("reconnecting", () => {
		console.warn("Reconnecting...");
	})
	.on("commandError", (cmd, err) => {
		if (err instanceof FriendlyError) return;
		console.error(`Error in command ${cmd.groupID}:${cmd.memberName}`, err);
	})
	.on("commandBlocked", (msg, reason) => {
		console.log(oneLine`
			Command ${msg.command ? `${msg.command.groupID}:${msg.command.memberName}` : ""}
			blocked; ${reason}
		`);
	})
	.on("commandPrefixChange", (guild, prefix) => {
		console.log(oneLine`
			Prefix ${prefix === "" ? "removed" : `changed to ${prefix || "the default"}`}
			${guild ? `in guild ${guild.name} (${guild.id})` : "globally"}.
		`);
	})
	.on("commandStatusChange", (guild, command, enabled) => {
		console.log(oneLine`
			Command ${command.groupID}:${command.memberName}
			${enabled ? "enabled" : "disabled"}
			${guild ? `in guild ${guild.name} (${guild.id})` : "globally"}.
		`);
	})
	.on("groupStatusChange", (guild, group, enabled) => {
		console.log(oneLine`
			Group ${group.id}
			${enabled ? "enabled" : "disabled"}
			${guild ? `in guild ${guild.name} (${guild.id})` : "globally"}.
		`);
	});

client.registry
	.registerGroups([["hypixel", "Hypixel commands"]])
	.registerDefaults()
	.registerTypesIn(join(__dirname, "types"))
	.registerCommandsIn(join(__dirname, "commands"));

if (!process.env.HYPIXEL_AFKER_TOKEN) {
	console.error("You need to set the environment variable HYPIXEL_AFKER_TOKEN to the Discord token of your bot");
}

if (!process.env.HYPIXEL_API_KEY) {
	console.error("You need to set the environment variable HYPIXEL_API_KEY to the Discord token of your bot");
}

client.login(process.env.HYPIXEL_AFKER_TOKEN);
