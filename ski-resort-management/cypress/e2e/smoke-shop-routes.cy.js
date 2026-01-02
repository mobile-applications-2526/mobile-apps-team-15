describe("Smoke - Shop routes", () => {
    const cases = [
        ["/shop", "screen-shop"],
        ["/shop/materials", "screen-shop-materials"],
        ["/shop/materials-checkout", "screen-shop-materials-checkout"],
        ["/shop/skipass", "screen-shop-skipass"],
        ["/shop/skipasscheckout", "screen-shop-skipasscheckout"],
        ["/shop/add-to-cart", "screen-shop-add-to-cart"],
        ["/shop/payment-complete", "screen-shop-payment-complete"],
    ];

    cases.forEach(([path, testId]) => {
        it(`loads ${path}`, () => {
            cy.visit(path);
            cy.get(`[data-testid="${testId}"]`).should("be.visible");
        });
    });
});
