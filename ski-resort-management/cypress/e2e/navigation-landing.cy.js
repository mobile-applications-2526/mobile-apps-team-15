describe("Navigation - Landing page flow", () => {
    let random;
    let email;
    const password = 'Password123!';

    before(() => {
        random = Math.random().toString(36).substring(2, 8);
        email = `john.doe.cypress+${random}@example.com`;
    });

    it("Can visit landing page", () => {
        cy.visit("/");
        cy.get('[data-testid="landing-screen"]').should("be.visible");
        cy.get('[data-testid="register-button"]').should("be.visible");
        cy.get('[data-testid="login-button"]').should("be.visible");
    });

    it("Can register user", () => {
        cy.visit("/");
        cy.get('[data-testid="register-button"]').click();
        cy.get('[data-testid="register-first-name"]').should("be.visible");
        cy.get('[data-testid="register-first-name"]').type('John');
        cy.get('[data-testid="register-last-name"]').type('Doe');
        cy.get('[data-testid="register-email"]').type(email);
        cy.get('[data-testid="register-password"]').type(password);
        cy.get('[data-testid="register-password-confirmation"]').type(password);
        cy.get('[data-testid="submit-button"]').click();
        cy.wait(1000);
        cy.get('button[aria-label="Account"]').should('be.visible').click();
        cy.wait(1000);
        cy.get('[data-testid="logout-button"]').should('be.visible').click();
        cy.wait(1000);
        cy.get('[data-testid="landing-screen"]').should("be.visible");
    });

    it("Can login user", () => {
        cy.visit("/");
        cy.get('[data-testid="login-button"]').click();
        cy.get('[data-testid="login-email"]').should('be.visible');
        cy.get('[data-testid="login-email"]').type(email);
        cy.get('[data-testid="login-password"]').type(password);
        cy.get('[data-testid="login-button-2"]').click();
        cy.get('[data-testid="screen-home"]').should('be.visible');
        cy.wait(1000);
        cy.get('button[aria-label="Account"]').should('be.visible').click();
        cy.wait(1000);
        cy.get('[data-testid="logout-button"]').should('be.visible').click();
        cy.wait(1000);
        cy.get('[data-testid="landing-screen"]').should("be.visible");
    });
});
