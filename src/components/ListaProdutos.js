import { useEffect, useState } from "react";
import { collection, onSnapshot, doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";
import styled from "styled-components";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { colors, fonts } from "./../Styles";

const Lista = styled.div`
  display: grid;
  gap: 1rem;
  margin-top: 1rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  }
`;

const Card = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Titulo = styled.h4`
  margin: 0;
  font-size: ${(props) => (props.fontSize ? props.fontSize : "0.5rem")};
  font-family: ${fonts.primary};
`;

const Preco = styled.span`
  color: #555;
  font-weight: bold;
  font-family: ${fonts.primary};
`;

const Acao = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  color: #333;
  font-size: 1.2rem;
  margin-left: 0.5rem;

  &:hover {
    color: ${({ cor }) => cor || "#007bff"};
  }
`;

const Acoes = styled.div`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  display: flex;
`;

export default function ListaProdutos({ onEditar }) {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "produtos"), (snapshot) => {
      const lista = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProdutos(lista);
    });

    return () => unsubscribe();
  }, []);

  const excluirProduto = async (id) => {
    // if (confirm("Tem certeza que deseja excluir este produto?")) {
    //   await deleteDoc(doc(db, "produtos", id));
    // }
  };

  return (
    <Lista>
      {produtos.map((produto) => (
        <Card key={produto.id}>
          <Acoes>
            <Acao onClick={() => onEditar && onEditar(produto)}>
              <FiEdit2 />
            </Acao>
            <Acao onClick={() => excluirProduto(produto.id)} cor="#e63946">
              <FiTrash2 />
            </Acao>
          </Acoes>

          <Titulo fontSize={"1.0rem"}>{produto.nome}</Titulo>
          <Titulo>{produto.detalhe}</Titulo>
          <Titulo>{produto.categoria}</Titulo>
          <Titulo>{produto.disponivel}</Titulo>
          <Preco>
            {" "}
            {produto.preco.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </Preco>
          {/* {produto.descricao && <small>{produto.descricao}</small>} */}
        </Card>
      ))}
    </Lista>
  );
}
