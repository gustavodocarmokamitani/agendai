import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ContainerPage } from "./_Page.styles";
import { Col, Row } from "react-bootstrap";
import { getStoreById } from "../services/StoreServices";
import { Store as StoreModel } from '../models/Store';
import * as S from "./Store.styles";
import HeaderTitle from "../view/HeaderTitle";
import Button from "../components/Button";
import CardStatus from "../components/Card/StatusCard";
import CardHorario from "../components/Card/TimeCard";
import CardDiaSemana from "../components/Card/WeekDayCard";
import CardDiaFechamento from "../components/Card/ClosingDateCard";

function Store() {
  const navigate = useNavigate();
  const [store, setStore] = useState<StoreModel | undefined>();
  const [selectedTimes, setSelectedTimes] = useState<string[]>([]);
 const fetchData = async () => {
    try {
        // TODO: change id for store logged
        const response = await getStoreById(1);
        if (response) {
            setStore(response);

            const horariosArray = response.operatingHours
                ? response.operatingHours.split(" - ")
                : [];
            setSelectedTimes(horariosArray);
        }
    } catch (error) {
        console.error("Erro ao buscar dados da loja:", error);
    }
};

  useEffect(() => {
    fetchData();
  }, [])

  const handleButtonClick = () => {
    navigate('/store-configure');
  };

  return (
    <ContainerPage style={{ height: "100vh" }}>
      <Row>
        <Col md={7} style={{ padding: "0px" }}>
          <HeaderTitle
            title="Store"
            subTitle="Área destinada para gerenciamento da store."
          />
        </Col>

        <Col
          md={5}
          className="d-flex flex-row justify-content-end align-items-center"
        >
          <Button $isConfigure onClick={handleButtonClick} type="button" />
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <h3 style={{ margin: "20px 0 25px 0" }}>Dados da store</h3>
          <S.CardStoreWrapper className="d-flex justify-content-start align-items-center">
            <CardStatus data={store} title="Status" icon="confirm" />
            <CardHorario selectedTimes={selectedTimes} title="Hora de abertura" icon="calendar" />
            <CardHorario selectedTimes={selectedTimes} title="Hora de fechamento" icon="calendar" />
          </S.CardStoreWrapper>
          <h3 style={{ margin: '20px 0 25px 0' }}>Dias de funcionamento</h3>
          <S.CardStoreWrapper className="d-flex justify-content-start align-items-center flex-wrap">
            {store?.operatingDays?.map((day, index) => (
              <CardDiaSemana key={index} text={day} icon="confirm" />
            ))}
          </S.CardStoreWrapper>

          <h3 style={{ margin: '20px 0 25px 0' }}>Dias de fechamento</h3>
          <S.CardStoreWrapper className="d-flex justify-content-start align-items-center flex-wrap">
            {store?.closingDays?.map((day, index) => {
              const formattedData = new Date(day).toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              });

              return <CardDiaFechamento key={index} text={formattedData} icon="confirm" />;
            })}
          </S.CardStoreWrapper>
        </Col>
      </Row>
    </ContainerPage>
  );
}

export default Store;
