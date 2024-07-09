import "./App.css";
import { QueryClientProvider } from "@tanstack/react-query";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users.jsx";
import Tasks from "./pages/Tasks.jsx";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/ui/Layout";
import Welcome from "./pages/Welcome";
import UserRole from "./pages/UserRole";
import { queryClient } from "./lib/queryClient.js";
import { TaskProvider } from "./store/TaskContext";
import TaskDetails from "./pages/TaskDetails.jsx";

function App() {
  return (
    <div className="h-screen bg-background">
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <TaskProvider>
            <Routes>
              <Route path="/" element={<Welcome />} />
              <Route path="/role" element={<UserRole />} />
              {
                <Route element={<Layout />}>
                  <Route index path="/dashboard" element={<Dashboard />} />
                  <Route path="/tasks" element={<Tasks />} />
                  <Route path="/task/:id" element={<TaskDetails />} />
                  <Route path="/team" element={<Users />} />
                </Route>
              }
            </Routes>
          </TaskProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
