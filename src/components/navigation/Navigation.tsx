import { Col, Row } from "react-bootstrap";

import OptionNavigation from "../smallComponent/OptionNavigation";
import home from "../../assets/home.svg";
import imagem from "../../assets/imagem.svg";
import loja from "../../assets/loja.svg";
import pagamento from "../../assets/pagamento.svg";
import profissional from "../../assets/profissional.svg";
import servico from "../../assets/servico.svg";
import logo from "../../assets/logo.png";
import chamada from "../../assets/chamada.svg";
import sair from "../../assets/sair.svg";
import { Link, useLocation } from "react-router-dom";
import { ContainerNavigation, ContainerOptionNavigation } from "./_NavigationStyled";

const Navigation = () => {
  const location = useLocation();

  return (
    <ContainerNavigation className="d-flex flex-column" style={{ height: "100vh" }}>
      <Row className="pt-1 d-flex align-items-center justify-content-center" style={{ height: "130px" }}>
        <Col className="d-flex justify-content-center">
          <img src={logo} alt="AgendaI" />
        </Col>
      </Row>

      <hr />
      <Row>
        <Col>
          <h2 style={{ paddingLeft: "20px" }}>Acesso rápido</h2>
        </Col>
      </Row>

      <div className="flex-grow-1">
        {[
          { path: "/dashboard", icon: home, text: "Dashboard" },
          { path: "/servico", icon: servico, text: "Serviços" },
          { path: "/profissional", icon: profissional, text: "Profissionais" },
          { path: "/imagem", icon: imagem, text: "Imagens" },
          { path: "/loja", icon: loja, text: "Loja" },
          { path: "/pagamento", icon: pagamento, text: "Formas de Pagamentos" },
          { path: "/chamada", icon: chamada, text: "Chamadas e ajudas" },
        ].map(({ path, icon, text }) => (
          <ContainerOptionNavigation key={path}>
            <Link to={path} style={{ textDecoration: "none" }}>
              <Row
                className="d-flex align-items-center justify-content-center"
                style={{
                  height: "100%",
                  paddingLeft: "20px",
                  borderLeft:
                    location.pathname === path ? "8px solid #717171" : "none",
                  backgroundColor:
                    location.pathname === path ? "#E7E7E7" : "transparent",
                }}
              >
                <OptionNavigation
                  icon={<img src={icon} alt={text} style={{ width: "25px" }} />}
                  text={text}
                />
              </Row>
            </Link>
          </ContainerOptionNavigation>
        ))}
      </div>

      <ContainerOptionNavigation style={{ borderTop: "1px solid gray" }}>
        <Row className="d-flex align-items-center justify-content-center" style={{ height: "100%", paddingLeft: "20px" }}>
          <OptionNavigation
            icon={<img src={sair} alt="sair" style={{ width: "25px" }} />}
            text="Sair"
          />
        </Row>
      </ContainerOptionNavigation>
    </ContainerNavigation>
  );
};

export default Navigation;
