Feature: Interact with video

	In order to interact on a video
	As a user on the web application
	I want to do things on a video page
	Background:
		Given a member user connected to his account
		And a video page

	Scenario: Access video page
		When the user select a video to watch
		Then a video page is displayed

	Scenario: Upvote a video
		Given a way to upvote a video
		When the user upvote a video
		Then the video receive one upvote on its vote-counter

	Scenario: Downvote a video
		Given a way to downvote a video
		When the user downvote a video
		Then the video receive one downvote on its vote-counter

	Scenario: Comment a video
		Given a commentary section
		When the user writes a comment
		Then the comment is added to the commentary section

	Scenario: Vote a favorite video of the week
		Given a way to vote a video for favorite video of the week
		When the user vote a favorite video
		Then the video receive a favorite video marker
		And the user is unable to give another marker for a week

	Scenario: Follow the artist
		Given an artist name on the video page
		When the user subscribe to the artist
		Then the artist is added to the user's followed-artists' list
		And the artist is notified that a user follow him
		And the artist's followers-counter raise by one
