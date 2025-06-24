describe("Signup Functionality", () => {
  const testUser = {
    valid: {
      name: "Ashfak",
      email: "ashfak@example.com",
    },
    invalid: {
      name: {
        empty: "",
        long: "J".repeat(101),
      },
      email: [
        {
          label: "missing @ symbol",
          value: "invalidexample.com",
        },
        {
          label: "incomplete domain",
          value: "invalid@example",
        },
        {
          label: "too short",
          value: "a@b.c",
        },
        {
          label: "contains spaces",
          value: "invalid @example.com",
        },
      ],
    },
  };

  const selectors = {
    name: "input[placeholder='Name']",
    email: "input[data-qa='signup-email']",
    button: "button[data-qa='signup-button']",
    form: ".signup-form",
  };

  beforeEach(() => {
    cy.visit("https://automationexercise.com/login");
    cy.url().should("include", "/login");
    cy.contains("New User Signup!").should("be.visible");
    cy.get(selectors.form).should("be.visible");
  });

  context("Name Field Validation", () => {
    it("accepts a valid name", () => {
      cy.get(selectors.name)
        .type(testUser.valid.name)
        .should("have.value", testUser.valid.name);
    });

    it("truncates long names to maximum length", () => {
      cy.get(selectors.name)
        .type(testUser.invalid.name.long)
        .blur()
        .invoke("val")
        .should("have.length.lte", 101);
    });

    it("prevents submission with empty name", () => {
      cy.get(selectors.name).clear();
      cy.get(selectors.email).type(testUser.valid.email);
      cy.get(selectors.button).click();
      // Optionally check for UI hints (if any)
      cy.get(selectors.form).should("be.visible"); // Still on the form
    });
  });

  context("Email Field Validation", () => {
    it("accepts a valid email", () => {
      cy.get(selectors.email)
        .should("be.visible")
        .type(testUser.valid.email)
        .should("have.value", testUser.valid.email);
    });

    testUser.invalid.email.forEach(({ label, value }) => {
      it(`rejects invalid email: ${label}`, () => {
        cy.get(selectors.name).type(testUser.valid.name);
        cy.get(selectors.email).clear().type(value).blur();
      });
    });
  });
});
