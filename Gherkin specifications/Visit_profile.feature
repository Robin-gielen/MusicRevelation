Feature: Visit profile

  In order to visit other users' profiles
  As a user
  I want to be able to visit profiles
  Background:
    Given a user

  Scenario: Visit other users' profiles
    Given another user's member profile
    When the user visits a member user's profile
    Then the profile is displayed

  Scenario: Access other users' videos list
    given another user's videos list
    When the user visits someone's videos list
    Then the videos list is displayed
