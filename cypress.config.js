import { defineConfig } from "cypress";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
    e2e: {
        setupNodeEvents(on, config) {
            // Add any event listeners here
        },
        baseUrl: "https://qa-candidates.labos.cloud/2",

        env: {
            USER_NAME: process.env.USER_NAME,
            PASSWORD: process.env.PASSWORD
        }
        ,
        defaultCommandTimeout: 100000,
        pageLoadTimeout: 100000,
        requestTimeout: 100000,
        browser: "chrome",
        retries: 2,
    },
});
