describe("Navigation - Home flows", () => {
    it("can open slopes from favorite slope on home screen", () => {
        cy.visit("/");
        cy.get('[data-testid="screen-home"]').should("be.visible");

        cy.get('[data-testid="btn-favorite-slope"]').click();
        cy.get('[data-testid="screen-slopes"]').should("be.visible");
    });
});
