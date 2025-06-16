You are an expert full-stack developer. Your task is to build a “Spendwise AI” web app from scratch with real file parsing and data visualization. Focus on getting every piece working; we’ll polish the UI later. Use React (Vite + TypeScript) for the frontend, Firebase (Firestore, Storage, Cloud Functions) for the backend, and Tailwind CSS for basic styling.

1. Project Setup
   • Run: `npm create vite@latest spendwise-ai -- --template react-ts`
   • Install dependencies:
     ```
     npm install react-router-dom@6 firebase axios recharts tailwindcss postcss autoprefixer
     npx tailwindcss init -p
     ```
   • Configure Tailwind: set `content` in `tailwind.config.js` to `["./src/**/*.{ts,tsx}"]`.

2. Firebase Configuration
   • In Firebase console, create a new project “project-spend-wise”.
   • Enable Firestore in test mode and Cloud Storage.
   • Create a Cloud Function named `parseFinancials` (HTTP-trigger).
   • In your React app, add `.env.local` with all `VITE_FIREBASE_*` and `VITE_PARSE_URL=https://<region>-<project>.cloudfunctions.net/parseFinancials`.

3. Frontend: File Upload & Parsing
   • In `src/firebase.ts`, initialize Firebase app, Storage, and Firestore exports.
   • Create `src/pages/Home.tsx`:
     – Show a file picker that accepts PDF, CSV, XLSX.
     – On submit, upload files to Storage, then POST the Storage URLs to `VITE_PARSE_URL`.
     – Receive `transactions: { date, description, amount, category }[]`.
     – Save parsed transactions to Firestore under the user’s collection.

4. Cloud Function: parseFinancials
   • In `functions/src/index.ts`:
     – Use Busboy to receive multipart file uploads.
     – For each file: detect type by extension.
       • CSV: use PapaParse.
       • XLSX: use XLSX library.
       • PDF: use pdf-parse to extract text, then regex to parse date/amount lines.
     – Normalize into `{ date: ISOString, description: string, amount: number }`.
     – Return JSON `{ transactions }`.
   • Write unit tests for each parser.

5. Dashboard & Data Storage
   • In `src/pages/Dashboard.tsx`:
     – On mount, read `transactions` from Firestore.
     – Aggregate by month, category.
     – Render charts using Recharts:
       • Line chart of monthly spending.
       • Pie chart of category breakdown.
   • Allow user to delete or re-upload individual transactions.

6. AI Insights (Optional to add now)
   • In Cloud Function after parsing, call OpenRouter or OpenAI API:
     – Summarize total spend, top 3 categories, and unusual transaction alerts.
     – Store summary in Firestore.
   • In Dashboard, display that summary in a card.

7. Routing & State
   • In `src/App.tsx`, wrap `<Routes>` in `<BrowserRouter>`.
   • Pass `onParsed` handler from Home to App state.
   • Redirect to `/dashboard` once parsing completes.

8. Error Handling & Validation
   • Show progress spinners during upload/parse.
   • Display user-friendly error messages on network or parse failures.
   • Ensure files >5 MB are rejected with an alert.

9. Final Steps
   • Deploy Cloud Functions: `firebase deploy --only functions`.
   • Deploy React: build static and host on Firebase Hosting.
   • Write README with setup instructions and environment variables.

When you’re done scaffolding these files and functions, stop and run the app end-to-end to confirm real parsing and charting work. Don’t generate any mock data—every file must actually parse and display.
