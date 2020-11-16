/*
 * Alan Yang
 * Defines a CalendarDate object. ("Date" is already a JavaScript class.)
 */

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function isLeapYear(yr) {
	return (yr % 4 === 0) && (yr % 100 !== 0 || yr % 400 === 0);
}

function daysInMonth(m, leapYear=false) {
	switch(m) {
		case 1: return 31;
		case 2: return leapYear && 29 || 28;
		case 3: return 31;
		case 4: return 30;
		case 5: return 31;
		case 6: return 30;
		case 7: return 31;
		case 8: return 31;
		case 9: return 30;
		case 10: return 31;
		case 11: return 30;
		case 12: return 31;
		default: console.log("Invalid month passed to daysInMonth function"); return 0;
	}
}

function daysInYear(year) { return isLeapYear(year) && 366 || 365; }

export default class CalendarDate {
	constructor(year, month, day) {
		this.year = year;
		this.month = month;
		this.day = day;
	}
	toString() {
		return monthNames[this.month - 1] + " " + this.day + ", " + this.year;
	}
	add(days) {
		let leapYear = isLeapYear(this.year);
		let currDay = this.day;
		let currYear = this.year;
		for (let i = 1; i < this.month; i++) { currDay += daysInMonth(i, leapYear); }
		currDay += days;
		while (currDay <= 0) { // 0 would actually be Dec 31 of the previous year because day is indexed starting at 1
			currYear--;
			currDay += daysInYear(currYear);
		}
		while (currDay > daysInYear(currYear)) {
			currDay -= daysInYear(currYear);
			currYear++;
		}
		let currMonth = 1;
		while (true) {
			if (currDay > daysInMonth(currMonth)) {
				currDay -= daysInMonth(currMonth);
				currMonth++;
			} else {
				break;
			}
		}
		return new CalendarDate(currYear, currMonth, currDay);
	}
}
