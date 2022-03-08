import React, { FC, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import './App.css';
import CustomSnackbar from './components/CustomSnackBar';
import Home from './pages/Home';
import Login from './pages/Login';
import { LogContextProvider } from './utils/LogContext';

const App: FC = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState(1);

  const updateOpen = (update: boolean) => {
    setOpen(update);
  };

  const updateMessage = (update: string) => {
    setMessage(update);
  };

  const updateSeverity = (update: number) => {
    setSeverity(update);
  };

  const LogContextValue = {
    open, message, updateOpen, updateMessage, severity, updateSeverity
  };

  return (
    <LogContextProvider value={LogContextValue}>
      <CustomSnackbar />
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </LogContextProvider>
  );
};
export default App;
