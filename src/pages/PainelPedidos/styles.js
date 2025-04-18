import styled from "styled-components";
import { colors, fonts } from "../../Styles";

export const Container = styled.div`
  /* padding: 0rem; */
  background: #333;
  color: #fff;
  font-family: "Courier New", monospace;
`;

export const Titulo = styled.h1`
  text-align: center;
  margin-bottom: 2rem;
`;

export const Descricao = styled.p`
  text-align: start;
  font-size: 0.8rem;
  font-family: ${fonts.primary};
  color: ${colors.brack};
`;

export const TitleNome = styled.p`
  text-align: start;
  font-size: 1.0rem;
  font-family: ${fonts.primary};
  color: ${colors.brack};
  font-weight: bold;
`;

export const Divisao = styled.div`
  border-bottom: 1px solid ${colors.header};
`;

export const LiCard = styled.li`
  text-align: start;
  font-size: 0.9rem;
  font-family: ${fonts.primary};
  margin-top: 10px;
  font-weight: bold;
  color: ${colors.brack};
`;

export const LiCardAdicional = styled.li`
  text-align: start;
  font-size: 0.9rem;
  font-family: ${fonts.primary};
  margin-top: 10px;
  /* font-weight: bold; */
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
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
`;

export const Coluna = styled.div`
  background: ${colors.header};
  border-radius: 8px;
  padding: 0.4rem;
`;

export const StatusTitle = styled.p`
  text-align: center;
  margin-bottom: 1rem;
  font-size: 1rem;
  font-family: ${fonts.primary};
  color: ${colors.white};
`;

export const Card = styled.div`
  background: ${colors.yello};
  color: #333;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
`;

export const Select = styled.select`
  width: 100%;
  margin-top: 1rem;
  padding: 0.5rem;
  border-radius: 4px;
`;
