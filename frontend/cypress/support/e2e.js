import './commands';

const desktopWidth = 1600;
const desktopHeight = 800;
const user = "cheeky-coconut";
const pw = "knxB6X1LpQ";
const b2b_identity_provider_session = "ASP-SESSION";

let cookieB2B;

before(() => {
    cy.clearCookies();
    cy.visit('/');
    cy.get('button[id="onetrust-accept-btn-handler"]').click();
    cy.get('input[name="username"]').type(user);
    cy.get('input[name="password"]').type(pw);
    cy.get('button[dusk="login-button"]').click();

    cy.getCookie(b2b_identity_provider_session)
        .should('exist')
        .then((c) => {
            cookieB2B = c.toString();
        });
})

beforeEach(() => {
    cy.setCookie(b2b_identity_provider_session, cookieB2B);
    cy.viewport(desktopWidth, desktopHeight);
    cy.visit('/');
});
