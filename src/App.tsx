import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { db } from "./firebase";
import Home from "./pages/Home";
import { Dashboard } from "./pages/Dashboard";

console.log("Firestore instance:", db);

export default function App() {
  const [transactions, setTransactions] = useState<any[] | null>(null);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Home onParsed={setTransactions} />}
        />
        <Route
          path="/dashboard"
          element={<Dashboard transactions={transactions} />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
