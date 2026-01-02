const { defineConfig } = require("cypress");

// Gaat zowel met TS als met JS. We gebruiken JS. Meest gebruikt voor cypress, minste setup en geen extra configuratie.
module.exports = defineConfig({
    e2e: {
        baseUrl: "http://localhost:8081",
    },
});
