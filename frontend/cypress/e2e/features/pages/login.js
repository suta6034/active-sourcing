export class Login { 

    acceptCookies() {
        cy.get('#onetrust-accept-btn-handler')
          .click();
    }

    enterUsername(text) {
        cy.get(':nth-child(1) > .el-form-item__content > .el-input > .el-input__inner')
          .type(text);

    }

    enterPassword(text) {
        cy.get(':nth-child(2) > .el-form-item__content > .el-input > .el-input__inner')
          .type(text);

    }

    clickLoginButton() {
        cy.get('button:contains("Jetzt anmelden")')
        .click();
    
    } 
    }