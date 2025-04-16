import styled from "styled-components";
import { colors, fonts } from "../../Styles";

// Estilos Globais
export const Container = styled.div`
  width: 100%;
  /* max-width: 400px; */
  /* margin: 40px auto; */
  /* padding: 0rem; */
  /* background: ${colors.white}; */
  /* border-radius: 20px; */
  /* box-shadow: 0 0 20px rgba(0, 0, 0, 0.08); */
  /* font-family: "Arial", sans-serif; */
  height: 100vh;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* position: relative; */
  width: 100%;
  height: 60px;
  background: ${colors.brack};
`;

export const BoxIcon = styled.div`
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  z-index: auto;
  margin-left: 10px;
  /* border: 1px solid ${colors.white}; */
  border-radius: 15px;
  background-color: ${colors.brack};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 70px;
  height: 30px;
`;

export const Title = styled.h2`
  font-size: 1.1rem;
  text-align: center;
  /* margin-bottom: 1.5rem; */
  color: ${(props) => (props.color ? props.color : colors.brack)};
  font-family: ${fonts.primary};
`;

export const PedidoInfo = styled.div`
  background: #fff3e0;
  padding: 1rem 1.2rem;
  border-radius: 12px;
  margin-bottom: 2rem;
  border: 1px solid #ffe0b2;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.08);
  margin: 15px;
  padding: 15px;
  overflow: auto;
`;

export const BoxItem = styled.h2`
  margin: 15px;
`;

export const BoxLi = styled.li`
  color: ${(props) => (props.color ? props.color : colors.cinza_forte)};
  font-family: ${fonts.primary};
  font-weight: bold;
  font-size: 1.1rem;
`;

export const BoxLiAdicional = styled.li`
  color: ${(props) => (props.color ? props.color : colors.header)};
  font-family: ${fonts.segudary};
  font-size: 0.9rem;
`;

export const InfoRow = styled.p`
  margin: 6px 0;
  color: #5d4037;
  font-size: 1rem;
`;

export const Steps = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  position: relative;
  padding: 0 10px;
  margin-top: 2rem;
  margin-bottom: 20px;

  &::before {
    content: "";
    position: absolute;
    top: 35px;
    left: 5%;
    right: 5%;
    height: 4px;
    background: #d7ccc8;
    z-index: 0;
  }
`;

export const Step = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 25%;
  position: relative;
  z-index: 1;

  @media (max-width: 600px) {
    width: 50%;
    margin-bottom: 2rem;
  }
`;

export const IconWrapper = styled.div`
  background: ${({ active }) => (active ? "#ff5722" : "#ccc")};
  color: #fff;
  border-radius: 50%;
  padding: 12px;
  margin-bottom: 8px;
  transition: 0.3s;
`;

export const Label = styled.span`
  font-size: 0.9rem;
  color: ${({ active }) => (active ? "#ff5722" : "#888")};
  text-align: center;
`;

export const BoxButton = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  padding: 5px;
  margin-left: 2px;
`;

export const AreaBotton = styled.div`
  width: 35%;
  display: flex;
  flex-direction: column;
  /* margin-top: 15px; */
  justify-content: end;
  align-items: center;
  /* position: fixed; */
  /* bottom: 0; */
`;

export const AddButton = styled.button`
  width: 100%;
  background: ${(props) =>
    props.background ? props.background : colors.brack};
  color: ${(props) => (props.color ? props.color : colors.white)};
  /* border: 1px solid ${colors.brack}; */
  font-size: 18px;
  padding: 15px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  justify-content: ${(props) =>
    props.justifyContent ? props.justifyContent : "space-between"};
  align-items: center;
  margin-top: 5px;
  margin-bottom: ${(props) =>
    props.marginButton ? props.marginButton : "5px"};
`;
