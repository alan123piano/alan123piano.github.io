/*
 * Alan Yang
 * Defines political parties.
 */

import Color from "./Color.js";

let parties = {};

export default class Party {
	constructor(id, name, color) {
		this.id = id;
		this.name = name;
		this.color = color;
		if (parties[id] === undefined) {
			parties[id] = this;
		} else {
			console.log("ERROR: Party with id: " + id + " already exists, but it is being written to!");
		}
	}
	
	static get(partyId) {
		if (parties[partyId] === undefined) {
			console.log("ERROR: " + partyId + " could not be found as a valid party!");
		} else {
			return parties[partyId];
		}
	}
}

// building parties

new Party("republican", "Republican Party", new Color(233, 20, 29));
new Party("democratic", "Democratic Party", new Color(0, 21, 188));
