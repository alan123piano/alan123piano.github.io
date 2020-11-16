/*
 * Alan Yang
 * Defines a manipulable MapSvg. Depends on jQuery.
 */

import usa-modern from "./../maps/usa-modern.js";

let maps = {};

export default class MapSvg {
	constructor() {
	}
	static get(id) {
		if (maps[id] !== undefined) {
			return maps[id];
		} else {
			console.log("Error when trying to retrieve map with id: " + id + "!");
		}
	}
}
