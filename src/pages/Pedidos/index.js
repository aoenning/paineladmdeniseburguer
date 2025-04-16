import { useEffect, useState, useRef } from "react";
import { collection, onSnapshot, updateDoc, doc } from "firebase/firestore";
import { db } from "./../../firebase";
import styled from "styled-components";
import { colors, fonts } from "./../../Styles";
import * as s from "./styles";
import moment from "moment/moment";

export default function Pedidos() {
  const [pedidos, setPedidos] = useState([]);
  const prevPendenteIds = useRef(new Set());

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "pedidos"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setPedidos(data);

      // Notificações para novos pedidos pendentes
      const pendentes = data.filter((p) => p.status === "pendente");
      const novos = pendentes.filter((p) => !prevPendenteIds.current.has(p.id));

      // if (novos.length > 0 && Notification.permission === "granted") {
      //   novos.forEach((pedido) => {
      //     new Notification("Novo Pedido Pendente!", {
      //       body: `Cliente: ${
      //         pedido.cliente
      //       } - Total: R$ ${pedido.total.toFixed(2)}`,
      //     });
      //   });
      // }

      // prevPendenteIds.current = new Set(pendentes.map((p) => p.id));
    });

    return () => unsubscribe();
  }, []);

  const avancarStatus = async (pedido) => {
    let novoStatus = "";

    if (pedido.status === "pendente") novoStatus = "preparando";
    else if (pedido.status === "preparando") novoStatus = "finalizado";
    else return;

    try {
      const ref = doc(db, "pedidos", pedido.id);
      await updateDoc(ref, { status: novoStatus });
    } catch (error) {
      console.error("Erro ao atualizar status:", error);
    }
  };

  const alterarStatusPedido = async (pedidoId, novoStatus) => {
    try {
      const pedidoRef = doc(db, "pedidos", pedidoId);
      await updateDoc(pedidoRef, {
        status: novoStatus,
      });
      console.log("Status atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar status do pedido:", error);
    }
  };

  return (
    <s.Container>
      <s.Title>Pedidos</s.Title>
      <s.BoxButton>
        <s.AreaBotton>
          <s.AddButton onClick={() => {}}>Pedentes</s.AddButton>
        </s.AreaBotton>
        <s.AreaBotton>
          <s.AddButton onClick={() => {}}>Prep</s.AddButton>
        </s.AreaBotton>
        <s.AreaBotton>
          <s.AddButton onClick={() => {}}>Ok</s.AddButton>
        </s.AreaBotton>
      </s.BoxButton>
      {pedidos?.map((i, indexa) => (
        <s.PedidoInfo key={indexa}>
          <s.InfoRow>
            <strong>Data:</strong> {moment(i.data).format("DD/MM/YYYY")}
          </s.InfoRow>
          <s.InfoRow>
            <strong>Cliente:</strong> {i.cliente.nome}
          </s.InfoRow>
          <s.InfoRow>
            <strong>Telefone:</strong> {i.cliente.telefone}
          </s.InfoRow>
          <s.InfoRow>
            <strong>Tipo de entrega:</strong> {i.tipoEntrega}
          </s.InfoRow>
          <s.InfoRow>
            <strong>Endereco:</strong> {i.cliente.rua}
          </s.InfoRow>
          <s.InfoRow>
            <strong>Bairro:</strong> {i.cliente.bairro}
          </s.InfoRow>
          <s.InfoRow>
            <strong>Pagamento:</strong> {i.pagamento}
          </s.InfoRow>
          <s.InfoRow>
            <strong>Troco:</strong> {i.troco.valor}
          </s.InfoRow>
          <s.InfoRow>
            <strong>Telefone:</strong>{" "}
            {i.total.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </s.InfoRow>

          <s.BoxItem>
            <ul>
              {i.itens?.map((item, index) => (
                <s.BoxLi key={index}>
                  {item.nome}
                  {item.adicionais && item.adicionais.length > 0 && (
                    <ul>
                      {item.adicionais
                        .filter((i) => i?.quantidade > 0)
                        .map((i, index) => (
                          <div>
                            <s.BoxLiAdicional key={index}>
                              {i.quantidade} {i?.nome} (R$ {i?.preco.toFixed(2)}
                              )
                            </s.BoxLiAdicional>
                          </div>
                        ))}
                    </ul>
                  )}
                </s.BoxLi>
              ))}
            </ul>
          </s.BoxItem>
        </s.PedidoInfo>
      ))}
    </s.Container>
  );
}
