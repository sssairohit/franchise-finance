# Franchise Finance Co. Dashboard Features

This document outlines the features of the mutual fund analysis dashboard.

- **Live Market Data**: The application fetches real-time data from the public `mfapi.in` API, replacing all mock performance data.
- **Accurate Fund Logos**: The dashboard fetches and displays the official, high-quality logos for each fund house, ensuring accurate branding and a professional user interface.
- **Dynamic 1-Year Returns**: The "Return (p.a)" column is now calculated dynamically based on the latest 12-month NAV (Net Asset Value) history for each fund.
- **Calculated Investment Value**: The "Calc. Return" column displays the projected value of a standard ₹10,000 investment over one year, providing an easy comparison metric.
- **Asynchronous Data Fetching**: The app fetches data for all funds concurrently for a fast and responsive user experience, complete with a professional skeleton loader.
- **Error Handling**: If live data fails to load, a user-friendly error message is shown without crashing the application.
- **Interactive Sorting**: All table columns are sortable in both ascending and descending order.
- **Live Filtering**: The table data can be filtered in real-time. The sidebar now includes a filter for minimum Fund Size (AUM).
- **Centralized State Management**: The application state (filters, sorting, data) is managed in the top-level `App` component for a clean data flow.
- **Responsive Layout**: The dashboard is designed to be fully responsive, with collapsible sidebars on smaller screens.
- **Dynamic Table Height**: The main data table expands to fill the entire height of its container, eliminating awkward white space.
- **Bug Fixes**: 
  - Corrected the styling for the text input field in the sidebar.
  - Resolved an initial filtering issue to ensure all funds are displayed by default.