import React, { useState } from "react";
import styled from "styled-components";
import { db, storage } from "./../firebase";
import { collection, addDoc } from "firebase/firestore";
// import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from "uuid";
import { colors, fonts } from "./../Styles";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 700px;
  margin: 40px auto;
  background-color: #fff4e6;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  font-family: ${fonts.primary};
`;

const Title = styled.p`
  color: #8b0000;
  text-align: center;
  font-weight: bold;
  font-size: 15px;
`;

const Input = styled.input`
  padding: 8px;
  border: 2px solid #d62828;
  border-radius: 8px;
  font-size: 0.7rem;
`;

const Select = styled.select`
  padding: 8px;
  border: 2px solid #d62828;
  border-radius: 8px;
  font-size: 0.7rem;
`;

const Button = styled.button`
  padding: 12px;
  background-color: #d62828;
  color: #fff;
  font-size: 0.7rem;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background-color: #a81e1e;
  }
`;

const ImagePreview = styled.img`
  max-width: 100%;
  border-radius: 12px;
`;

const AdicionalBox = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const TextArea = styled.textarea`
  width: 97%;
  height: 80px;
  /* margin-top: 5px; */
  padding: 5px;
  border: 1px solid ${colors.cinza};
  border-radius: 5px;
  font-size: 14px;
  resize: none;
  font-family: ${fonts.primary};
  /* margin-bottom: 60px; */
`;

export default function CadastroProduto() {
  const [id, setId] = useState(0);
  const [nome, setNome] = useState("");
  const [detalhe, setDetalhe] = useState("");
  const [preco, setPreco] = useState("");
  const [categoria, setCategoria] = useState("Tradicional");
  const [img, setImg] = useState("");
  const [preview, setPreview] = useState(null);
  const [adicionais, setAdicionais] = useState([]);
  const [novoAdicional, setNovoAdicional] = useState({ nome: "", preco: "" });

  //   const handleImagemChange = (e) => {
  //     const file = e.target.files[0];
  //     setImagem(file);
  //     setPreview(URL.createObjectURL(file));
  //   };

  const adicionarAdicional = () => {
    if (novoAdicional.nome && novoAdicional.preco) {
      setAdicionais([
        ...adicionais,
        { ...novoAdicional, preco: parseFloat(novoAdicional.preco) },
      ]);
      setNovoAdicional({ nome: "", preco: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (!img) return alert("Selecione uma imagem!");

    // const imgRef = ref(storage, `hamburgueres/${uuidv4()}-${imagem.name}`);
    // await uploadBytes(imgRef, imagem);
    // const urlImagem = await getDownloadURL(imgRef);

    await addDoc(collection(db, "produtos"), {
      id,
      nome,
      detalhe,
      preco: parseFloat(preco),
      categoria,
      img, //urlImagem,
      //   adicionais,
      disponivel: true,
    });

    alert("Hambúrguer cadastrado com sucesso!");
    setId("");
    setNome("");
    setDetalhe("");
    setPreco("");
    setCategoria("Tradicional");
    setImg("");
    setPreview(null);
    setAdicionais([]);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Title>Cadastrar Hambúrguer</Title>
      <Input
        type="text"
        placeholder="Id"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />

      <Input
        type="text"
        placeholder="Nome do produto"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />

      <TextArea
        // type="text"
        placeholder="Link imagem"
        value={img}
        onChange={(e) => setImg(e.target.value)}
      />
      <TextArea
        // type=""
        placeholder="Detalhe"
        value={detalhe}
        onChange={(e) => setDetalhe(e.target.value)}
      />
      <Input
        type="number"
        placeholder="Preço (R$)"
        value={preco.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })}
        onChange={(e) => setPreco(e.target.value)}
      />

      <Select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
        <option value="Tradicional">Tradicional</option>
        <option value="Adicional">Adicional</option>
        <option value="Bebida">Bebida</option>
        <option value="Molho">Molho</option>
        <option value="Promoção">Promoção</option>
      </Select>

      <Button type="submit">Cadastrar</Button>
    </Form>
  );
}
