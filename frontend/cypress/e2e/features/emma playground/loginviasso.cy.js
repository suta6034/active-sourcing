import { Login } from '../pages/login.js';

const login = new Login();

it('login via SSO', () => {
    /* 
        Given I call the URL of the Active Sourcing Platform 
        Then I am redirected to the login page of other application of karriere.at e.g. Business Portal
        When I enter a valid username and a valid password into the respective input fields
        And I press the login button 
        Then the Active Sourcing Platform is opened
        And I am logged in to the Active Sourcing Platform
    */
   
    login.acceptCookies();
    login.enterUsername('cheeky-coconut');
    login.enterPassword('knxB6X1LpQ');
    login.clickLoginButton();
});