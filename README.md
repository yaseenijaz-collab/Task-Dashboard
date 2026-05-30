# Azure Task Reporting System

A futuristic, high-fidelity internal enterprise web application for Azure DevOps task reporting simulation.

## Features

- **Executive Dashboard**: KPI cards with trend indicators, Sprint Burndown (Area Chart), and Workload Distribution (Bar Chart).
- **Task Inventory**: High-density data table with multi-parameter filtering, sorting, and pagination.
- **Detailed Task View**: Glassmorphic modal with rich description, activity timeline, attachment grid, and time tracking.
- **Team Analytics**: User-wise productivity reporting with efficacy index and workload analysis.
- **Authentication**: Simulated login with role-based UI.
- **Exporting**: Task inventory export to CSV.
- **Notifications**: Real-time alert simulation.

## Tech Stack

- **Frontend**: React 18, Vite, TypeScript
- **Styling**: Tailwind CSS (Custom Dark Theme)
- **Icons**: Lucide React
- **Analytics**: Recharts
- **Animations**: Tailwind Animate / Framer Motion
- **Data**: Local Mock JSON Service

## Project Structure

- \`src/components\`: Reusable UI components (Layout, Modal, Notifications).
- \`src/pages\`: Main view components (Dashboard, Tasks, Reporting, Login).
- \`src/services\`: Mock API abstraction layer.
- \`src/context\`: Auth and Global state.
- \`src/data\`: Mock dataset generation script and output.
- \`src/types\`: TypeScript interfaces.
- \`src/utils\`: Helper functions (Export, etc.).

## Deployment

1. Install dependencies: \`npm install\`
2. Build the project: \`npm run build\`
3. Deploy the \`dist\` folder to Vercel or Netlify.

## Azure DevOps Integration Approach

To transition this to a real integration:
1. Replace \`mockApi.ts\` with a service using \`azure-devops-node-api\`.
2. Implement OAuth2 flow using Azure Active Directory (MSAL).
3. Map Azure DevOps Work Item fields to the application's Task interface.
4. Utilize Azure DevOps Webhooks to push real-time updates to the notification system.

## Google Stitch Prompts Used

- "Build a complete production-ready 'Azure Task Reporting Dashboard'..."
- "Build a production-ready 'Task Management Table'..."
- "Build a detailed 'Task Detail View'..."
- "Build a 'Team Analytics & Reporting' page..."
- "Build a 'Login Page' for the Azure Task Reporting System..."
