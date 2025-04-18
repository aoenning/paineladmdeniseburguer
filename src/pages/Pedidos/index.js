import { useEffect, useState, useRef } from "react";
import { collection, onSnapshot, updateDoc, doc } from "firebase/firestore";
import { db } from "./../../firebase";
import styled from "styled-components";
import { colors, fonts } from "./../../Styles";
import * as s from "./styles";
import moment from "moment/moment";
import { color } from "framer-motion";

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
        <s.Button
          backgroundColor={colors.header}
          color={colors.white}
          onClick={() => {}}
        >
          Pedentes
        </s.Button>
        <s.Button
          backgroundColor={colors.green}
          color={colors.white}
          onClick={() => {}}
        >
          Preparacao
        </s.Button>
        <s.Button
          backgroundColor={colors.brue}
          color={colors.white}
          onClick={() => {}}
        >
          Rota
        </s.Button>
        <s.Button
          backgroundColor={colors.laraja}
          color={colors.white}
          onClick={() => {}}
        >
          Entregue
        </s.Button>
        <s.Button
          backgroundColor={colors.red}
          color={colors.white}
          onClick={() => {}}
        >
          Cancelado
        </s.Button>
      </s.BoxButton>

      {/* <s.NavBar>
        <s.NavItem to="/">Preparando</s.NavItem>
        <s.NavItem to="/Pedidos">Pedidos</s.NavItem>
        <s.NavItem to="/Pedidos">Pedidos</s.NavItem>
        <s.NavItem to="/Carrinho">Carrinho</s.NavItem>
      </s.NavBar> */}

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
            <strong>Numero:</strong> {i.cliente.numero}
          </s.InfoRow>
          <s.InfoRow>
            <strong>Compplemento:</strong> {i.cliente.complemento}
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
          {/* <s.InfoRow>
            <strong>Tipo queijo:</strong> {i.tipoQueijo}
          </s.InfoRow> */}
          <s.InfoRow>
            <strong>Total:</strong>{" "}
            {i.total.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </s.InfoRow>

          <s.BoxItem>
            <ul>
              {i.itens?.map((item, index) => (
                <s.BoxLi key={index}>
                  {item.quantidade}x {item.nome} com {item.tipoQueijo}
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
