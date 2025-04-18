import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { db } from "../../firebase"; // importa a instância do Firebase
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import * as s from "./styles";
import moment from "moment/moment";
import { color } from "framer-motion";

const statuses = ["pendente", "preparando", "rota", "finalizado", "cancelado"];

const PainelPedidos = () => {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "pedidos"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setPedidos(data);
    });

    return () => unsubscribe(); // importante limpar o listener quando desmontar
  }, []);

  const mudarStatus = async (pedidoId, novoStatus) => {
    const pedidoRef = doc(db, "pedidos", pedidoId);
    await updateDoc(pedidoRef, { status: novoStatus });
    setPedidos((prev) =>
      prev.map((p) => (p.id === pedidoId ? { ...p, status: novoStatus } : p))
    );
  };

  const formatarData = (timestamp) => {
    if (!timestamp?.seconds) return "";
    const data = new Date(timestamp.seconds * 1000);
    return data.toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatarDataMoment = (timestamp) => {
    if (!timestamp?.seconds) return "";
    const date = new Date(timestamp.seconds * 1000); // Converte o timestamp do Firebase
    return moment(date).format("DD/MM/YYYY HH:mm");
  };

  return (
    <s.Container>
      <s.Titulo>PAINEL DE PEDIDOS</s.Titulo>
      <s.Grid>
        {statuses.map((status) => (
          <s.Coluna Coluna key={status}>
            <s.StatusTitle>{status.toUpperCase()}</s.StatusTitle>
            {pedidos
              .filter((p) => p.status === status)
              .map((pedido) => (
                <s.Card key={pedido.id}>
                  {/* <h4>#{pedido.id}</h4> */}
                  <s.TitleNome>{pedido.cliente.nome}</s.TitleNome>
                  <s.Descricao>Tel: {pedido.cliente.telefone}</s.Descricao>
                  <s.Descricao>
                    Data:
                    {moment(pedido.data).format("DD/MM/YYYY HH:mm")}
                  </s.Descricao>
                  <s.Descricao>Forma pagamento: {pedido.pagamento}</s.Descricao>
                  <s.Descricao>Troco: {pedido.troco.valor}</s.Descricao>
                  <s.TitleNome>
                    Total:{" "}
                    {pedido.total.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </s.TitleNome>
                  <s.Divisao></s.Divisao>
                  <s.Descricao>Rua: {pedido.cliente.rua}</s.Descricao>
                  <s.Descricao>Nº : {pedido.cliente.numero}</s.Descricao>
                  <s.Descricao>Bairro : {pedido.cliente.bairro}</s.Descricao>
                  <s.Descricao>
                    Referencia : {pedido.cliente.referencia}
                  </s.Descricao>
                  <s.Divisao></s.Divisao>

                  {pedido.itens.map((item, index) => (
                    <s.LiCard key={index}>
                      {item.quantidade}x {item.nome}
                      {item.adicionais
                        .filter((add) => add.quantidade > 0)
                        .map((add, indexa) => (
                          <s.UlCard>
                            <s.LiCardAdicional key={indexa}>
                              {add.quantidade}x {add.nome}
                            </s.LiCardAdicional>
                            {/* <s.Descricao>Obs: {add.observacao}</s.Descricao>                          */}
                          </s.UlCard>
                        ))}
                    </s.LiCard>
                  ))}

                  <s.Select
                    value={pedido.status}
                    onChange={(e) => mudarStatus(pedido.id, e.target.value)}
                  >
                    {statuses.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </s.Select>
                </s.Card>
              ))}
          </s.Coluna>
        ))}
      </s.Grid>
    </s.Container>
  );
};

export default PainelPedidos;
