import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Pedidos from "./pages/Pedidos";
import CadastroProduto from "./pages/CadastroProduto";
import Caixa from "./pages/Caixa";
import Layout from "./components/Layout";
import RelatorioMovimentacao from "./pages/Relatorio";
import PainelPedidos from "./pages/PainelPedidos";
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
          {/* <Route path="/" element={<Pedidos />} /> */}
          <Route path="/" element={<PainelPedidos />} />
          <Route path="/cadastro" element={<CadastroProduto />} />
          <Route path="/caixa" element={<Caixa />} />
          <Route path="/relatorio" element={<RelatorioMovimentacao />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
