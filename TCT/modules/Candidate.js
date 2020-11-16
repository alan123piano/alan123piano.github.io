/*
 * Alan Yang
 * Defines a Candidate object.
 */

import Party from "./Party.js";

export default class Candidate {
	constructor(id, name, party, blurb) {
		this.id = id;
		this.name = name;
		this.party = party;
		this.blurb = blurb;
		
		this.money = 0;
		
	}
}
