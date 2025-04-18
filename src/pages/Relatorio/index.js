import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  collection,
  query,
  where,
  onSnapshot,
  getDocs,
  orderBy,
  Timestamp,
} from "firebase/firestore";
import { db } from "../../firebase";

const Container = styled.div`
  background: #fff4e6;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  font-family: "Poppins", sans-serif;
`;

const Titulo = styled.h2`
  margin-bottom: 1.5rem;
  color: #2d6a4f;
`;

const Filtro = styled.div`
  margin-bottom: 1rem;
`;

const Tabela = styled.table`
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    border: 1px solid #ddd;
    padding: 0.75rem;
    text-align: center;
  }

  th {
    background-color: #ffe8cc;
  }
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

export default function RelatorioMovimentacao() {
  const [dataSelecionada, setDataSelecionada] = useState("");
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    const buscarPedidos = async () => {
      if (!dataSelecionada) return;

      const [ano, mes, dia] = dataSelecionada.split("-");
      const inicio = new Date(ano, mes - 1, dia, 0, 0, 0);
      const fim = new Date(ano, mes - 1, dia, 23, 59, 59);

      const q = query(
        collection(db, "pedidos"),
        where("status", "==", "finalizado"),
        where("data", ">=", Timestamp.fromDate(inicio)),
        where("data", "<=", Timestamp.fromDate(fim)),
        orderBy("data")
      );

      const snapshot = await getDocs(q);
      const docs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setPedidos(docs);
    };

    buscarPedidos();
  }, [dataSelecionada]);

  const totais = pedidos.reduce(
    (acc, pedido) => {
      if (pedido.pagamento === "pix") acc.pix += pedido.total;
      else if (pedido.pagamento === "cartão") acc.cartao += pedido.total;
      else if (pedido.pagamento === "dinheiro") acc.dinheiro += pedido.total;
      return acc;
    },
    { pix: 0, cartao: 0, dinheiro: 0 }
  );

  return (
    <Container>
      <Titulo>📆 Relatório de Movimentações</Titulo>

      <Filtro>
        <label htmlFor="data">Selecionar data: </label>
        <Input
          type="date"
          id="data"
          value={dataSelecionada}
          onChange={(e) => setDataSelecionada(e.target.value)}
        />
      </Filtro>

      {dataSelecionada && (
        <>
          <Tabela>
            <thead>
              <tr>
                <th>ID</th>
                <th>Cliente</th>
                <th>Pagamento</th>
                <th>Total</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {pedidos.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.cliente}</td>
                  <td>{p.pagamento}</td>
                  <td>R$ {p.total.toFixed(2)}</td>
                  <td>{p.status}</td>
                </tr>
              ))}
            </tbody>
          </Tabela>

          <h3 style={{ marginTop: "2rem" }}>📊 Totais do Dia</h3>
          <ul>
            <li>
              <strong>💳 Cartão:</strong> R$ {totais.cartao.toFixed(2)}
            </li>
            <li>
              <strong>🏦 Pix:</strong> R$ {totais.pix.toFixed(2)}
            </li>
            <li>
              <strong>💵 Dinheiro:</strong> R$ {totais.dinheiro.toFixed(2)}
            </li>
            <li>
              <strong>🔢 Total Geral:</strong> R${" "}
              {(totais.cartao + totais.pix + totais.dinheiro).toFixed(2)}
            </li>
          </ul>
        </>
      )}
    </Container>
  );
}
