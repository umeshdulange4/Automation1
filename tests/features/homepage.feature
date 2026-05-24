Feature: Homepage Functionality

    Scenario: Verify Product Web Testing

        Given User navigates to the Browserstack Homepage

        When User clicks on Product Menu

        Then It should show Web Testing Product

    Scenario: Verify Pricing Product Lists

        Given User Navigates to Browserstack Homepage

        When User clicks on Pricing Menu

        Then It should Display correct Product lists in left Nav

    @homepage
    Scenario: verify the homepage links
    When  User navigates to growNow homepage
    Then User verify links are visible on the homepage
    
    