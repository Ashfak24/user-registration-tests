describe("Home Page Smoke Test", () => {
  it("loads core components without errors", () => {
    // 1. Navigate + verify URL/Title
    cy.visit("https://automationexercise.com/");
    cy.url().should("include", "automationexercise");
    cy.title().should("eq", "Automation Exercise");

    // 2. Verify critical UI (header + nav)
    cy.get(".header-middle, .nav.navbar-nav").should("be.visible");

    // 3. Check 1-2 key content markers
    cy.get("h1").should("contain", "Automation", "Exercise").and("be.visible");

    // Negative assertion
    cy.get(".error-message").should("not.exist");
  });
});
