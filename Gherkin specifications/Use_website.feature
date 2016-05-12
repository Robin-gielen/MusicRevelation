Feature: Use website

  In order to use the website
  As a user on the web application
  I want to connect to Music Revelation

  Scenario: Subscribe to Music Revelation
  Given a new user on the website
  And a suscribing page
  When the user create a new account
  Then a new account is created
  And the user can connect as a member of Music Revelation

  Scenario: Connect to Music Revelation
  Given a connecting page
  When the user member of Music Revelation enters valid name/password
  Then the user is connected
