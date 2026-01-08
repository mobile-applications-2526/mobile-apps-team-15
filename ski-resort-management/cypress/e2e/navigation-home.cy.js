describe("Navigation - Home flows", () => {
    it("can open slopes from favorite slope on home screen", () => {
        cy.visit("/(tabs)/");
        cy.get('[data-testid="screen-home"]').should("be.visible");

        cy.get('[data-testid="btn-favorite-slope"]').click();
        cy.get('[data-testid="screen-slopes"]').should("be.visible");
    });
    it("can open skipass shop on home screen", () => {
        cy.visit("/(tabs)/");
        cy.get('[data-testid="screen-home"]').should("be.visible");

        cy.get('[data-testid="skipass-button"]').click();
        cy.get('[data-testid="screen-shop-skipass"]').should("be.visible");
    });
});
