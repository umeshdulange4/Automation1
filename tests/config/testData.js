// Test Configuration and Data
module.exports = {
  // Application URL
  APP_URL: "https://qa-app.grownow.live/login",

  // Test Data
  testData: {
    validCredentials: {
      email: "Umeshdulange4@gmail.com",
      password: "2uEDqMFqvk"
    },
    invalidCredentials: [
      {
        email: "Umesh1990@gmail.com",
        password: "2uEDqMFqvk"
      },
      {
        email: "Umeshdulange4@gmail.com",
        password: "2uEuqMFqvk"
      }
    ]
  },

  // Timeouts
  timeouts: {
    pageLoad: 60000,
    elementWait: 5000
  }
};
