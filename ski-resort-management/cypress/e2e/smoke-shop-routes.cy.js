describe("Smoke - Shop routes", () => {

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

    const cases = [
        ["/shop", "screen-shop"],
        ["/shop/materials", "screen-shop-materials"],
        ["/shop/materials/cart", "screen-shop-materials-cart"],
        ["/shop/materials/add-to-cart", "screen-shop-add-to-cart"],
        ["/shop/skipass", "screen-shop-skipass"],
        ["/shop/skipasscheckout", "screen-shop-skipasscheckout"],
        ["/shop/payment-complete", "screen-shop-payment-complete"],
    ];

    it("Can visit landing page", () => {
        cy.visit("/");
        cy.get('[data-testid="landing-screen"]').should("be.visible");
        cy.get('[data-testid="register-button"]').should("be.visible");
        cy.get('[data-testid="login-button"]').should("be.visible");
    });

    cases.forEach(([path, testId]) => {
        it(`loads ${path}`, () => {
            cy.visit(path);
            cy.get(`[data-testid="${testId}"]`).should("be.visible");
        });
    });
});
