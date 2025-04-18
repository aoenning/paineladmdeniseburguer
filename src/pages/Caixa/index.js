import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  updateDoc,
  doc,
  getDocs,
  orderBy,
  serverTimestamp,
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

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Status = styled.div`
  font-weight: bold;
  color: ${(props) => (props.aberto ? "#2d6a4f" : "#d00000")};
`;

const Botao = styled.button`
  background: ${(props) => (props.aberto ? "#d00000" : "#2d6a4f")};
  color: white;
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 12px;
  cursor: pointer;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
`;

const Bloco = styled.div`
  background: #fef2dc;
  padding: 1rem;
  border-radius: 12px;
  text-align: center;
`;

export default function CaixaSimplificado() {
  const [statusCaixa, setStatusCaixa] = useState(null);
  const [pedidos, setPedidos] = useState([]);
  const [totais, setTotais] = useState({ pix: 0, cartao: 0, dinheiro: 0 });

  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);
  const timestampHoje = Timestamp.fromDate(hoje);

  useEffect(() => {
    const q = query(
      collection(db, "caixa"),
      where("data", ">=", timestampHoje)
    );
    const unsub = onSnapshot(q, (snapshot) => {
      const dataHoje = snapshot.docs.find(
        (doc) => doc.data().status !== "fechado"
      );
      setStatusCaixa(dataHoje ? { id: dataHoje.id, ...dataHoje.data() } : null);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    if (!statusCaixa) return;
    const q = query(
      collection(db, "pedidos"),
      where("status", "==", "finalizado"),
      where("data", ">=", timestampHoje)
    );
    const unsub = onSnapshot(q, (snapshot) => {
      const lista = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setPedidos(lista);
    });
    return () => unsub();
  }, [statusCaixa]);

  useEffect(() => {
    const pix = pedidos
      .filter((p) => p.pagamento === "pix")
      .reduce((acc, p) => acc + p.total, 0);
    const cartao = pedidos
      .filter((p) => p.pagamento === "cartão")
      .reduce((acc, p) => acc + p.total, 0);
    const dinheiro = pedidos
      .filter((p) => p.pagamento === "dinheiro")
      .reduce((acc, p) => acc + p.total, 0);
    setTotais({ pix, cartao, dinheiro });
  }, [pedidos]);

  const abrirCaixa = async () => {
    await addDoc(collection(db, "caixa"), {
      status: "aberto",
      data: serverTimestamp(),
    });
  };

  const fecharCaixa = async () => {
    if (!statusCaixa) return;
    const total = totais.pix + totais.cartao + totais.dinheiro;
    await updateDoc(doc(db, "caixa", statusCaixa.id), {
      status: "fechado",
      fechado_em: serverTimestamp(),
      total,
    });
  };

  return (
    <Container>
      <Header>
        <Status aberto={!!statusCaixa}>
          Status: {!!statusCaixa ? "🟢 Aberto" : "🔴 Fechado"}
        </Status>
        <Botao
          aberto={!!statusCaixa}
          onClick={!!statusCaixa ? fecharCaixa : abrirCaixa}
        >
          {!!statusCaixa ? "Fechar Caixa" : "Abrir Caixa"}
        </Botao>
      </Header>

      {statusCaixa && (
        <Grid>
          <Bloco>
            <h4>💳 Cartão</h4>
            <p>
              <strong>R$ {totais.cartao.toFixed(2)}</strong>
            </p>
          </Bloco>
          <Bloco>
            <h4>🏦 Pix</h4>
            <p>
              <strong>R$ {totais.pix.toFixed(2)}</strong>
            </p>
          </Bloco>
          <Bloco>
            <h4>💵 Dinheiro</h4>
            <p>
              <strong>R$ {totais.dinheiro.toFixed(2)}</strong>
            </p>
          </Bloco>
          <Bloco>
            <h4>📊 Total</h4>
            <p>
              <strong>
                R$ {(totais.cartao + totais.pix + totais.dinheiro).toFixed(2)}
              </strong>
            </p>
          </Bloco>
        </Grid>
      )}
    </Container>
  );
}
