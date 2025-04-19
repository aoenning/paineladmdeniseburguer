import styled from "styled-components";
import { colors, fonts } from "../../Styles";

export const Container = styled.div`
  /* padding: 0rem; */
  background: #333;
  color: #fff;
  /* font-family: "Courier New", monospace; */
  /* height: 100vh; */
`;

export const Titulo = styled.h1`
  text-align: center;
  /* margin-bottom: 2rem; */
`;

export const Descricao = styled.p`
  text-align: start;
  font-size: 1rem;
  font-family: ${fonts.primary};
  color: ${colors.brack};
`;

export const DescricaoValor = styled.p`
  text-align: start;
  font-size: 1.2rem;
  font-family: ${fonts.primary};
  color: ${colors.laraja_forte};
  font-weight: bold;
`;

export const TitleNome = styled.p`
  text-align: start;
  font-size: 1.2rem;
  font-family: ${fonts.primary};
  color: ${colors.brack};
  font-weight: bold;
`;

export const Divisao = styled.div`
  border-bottom: 1px solid ${colors.cinza};
  /* height: 1px; */
`;

export const LiCard = styled.li`
  text-align: start;
  font-size: 1.1rem;
  font-family: ${fonts.primary};
  margin-top: 10px;
  font-weight: bold;
  color: ${colors.brack};
`;

export const LiCardAdicional = styled.li`
  text-align: start;
  font-size: 1rem;
  font-family: ${fonts.primary};
  color: ${colors.header};
`;

export const UlCard = styled.ul`
  text-align: start;
  font-size: 0.9rem;
  font-family: ${fonts.primary};
  font-weight: bold;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
`;

export const Coluna = styled.div`
  background: ${colors.header};
  border-radius: 8px;
  /* padding: 0.4rem; */
  /* height: 93vh; */
  /* margin-left: 15px; */
`;

export const StatusTitle = styled.p`
  text-align: center;
  margin-bottom: 1rem;
  font-size: 1rem;
  font-family: ${fonts.primary};
  color: ${colors.white};
`;

export const Card = styled.div`
  background: ${colors.white};
  color: #333;
  border-radius: 8px;
  padding: 1rem;
  margin: 0px 15px 15px 15px;
  /* margin-bottom: 1rem; */
`;

export const Select = styled.select`
  width: 100%;
  margin-top: 1rem;
  padding: 0.5rem;
  border-radius: 4px;
  border-color: ${colors.header};
`;

export const Area = styled.div`
  height: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  /* width: 95%; */
  /* margin-top: 1rem; */
  padding: 0.5rem;
  border-radius: 4px;
  background-color: ${colors.white};
`;

export const AreaSub = styled.div`
  width: 100%;
  height: 15px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: 4px;
  /* width: 100%; */
  margin-top: 1rem;
  /* padding: 0.5rem; */
  /* border-radius: 4px; */
`;
