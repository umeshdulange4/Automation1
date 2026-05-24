
@smoke1
Feature: Login Functionality
@smoke
Scenario: Verify Login feature

Given User navigates to URL
When User enters credentials
Then home page should be displayed

@smoke
Scenario Outline: Verify Login feature with invalid Email

Given User navigates to URL
When User enters incorrect "<Email>" and correct "<Password>"
Then User should get warning to enter correct Email

Examples:
|Email                   |    Password |
|Umesh1990@gmail.com     |   2uEDqMFqvk|
|Umeshdulange4@gmail.com |   2uEuqMFqvk|