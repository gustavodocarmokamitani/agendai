import { Col, Row } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import * as S from "./Sidebar.styles";
import OptionNavigation from "../components/OptionNavigation";
import home from "../assets/home.svg";
import image from "../assets/image.svg";
import store from "../assets/store.svg";
import payment from "../assets/payment.svg";
import professional from "../assets/professional.svg";
import service from "../assets/service.svg";
import logo from "../assets/logo.png";
import chamada from "../assets/chamada.svg";
import exit from "../assets/exit.svg";

const Navigation = () => {
  const location = useLocation();

  return (
    <S.SidebarContainer className="d-flex flex-column" style={{ height: "100vh" }}>
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
          { path: "/appointment", icon: chamada, text: "Agendamento" },
          { path: "/appointment-history", icon: chamada, text: "Histórico Agendamento" },
          // { path: "/dashboard", icon: home, text: "Dashboard" },
          { path: "/service", icon: service, text: "Serviços" },
          { path: "/professional", icon: professional, text: "Profissionais" },
          // { path: "/image", icon: image, text: "Imagens" },
          { path: "/store", icon: store, text: "Loja" },
          { path: "/payment", icon: payment, text: "Formas de Pagamentos" },
          // { path: "/chamada", icon: chamada, text: "Chamadas e ajudas" },
        ].map(({ path, icon, text }) => (
          <S.MenuContainer key={path}>
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
          </S.MenuContainer>
        ))}
      </div>

      <S.MenuContainer style={{ borderTop: "1px solid gray" }}>
        <Row className="d-flex align-items-center justify-content-center" style={{ height: "100%", paddingLeft: "20px" }}>
          <OptionNavigation
            icon={<img src={exit} alt="exit" style={{ width: "25px" }} />}
            text="Sair"
          />
        </Row>
      </S.MenuContainer>
    </S.SidebarContainer>
  );
};

export default Navigation;
