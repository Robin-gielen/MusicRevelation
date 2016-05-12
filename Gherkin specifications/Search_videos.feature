Feature: Search videos

	In order to discover new artists
	As a user on the web application
	I want to browse the videos database
	Background:
		Given a member user connected to his account
		And a videos database

	Scenario: Search for videos
		Given a certain user research input
		When the user executes a research
		Then a set of video is suggested

	Scenario: Choose video research genre
		Given a list of genres
		When the user select a genre
		Then a set of videos of this genre is suggested
		And the videos are sorted by popularity

	Scenario: Complex video research
		Given a list of caracteristics
		When the user select a set of caracteristics
		Then a set of videos matching the caracteristics is suggested
