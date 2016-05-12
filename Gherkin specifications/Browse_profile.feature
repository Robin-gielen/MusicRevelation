Feature: Browse profile

	In order to update the profile
	As a user on the web application
	I want to be able to modify specific profile parts
	Background:
		Given a member user connected to his account

	Scenario: Access user profile
		When the member user access his profile
		Then the profile is displayed

	Scenario: Update profile informations
		Given the profile informations of the user
		When the user modify a profile information
		Then the information is uploaded for all users

	Scenario: Access favorite-artists list
		Given the user's favorite-artists list
		When the user select his favorite-artists list
		Then the user's favorite-artist is displayed on screen

	Scenario: Revome an artist from favorite-artists list
		Given the user's favorite-artists list
		When the user removes an artist from his favorite-artists list
		Then the artist is no longer in the user's favorite-artists list

	Scenario: Access uploaded videos list
		Given a user's uploaded videos list
		When the user select his uploaded videos list
		Then the user's uploaded videos list is displayed on screen

	Scenario: Upload video
		Given a link to a youtube video
		When the user upload a new video to his uploaded videos list
		Then the video is added to user's uploaded videos list

	Scenario: Remove video
		Given a user with a non-empty uploaded videos list
		When the user removes a video from his uploaded videos list
		Then the video is removed from the uploaded videos list

	Scenario: Edit video
		Given a user with a non-empty uploaded videos list
		When the user edits a video from his uploaded videos list
		Then the video is edited
