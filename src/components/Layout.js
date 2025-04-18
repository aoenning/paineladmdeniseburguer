import styled from "styled-components";
import Sidebar from "./Sidebar";

const Content = styled.div`
  margin-left: 250px;
  padding: 2rem;
  background-color: #333;

  @media (max-width: 768px) {
    margin-left: 60px;
  }
`;

export default function Layout({ children }) {
  return (
    <>
      <Sidebar />
      <Content>{children}</Content>
    </>
  );
}
