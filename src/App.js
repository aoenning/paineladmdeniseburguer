import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Pedidos from "./pages/Pedidos";
import CadastroProduto from "./pages/CadastroProduto";
import Layout from "./components/Layout";
import { loginUnico } from "./auth";

function App() {
  useEffect(() => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);
  loginUnico();
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Pedidos />} />
          <Route path="/cadastro" element={<CadastroProduto />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
