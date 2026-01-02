describe("Slopes tab - basic flows", () => {
    beforeEach(() => {
        cy.visit("/slopes");
        cy.get('[data-testid="screen-slopes"]').should("be.visible");
    });

    it("filters slopes using search", () => {
        cy.get('[data-testid="input-slopes-search"]').type("Eagle");

        //Dit kan mometenteel makkelijk getest worden omdat data hardcoded is. Eenmaal link met backend moet dit misschien anders (tenzij we mocken)
        cy.contains("Eagle Pass").should("be.visible");
        cy.contains("Bluebird Ridge").should("not.exist");
    });

    it("can expand a slope card (toggle)", () => {
        cy.contains("Bluebird Ridge").click();

        // Check dat iets uit de description zichtbaar wordt wanneer expanded
        cy.contains("Weather").should("be.visible");

        // Klik opnieuw → description verdwijnt (als je UI zo werkt)
        cy.contains("Bluebird Ridge").click();
        cy.contains("Weather").should("not.exist");
    });
});
