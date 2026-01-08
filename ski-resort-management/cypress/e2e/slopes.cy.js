describe("Slopes tab - basic flows", () => {
    beforeEach(() => {
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

    afterEach(() => {
        cy.visit("/(tabs)/")
        cy.wait(1000);
        cy.get('button[aria-label="Account"]').should('be.visible').click();
        cy.wait(1000);
        cy.get('[data-testid="logout-button"]').should('be.visible').click();
        cy.wait(1000);
        cy.get('[data-testid="landing-screen"]').should("be.visible");
    })

    it("filters slopes using search", () => {
        cy.wait(2000)
        cy.get('[data-testid="input-slopes-search"]').type("Green");

        cy.contains("Green Valley").should("be.visible");
        cy.contains("Blue Ridge").should("not.exist");
    });

    it("can expand a slope card (toggle)", () => {
        cy.wait(2000);
        cy.get('[data-testid="expand-slope-btn"]').first().click();

        // Check dat iets uit de description zichtbaar wordt wanneer expanded
        cy.contains("Weather").should("be.visible");

        // Klik opnieuw → description verdwijnt (als je UI zo werkt)
        cy.get('[data-testid="expand-slope-btn"]').first().click();
        cy.contains("Weather").should("not.exist");
    });
});
