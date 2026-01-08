describe("Smoke tests - Tabs", () => {

    before(() => {
        let random = Math.random().toString(36).substring(2, 8);
        let email = `john.doe.cypress+${random}@example.com`;
        cy.visit("/");
        cy.get('[data-testid="register-button"]').click();
        cy.get('[data-testid="register-first-name"]').should("be.visible");
        cy.get('[data-testid="register-first-name"]').type('John');
        cy.get('[data-testid="register-last-name"]').type('Doe');
        cy.get('[data-testid="register-email"]').type(email);
        cy.get('[data-testid="register-password"]').type('Password123!');
        cy.get('[data-testid="register-password-confirmation"]').type('Password123!');
        cy.get('[data-testid="submit-button"]').click();
        cy.wait(1000);
        cy.visit("/slopes");
        cy.get('[data-testid="screen-slopes"]').should("be.visible");
    });

    after(() => {
        cy.visit("/(tabs)/")
        cy.wait(1000);
        cy.get('button[aria-label="Account"]').should('be.visible').click();
        cy.wait(1000);
        cy.get('[data-testid="logout-button"]').should('be.visible').click();
        cy.wait(1000);
        cy.get('[data-testid="landing-screen"]').should("be.visible");
    });

    it("Home tab loads", () => {
        cy.visit("/");
        cy.get('[data-testid="screen-home"]').should("be.visible");
    });

    it("Slopes tab loads", () => {
        cy.visit("/slopes");
        cy.get('[data-testid="screen-slopes"]').should("be.visible");
    });

    it("Shop tab loads", () => {
        cy.visit("/shop");
        cy.get('[data-testid="screen-shop"]').should("be.visible");
    });

    it("QR Code tab loads", () => {
        cy.visit("/qrcode");
        cy.get('[data-testid="screen-qrcode"]').should("be.visible");
    });
});
