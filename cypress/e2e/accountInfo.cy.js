describe("Account Creation Flow", () => {
  const testUser = {
    name: "Test User",
    email: `testuser${Date.now()}@example.com`,
    password: "SecurePass123!",
    title: "Mr.",
    birthDate: {
      day: "10",
      month: "May",
      year: "1990",
    },
  };

  before(() => {
    // Complete the initial signup process
    cy.visit("https://automationexercise.com/login");
    cy.get('[data-qa="signup-name"]').type(testUser.name);
    cy.get('[data-qa="signup-email"]').type(testUser.email);
    cy.get('[data-qa="signup-button"]').click();
  });

  describe("Account Information Page", () => {
    it("should redirect to account information form after signup", () => {
      // Verify URL and page title
      cy.url().should("include", "/signup");
      cy.contains("h2", "Enter Account Information").should("be.visible");

      // Verify form sections exist
      cy.contains("Title").should("be.visible");
      cy.contains("Name").should("be.visible");
      cy.contains("Email").should("be.visible");
      cy.contains("Password").should("be.visible");
      cy.contains("Date of Birth").should("be.visible");
    });

    it("should require all mandatory fields", () => {
      // Attempt submission with empty form
      cy.get('[data-qa="create-account"]').should("not.be.disabled"); // Some forms don't disable the button

      cy.get('[data-qa="create-account"]').click();
    });
  });
});
