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
      playNotificationSound();
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

  const playNotificationSound = () => {
    // const audio = new Audio("/sounds/notificacao.mp3");
    // audio.play();
    // desbloquearSom();
  };

  // const desbloquearSom = () => {
  //   const audio = new Audio("/sounds/notificacao.mp3");

  //   audio
  //     .play()
  //     .then(() => {
  //       console.log("Som autorizado");
  //     })
  //     .catch((err) => {
  //       console.log("Som não tocou ainda, mas agora está liberado");
  //     });
  //   window.removeEventListener("click", desbloquearSom);
  // };

  // window.addEventListener("click", desbloquearSom);

  // return () => {
  //   window.removeEventListener("click", desbloquearSom);
  // };

  return (
    <s.Container>
      <s.AreaTitulo>
        <s.Titulo>PAINEL DE PEDIDOS</s.Titulo>
      </s.AreaTitulo>
      <s.Grid>
        {statuses
          .filter((status) => status !== "finalizado")
          .filter((status) => status !== "cancelado")
          .map((status) => (
            <s.Coluna Coluna key={status}>
              <s.StatusTitle>{status.toUpperCase()}</s.StatusTitle>
              {pedidos
                .filter((p) => p.status === status)
                .map((pedido) => (
                  <s.Card key={pedido.id}>
                    <s.Area>
                      <s.TitleNome>{pedido.cliente.nome}</s.TitleNome>
                    </s.Area>
                    <s.AreaSub>
                      <s.Descricao>Tel: {pedido.cliente.telefone}</s.Descricao>
                      <s.Descricao>
                        Data:
                        {moment(pedido.data).format("DD/MM/YYYY HH:mm")}
                      </s.Descricao>
                    </s.AreaSub>
                    <s.AreaSub>
                      <s.Descricao>
                        Forma pagamento: {pedido.pagamento}
                      </s.Descricao>
                      <s.Descricao>Troco: {pedido.troco.valor}</s.Descricao>
                    </s.AreaSub>
                    <s.Descricao>
                      Entregar? {""}
                      {pedido.tipoEntrega === "entrega" ? "Sim" : "Não"}
                    </s.Descricao>
                    <s.DescricaoValor>
                      Total:{" "}
                      {pedido.total.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </s.DescricaoValor>
                    <s.Divisao></s.Divisao>
                    <s.Area>
                      <s.TitleNome>Endereço</s.TitleNome>
                    </s.Area>
                    {/* <s.AreaSub> */}
                    <s.Descricao>
                      Rua: {pedido.cliente.rua}, {pedido.cliente.numero},
                      {pedido.cliente.bairro}, {pedido.cliente.cidade}
                    </s.Descricao>
                    <s.Descricao>
                      Referencia : {pedido.cliente.referencia}
                    </s.Descricao>
                    {/* </s.AreaSub> */}
                    <s.Divisao></s.Divisao>
                    <s.Area>
                      <s.TitleNome>Itens</s.TitleNome>
                    </s.Area>
                    {pedido.itens.map((item, index) => (
                      <>
                        <s.LiCard key={index}>
                          {item.quantidade}x {item.nome} / {item.tipoQueijo}
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
                        <s.Descricao>
                          {item.observacao ? "Observação: " : ""}
                          {item.observacao}
                        </s.Descricao>
                      </>
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
