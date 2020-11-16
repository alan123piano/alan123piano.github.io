/*
 * Alan Yang
 * For the New Campaign Trail.
 */

console.log("Posted 1:36 PM 4/21/2020");

import Party from "./modules/Party.js";

console.log(Party.get("republican"));

import Color from "./modules/Color.js";

import usa1992 from "./scenario/usa1992.js";

let scenarios = {
	usa1992: usa1992
}

let game = { // game data
	scenario: null,
	candidate: null
}
 
$(document).ready(function() {
	
	// init - show title screen
	
	$("#game-screen").css("left", "100%");
	$("#game-screen").hide();
	$("#candidate-list").hide();
	$("#candidate-info").hide();
	$("#main-frame").hide();
	$("#title-screen").show();
	
	// title screen buttons
	
	$("#new-game-button").click(function() {
		$("#game-screen").removeClass("hidden");
		$("#title-screen").animate({
			"left": "-100%"
		}, 500, function() {
			$("#title-screen").hide();
		});
		$("#game-screen").show();
		$("#game-screen").animate({
			"left": 0
		}, 500, function() {
			$("#title-banner").remove();
		});
	});
	
	// populate year buttons
	
	let yearButtons = [];
	let selectedButton;
	
	for (const year in scenarios) {
		let scenario = scenarios[year];
		let newButton = $('<input id="year-' + year + '-button" type="button" value="' + year + '">');
		newButton.css({
			"background-size": "cover",
			"background-image": "url(./img/year-buttons/" + year + "-4x1.jpg)",
			"box-shadow": "none"
		});
		newButton.mouseenter(function() {
			if (!newButton.is(selectedButton)) {
				newButton.css("box-shadow", "inset 0 0 0 4px #aa5");
			}
		});
		newButton.mouseleave(function() {
			if (newButton.is(selectedButton)) {
				newButton.css("box-shadow", "inset 0 0 0 4px #ff0");
			} else {
				newButton.css("box-shadow", "none");
			}
		});
		newButton.click(function() {
			if (!newButton.is(selectedButton)) {
				if (selectedButton != null) {
					selectedButton.css("box-shadow", "none");
				}
				selectedButton = newButton;
				newButton.css("box-shadow", "inset 0 0 0 4px #ff0");
				
				// populating scenario info
				
				$("#candidate-list").html("");
				$("#candidate-list").show();
				
				$("#candidate-info").hide();
				
				// candidates list
				
				let selectedCandidateFrame;
				let selectedCandidate;
				
				for (const candidateKey in scenario.candidates) {
					let candidate = scenario.candidates[candidateKey];
					let candidateFrame = $("<div></div>");
					candidateFrame.css({
						"background-color": candidate.party.primary_color,
						"box-shadow": "inset 0 0 0 6px " + candidate.party.primary_color_dark
					});
					
					let portrait = $('<img src="./img/' + year + '/' + candidateKey + '.png">');
					candidateFrame.append(portrait);
					
					let nameDiv = $("<div></div>");
					nameDiv.text(candidate.name);
					candidateFrame.append(nameDiv);
					
					candidateFrame.mouseenter(function() {
						if (!candidateFrame.is(selectedCandidateFrame)) {
							candidateFrame.css("box-shadow", "inset 0 0 0 6px " + candidate.party.primary_color_light);
						}
					});
					
					candidateFrame.mouseleave(function() {
						if (candidateFrame.is(selectedCandidateFrame)) {
							candidateFrame.css("box-shadow", "inset 0 0 0 6px #eee");
						} else {
							candidateFrame.css("box-shadow", "inset 0 0 0 6px " + candidate.party.primary_color_dark);
						}
					});
					
					candidateFrame.click(function() {
						if (!candidateFrame.is(selectedCandidateFrame)) {
							if (selectedCandidateFrame != null) {
								selectedCandidateFrame.css("box-shadow", "inset 0 0 0 6px " + selectedCandidate.party.primary_color_dark);
							}
							selectedCandidateFrame = candidateFrame;
							selectedCandidate = candidate;
							candidateFrame.css("box-shadow", "inset 0 0 0 6px #eee");
							
							// populating candidate info
							
							$("#candidate-info").html("");
							$("#candidate-info").show();
							
							let imgDivContainer = $("<div></div>");
							imgDivContainer.css({
								"margin": "20px 0",
								"text-align": "center"
							});
							
							let imgCampaign = $("<img>");
							imgCampaign.attr("src", "./img/" + year + "/" + candidateKey + "_campaign.jpg");
							imgCampaign.css({
								"border": "5px ridge rgb(200, 200, 200)",
								"object-fit": "cover",
								"max-height": "40vh",
								"margin": "auto 0"
							});
							imgDivContainer.append(imgCampaign);
							
							$("#candidate-info").append(imgDivContainer);
							
							let candidateDescDiv = $("<div></div>");
							candidateDescDiv.text(candidate.blurb);
							candidateDescDiv.css({
								"flex-grow": "1",
								"background-color": "rgba(32, 32, 32, 0.7)",
								"padding": "10px",
								"color": "#eee",
								"font-size": "18px"
							});
							$("#candidate-info").append(candidateDescDiv);
							
							let playButton = $('<input type="button" value="Start">');
							playButton.css("background-color", "rgba(0, 255, 0, 0.5)");
							$("#candidate-info").append(playButton);
							
							playButton.mouseenter(function() {
								playButton.css("background-color", "rgba(0, 255, 0, 0.6)");
							});
							
							playButton.mouseleave(function() {
								playButton.css("background-color", "rgba(0, 255, 0, 0.5)");
							});
							
							playButton.click(function() {
								game.scenario = scenario;
								game.candidate = candidate;
								
								$("#scenario-frame").css({
									"top": $("#scenario-frame").position().top,
									"height": $("#scenario-frame").height(),
									"position": "absolute"
								});
								$("#main-frame").css({
									"left": "100%",
									"top": $("#scenario-frame").position().top,
									"width": "100vw",
									"height": $("#scenario-frame").height(),
									"position": "absolute"
								});
								$("#main-frame").show();
								
								$("#scenario-frame").animate({
									"left": "-100%"
								}, 500, function() {
									$("#scenario-frame").hide();
								});
								$("#main-frame").animate({
									"left": 0
								}, 500, function() {
									$("#main-frame").css({
										"top": "auto",
										"width": "auto",
										"height": "auto",
										"position": "static"
									});
								});
							});
						}
					});
					
					$("#candidate-list").append(candidateFrame);
				}
			}
		});
		
		yearButtons.push(newButton);
		
		$("#year-list").append(newButton);
	}
	
	// main frame
	
	/*let map = $(usa_modern_svg);
	map.attr({
		"id": "map",
		"viewBox": "0 0 950 600"
	});
	$("#map-container-div").append(map);*/
	
}); // end document.ready
