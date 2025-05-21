# Tax Loss Harvesting Tool

A responsive React application for tax loss harvesting optimization. This tool helps users visualize and manage their cryptocurrency capital gains and losses for tax purposes.

## Features

- Display capital gains (pre and post harvesting)
- Interactive holdings table with selectable assets
- Real-time updates of capital gains based on selected holdings
- Responsive design for both desktop and mobile views
- Tax savings calculation and visualization

## Setup Instructions

1. Clone the repository:
```bash
git clone <repository-url>
cd <repository-name>
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The application will be available at `http://localhost:3000`

## Technologies Used

- React
- Material-UI
- CSS (custom styling)

## Project Structure

```
src/
  ├── components/
  │   ├── TaxOptimisation.js
  │   ├── CapitalGainsCard.js
  │   └── HoldingsTable.js
  ├── services/
  │   └── api.js
  ├── styles/
  │   ├── TaxOptimisation.css
  │   ├── CapitalGainsCard.css
  │   └── HoldingsTable.css
  ├── App.js
  └── App.css
```

## Assumptions

1. The mock API data is stored locally in the application for demonstration purposes.
2. All calculations are performed on the client side.
3. Currency values are displayed in USD.
4. Holdings are initially limited to 10 items with a "View All" option.

## Future Improvements

1. Add real API integration
2. Implement user authentication
3. Add more detailed transaction history
4. Implement data persistence
5. Add export functionality for tax reports
