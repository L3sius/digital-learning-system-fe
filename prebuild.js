const fs = require("fs");

// Read the Heroku environment variable or use a default value
const backendUrl = process.env.BACKEND_URL || "http://localhost:8080";

// Create the content for the environment file
const content = `
export const environment = {
  production: true,
  backendUrl: '${backendUrl}'
};
`;

// Write the environment file
fs.writeFileSync("./src/environments/environment.ts", content);
