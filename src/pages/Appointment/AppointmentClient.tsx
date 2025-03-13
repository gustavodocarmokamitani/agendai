import { Col, Row } from "react-bootstrap";
import * as S from "./Appointment.styles";
import Button from "../../components/Button/Button";
import { Paragraph } from "../../components/Paragraph/Paragraph";
import Select from "../../components/Select/Select";
import SelectDataPicker from "../../components/Select/SelectDataPicker";
import { useFetch } from "../../hooks/Appointment/useFetch";
import { useStateCustom } from "../../hooks/Appointment/useStateCustom";
import { useParams } from "react-router-dom";
import { ContainerHeader, ContainerPage, ContentHeader, ContentHeaderImg, SubTitle, Title } from "../Styles/_Page.styles";
import homeClient from "../../assets/homeClient.svg";
import { useSubmitClient } from "../../hooks/Appointment/useSubmitClient";

export function AppointmentClient() {
  const { storeCodeParams } = useParams();
  const storeCode = storeCodeParams ? storeCodeParams : "";
  const storeUser = Number(localStorage.getItem("storeUser"));  

  const {
    storeData,
    setStoreData,
    employee,
    setEmployee,
    client,
    setClient,
    service,
    setService,
    store,
    setStore,
    appointmentTime,
    setAppointmentTime,
    appointmentDate,
    setAppointmentDate,
    isLoading,
    setIsLoading,
    optionsEmployee,
    setOptionsEmployee,
    optionsService,
    setOptionsService,
    optionsClient,
    setOptionsClient,
    optionsTime,
    setOptionsTime,
    optionsStore,
    setOptionsStore,
    decodedData,
    setDecodedData,
  } = useStateCustom();

  useFetch(
    storeCode,
    storeUser,
    store,
    setStoreData,
    setOptionsEmployee,
    setOptionsService,
    setOptionsClient,
    setOptionsTime,
    setOptionsStore,
    setIsLoading,
    setDecodedData
  );

  const handleSubmit = async () => {
    await submit(
      employee,
      client,
      service,
      appointmentTime,
      appointmentDate,
      storeUser
    );
  };

  const submit = useSubmitClient(
    setIsLoading,
    setEmployee,
    setClient,
    setService,
    setAppointmentTime,
    decodedData,
    storeData,
    store
  );
  return (
    <ContainerPage>
      <ContainerHeader>
        <ContentHeader align="start">
          <Title>
            Agendamento <br />
            {storeCode !== ":" ? (
              <>
                {storeData?.name}{" "}
                <span>{storeData?.storeCode.match(/#\d+/)}</span>
              </>
            ) : (
              ""
            )}
          </Title>
          <SubTitle>
            Garanta seu horário com facilidade. Informe os seguintes dados.
          </SubTitle>
          <Button onClick={handleSubmit} $isAppointment type="button" />
        </ContentHeader>
        <ContentHeaderImg align="end">
          <img
            src={homeClient}
            alt="Home Cliente"
            width="400px"
            height="400px"
          />
        </ContentHeaderImg>
      </ContainerHeader>

      {storeCode === ":" ? (
        <S.AppointmentContainer>
          <Row
            className="justify-content-start align"
            style={{ width: "100%", flexWrap: "wrap" }}
          >
            <Col>
              <S.AppointmentContent>
                <Paragraph text="Loja" />
                <Select
                  setData={setStore}
                  options={optionsStore}
                  placeholder="Selecione ..."
                  value={store[store.length - 1]}
                />
              </S.AppointmentContent>
            </Col>
          </Row>
        </S.AppointmentContainer>
      ) : null}

      {store.length > 0 || storeCode ? (
        <>
          <S.AppointmentContainer>
            <Row
              className="justify-content-start align"
              style={{ width: "100%", flexWrap: "wrap" }}
            >
              <Col>
                <S.AppointmentContent>
                  <Paragraph text="Funcionário" />
                  <Select
                    setData={setEmployee}
                    options={optionsEmployee}
                    placeholder="Selecione ..."
                    value={employee[employee.length - 1]}
                  />
                </S.AppointmentContent>
              </Col>
              <Col>
                <S.AppointmentContent>
                  <Paragraph text="Serviço" />
                  <Select
                    setData={setService}
                    options={optionsService}
                    placeholder="Selecione ..."
                    value={service}
                    isMulti={true}
                  />
                </S.AppointmentContent>
              </Col>
              <Col>
                <S.AppointmentContent>
                  <Paragraph text="Horário" />
                  <Select
                    setData={setAppointmentTime}
                    options={optionsTime}
                    placeholder="Selecione ..."
                    value={appointmentTime}
                  />
                </S.AppointmentContent>
              </Col>
            </Row>
          </S.AppointmentContainer>
          <S.AppointmentContainer className="justify-content-center justify-content-xl-start pb-5">
            <S.AppointmentContent>
              <SelectDataPicker
                setDate={setAppointmentDate}
                type="appointment"
              />
            </S.AppointmentContent>
          </S.AppointmentContainer>
        </>
      ) : null}
    </ContainerPage>
  );
}
