// You can use this file to test the rate limit functionality of the application in local env.

const axios = require("axios");

const url = "http://localhost:3000/api/tasks/";
const authToken = "PASTE YOUR AUTH TOKEN";

async function makeRequests() {
  for (let i = 0; i < 101; i++) {
    try {
      const startTime = Date.now();

      const response = await axios.get(url, {
        headers: {
          Authorization: `${authToken}`,
        },
      });

      const endTime = Date.now();
      const duration = endTime - startTime;

      console.log(`\nRequest ${i + 1}:`);
      console.log("Response Status:", response.status);
      console.log("Response Data:", response.data);
      console.log("Time taken:", duration, "ms");
    } catch (error) {
      console.error(`\nRequest ${i + 1} failed:`);
      console.error("Error Status:", error.response?.status);
      console.error("Error Data:", error.response?.data || error.message);
    }
  }
}

makeRequests();
