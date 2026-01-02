describe("Smoke tests - Tabs", () => {
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
