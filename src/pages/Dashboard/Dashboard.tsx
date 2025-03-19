import { Col, Row } from "react-bootstrap";
import ChartDashboard from "../../view/ChartsDashBoard/ChartDashboard";
import Card from "../../components/Card/Card";
import { formatCurrencyBRL } from "../../services/system/globalService";
import { useStateCustom } from "../../hooks/Dashboard/useStateCustom";
import { useFetch } from "../../hooks/Dashboard/useFetch";
import * as P from "../Styles/_Page.styles";
import * as S from "./Dashboard.styles";

import homeClient from "../../assets/homeClient.svg";

const Dashboard = () => {
  const storeUser = Number(localStorage.getItem("storeUser"));
  const {
    amountReceived,
    setAmountReceived,
    appointmentCount,
    setAppointmentCount,
    appointmentPercentageCanceled,
    setAppointmentPercentageCanceled,
  } = useStateCustom();

  useFetch(
    storeUser,
    setAmountReceived,
    setAppointmentCount,
    setAppointmentPercentageCanceled
  );

  return (
    <P.ContainerPage style={{ height: "100vh" }}>
      <P.ContainerHeader>
        <P.ContentHeader align="start">
          <P.Title>
            Dashboard <br />
          </P.Title>
          <P.SubTitle>Área destinada para análise de dados.</P.SubTitle>
        </P.ContentHeader>     
      </P.ContainerHeader>
      <S.DashboardContainer>
        <Col sm={12} xl={4}>
          <Card
            type="dashboard"
            title="Valor Recebido"
            value={formatCurrencyBRL(amountReceived)}
            icon="arrowUp"
          />
        </Col>
        <Col sm={12} xl={4}>
          <Card
            type="dashboard"
            title="Agendamentos"
            value={appointmentCount.toString()}
            icon="arrowUp"
          />
        </Col>
        <Col sm={12} xl={4}>
          <Card
            type="dashboard"
            title="Cancelamento"
            value={`${Number(appointmentPercentageCanceled).toFixed(2)}%`}
            icon="arrowDown"
          />
        </Col>
      </S.DashboardContainer>

      <Row>
        <Col>
          <ChartDashboard />
        </Col>
      </Row>
    </P.ContainerPage>
  );
};

export default Dashboard;
