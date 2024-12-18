import React, { useEffect, useState } from "react";
import { ContainerPage } from "./_Page.styles";
import { Col, Row } from "react-bootstrap";
import { PaymentMethod } from "../models/PaymentMethod";
import { getStoreById, updateStore } from "../services/StoreServices";
import { Store } from "../models/Store";
import { useSnackbar } from "notistack";
import * as S from "./Payment.styles";
import HeaderTitle from "../view/HeaderTitle";
import Button from "../components/Button";
import MetodoPaymentSelect from "../components/Select/PaymentMethodSelect";

function Payment() {
  const { enqueueSnackbar } = useSnackbar();
  const [payment, setPayment] = useState<PaymentMethod[]>([]);
  const [store, setStore] = useState<Store | null>(null);

  useEffect(() => {
    const fetchStore = async () => {
      try {
        const response = await getStoreById(1);
        setStore(response);

        if (response.paymentMethod) {
          const paymentMethodInitial: PaymentMethod[] = response.paymentMethod.map((id: number) => ({
            id,
            name: `Metodo ${id}`,
          }));
          setPayment(paymentMethodInitial);
        }
      } catch (error) {
        console.error("Erro when load store:", error);
      } 
    };

    fetchStore();
  }, []);

  const handleSubmit = async () => {
    try {
      if (!store) {

        enqueueSnackbar("Store not loadead", { variant: "error" });
        return;
      }

      const paymentMethodIds = payment.map((metodo) => metodo.id);

      const mapped: Store = {
        ...store,
        paymentMethod: paymentMethodIds,
      };

      await updateStore(store.id, mapped);

      enqueueSnackbar("Metodos de payment adicionado com sucesso!", { variant: "success" });
    } catch (error) {
      enqueueSnackbar("Erro ao atualizar a store!", { variant: "success" });
    }
  };

  return (
    <ContainerPage style={{ height: "100vh" }}>
      <Row>
        <Col md={7} style={{ padding: "0px" }}>
          <HeaderTitle title="Payments" subTitle="Área destinada para gerenciamento de payments."></HeaderTitle>
        </Col>

        <Col
          md={5}
          className="d-flex flex-row justify-content-end align-items-center"
        >
          <Button
            $isConfirm
            onClick={handleSubmit}
            type="button"
          />
        </Col>
      </Row>
      <S.PaymentContainer>
        <S.PaymentContent>
          <p>Tipos de payment</p>
          <MetodoPaymentSelect setPayment={setPayment} value={payment} />
        </S.PaymentContent>
      </S.PaymentContainer>
    </ContainerPage>
  );
}

export default Payment;
