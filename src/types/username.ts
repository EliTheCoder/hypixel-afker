import { ArgumentType } from "discord.js-commando";

class UsernameArgumentType extends ArgumentType {
	constructor(client) {
		super(client, "username");
	}

	validate(val) {
		return val.match(/\w{3,16}/g);
	}

	parse(val) {
		return val;
	}
}

export default UsernameArgumentType;
