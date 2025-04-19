import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import moment from "moment";
import { colors } from "./../../Styles";

const RelatorioContainer = styled.div`
  padding: 1rem;
  /* max-width: 1200px; */
  margin: auto;
  background-color: ${colors.cinza_leve};
`;

const FiltroContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

const Botao = styled.button`
  padding: 0.5rem 1rem;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;

const Titulo = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const Tabela = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
`;

const Th = styled.th`
  padding: 0.75rem;
  background: #f7f7f7;
  border-bottom: 1px solid #ddd;
  text-align: left;
`;

const Td = styled.td`
  padding: 0.75rem;
  border-bottom: 1px solid #eee;
`;

const Total = styled.div`
  margin-top: 1rem;
  font-size: 1.2rem;
  font-weight: bold;
  text-align: right;
`;

const RelatorioPedidos = () => {
  const [pedidos, setPedidos] = useState([]);
  const [pedidosFiltrados, setPedidosFiltrados] = useState([]);
  const [dataInicio, setDataInicio] = useState(moment().format("YYYY-MM-DD"));
  const [dataFim, setDataFim] = useState(moment().format("YYYY-MM-DD"));

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "pedidos"), (snapshot) => {
      const dados = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setPedidos(dados);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    aplicarFiltro();
  }, [pedidos]);

  const aplicarFiltro = () => {
    if (!pedidos || pedidos.length === 0) return;

    const filtrados = pedidos.filter((pedido) => {
      const dataPedido = moment(pedido.data);
      if (dataInicio && dataPedido.isBefore(moment(dataInicio))) return false;
      if (dataFim && dataPedido.isAfter(moment(dataFim).endOf("day")))
        return false;
      return true;
    });

    setPedidosFiltrados(filtrados);
  };

  const totalGeral = pedidosFiltrados.reduce(
    (acc, pedido) => acc + (pedido.total || 0),
    0
  );

  const exportarCSV = () => {
    const csv = [
      ["Data", "Cliente", "Itens", "Status", "Total"],
      ...pedidosFiltrados.map((p) => [
        moment(p.data).format("DD/MM/YYYY HH:mm"),
        p.cliente,
        p.itens.map((i) => i.nome).join(", "),
        p.status,
        p.total?.toFixed(2),
      ]),
    ]
      .map((linha) => linha.join(";"))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "relatorio_pedidos.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <RelatorioContainer>
      <Titulo>Relatório de Pedidos</Titulo>
      <FiltroContainer>
        <Input
          type="date"
          value={dataInicio}
          onChange={(e) => setDataInicio(e.target.value)}
        />
        <Input
          type="date"
          value={dataFim}
          onChange={(e) => setDataFim(e.target.value)}
        />
        <Botao onClick={aplicarFiltro}>Pesquisar</Botao>
        <Botao onClick={exportarCSV}>Exportar CSV</Botao>
      </FiltroContainer>
      <Tabela>
        <thead>
          <tr>
            <Th>Data</Th>
            <Th>Cliente</Th>
            <Th>Itens</Th>
            <Th>Status</Th>
            <Th>Total (R$)</Th>
          </tr>
        </thead>
        <tbody>
          {pedidosFiltrados.map((p) => (
            <tr key={p.id}>
              <Td>{moment(p.data).format("DD/MM/YYYY HH:mm")}</Td>
              <Td>{p.cliente.nome}</Td>
              <Td>{p.itens.map((i) => i.nome).join(", ")}</Td>
              <Td>{p.status}</Td>
              <Td>{p.total?.toFixed(2)}</Td>
            </tr>
          ))}
        </tbody>
      </Tabela>
      <Total>Total Geral: R$ {totalGeral.toFixed(2)}</Total>
    </RelatorioContainer>
  );
};

export default RelatorioPedidos;
