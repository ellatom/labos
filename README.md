# LabOs Automation - Ella T

## How to Run Tests  

1. Run tests via GUI on chrome and e2e tests - Open a terminal and run:  
   ```npm run testGui```
   
2. Run tests via terminal - 
   ```npm run testTerminal```

## Project Overview  

### Design Pattern  
- The project follows the **Page Object Model (POM)** design pattern.  
- Each page contains its **selectors and functions** relevant to that page.  
- A **base class (`Page`)** is used, which is inherited by other pages for reusability.  

### Configuration & Security  
- The `.env` file is added to `.gitignore` to prevent exposing sensitive information (e.g., usernames and passwords) on GitHub.  

### Project Structure  

#### Fixtures (`cypress/fixtures/`)  
Contains test data used in different scenarios:  
- **`users.json`** → Includes multiple test users for login scenarios.  
- **`orders.json`** → Contains sample order data for order creation tests.  

#### Configuration (`cypress.config.js`)  
- Various **timeouts** have been defined to handle page load delays for example, 
  - `visit()`  
  - `intercept()`  
  - `wait()`  

This ensures smoother test execution, especially for pages that take longer to load.  

- There are 2 retries to re-run the entire test if fails

---

### Additional Notes  
- Ensure all dependencies are installed before running tests:  
  ``` npm install ```
- Update test data inside the `fixtures/` folder if needed.  
- Cypress test results and logs can be found inside the `cypress/results/` folder after execution.  

---

🚀 **Happy Testing!**

