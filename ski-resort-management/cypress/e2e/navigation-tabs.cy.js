describe("Navigation - tab bar", () => {
    it("can switch between tabs using the tab bar", () => {
        cy.visit("/(tabs)/");
        cy.get('[data-testid="screen-home"]').should("be.visible");

        cy.contains("slopes").click();
        cy.get('[data-testid="screen-slopes"]').should("be.visible");

        cy.contains("Shop").click();
        cy.get('[data-testid="screen-shop"]').should("be.visible");

        cy.contains("qrcode").click();
        cy.get('[data-testid="screen-qrcode"]').should("be.visible");

        cy.contains("Home").click();
        cy.get('[data-testid="screen-home"]').should("be.visible");
    });
});
