import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { ContainerPage } from "./_Page.styles";
import { Col, Row } from "react-bootstrap";
import { getStoreById, updateStore } from "../services/StoreServices";
import { Store, Store as StoreModel } from '../models/Store';
import * as S from "./Store.styles";
import HeaderTitle from "../view/HeaderTitle";
import Input from "../components/Input";
import Button from "../components/Button";
import CardStatus from "../components/Card/StatusCard";
import TimeCard from "../components/Card/TimeCard";
import WeekDayCard from "../components/Card/WeekDayCard";
import OpeningHoursSelect from "../components/Select/OpeningHoursSelect";
import OpeningWeekDaysSelect from "../components/Select/OpeningWeekDaysSelect";
import StoreDataSelect from "../components/Select/StoreDataSelect";
import ClosingDateCard from "../components/Card/ClosingDateCard";

function StoreConfigure() {
    const navigate = useNavigate();
    const [formValuesStore, setFormValuesStore] = useState({ active: false });
    const [store, setStore] = useState<StoreModel | undefined>();
    const [selectedTimes, setSelectedTimes] = useState<string[]>([]);
    const [openingWeekDay, setOpeningWeekDay] = useState<string[]>([]);
    const [closingDates, setClosingDates] = useState<Date[] | null>([]);
    const [statusStore, setStatusStore] = useState<boolean>();
    const { enqueueSnackbar } = useSnackbar();

    const handleInputChangeStore = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, type, checked, value } = event.target;

        setFormValuesStore((prev) => {
            const updatedValues = {
                ...prev,
                [name]: type === "checkbox" ? checked : value,
            };

            setStatusStore(updatedValues.active);
            return updatedValues;
        });
    };

    const fetchData = async () => {
        try {
            const response = await getStoreById(1);
            if (response) {
                setStore(response);

                setFormValuesStore((prev) => ({
                    ...prev,
                    active: response.status,
                }));

                setStatusStore(response.status);

                if (!selectedTimes || selectedTimes.length === 0) {
                    const timeArray = response.operatingHours
                        ? response.operatingHours.split(" - ")
                        : [];
                    setSelectedTimes(timeArray);
                };

                if (!openingWeekDay || openingWeekDay.length === 0) {
                    const OpeningWeekDayArray = response.operatingDays
                        ? response.operatingDays
                        : [];
                    setOpeningWeekDay(OpeningWeekDayArray);
                };

                if (!closingDates || closingDates.length === 0) {
                    const ClosingDatesArray = response.closingDays
                        ? response.closingDays.map((data: string) => new Date(data))
                        : [];
                    setClosingDates(ClosingDatesArray);
                }
            };

        } catch (error) {
            console.log("Erro na requisição da store", error)
        }
    };

    useEffect(() => {
        fetchData();
    }, [])

    const handleSubmit = async () => {
        if (store) {
            const storeMapped: Store = {
                ...store,
                status: formValuesStore.active,
                operatingHours: selectedTimes.join(" - "),
                closingDays: closingDates
                    ? closingDates
                        .filter((data) => data instanceof Date && !isNaN(data.getTime()))
                        .map((data) => data.toISOString())
                    : [],
                operatingDays: openingWeekDay,
            };

            try {
                await updateStore(storeMapped.id, storeMapped);
                enqueueSnackbar(`Store editado com sucesso!`, { variant: "success" });

                navigate('/store');
            } catch (error) {
                enqueueSnackbar(`Falha ao editar store com ID ${storeMapped.id}`, { variant: "error" });
            }
        }
    };

    const handleDateChange = (selectedDates: Date[] | null) => {
        setClosingDates(selectedDates);

        setFormValuesStore((prevValues) => ({
            ...prevValues,
            closingDates: selectedDates
        }));
    };

    const handleRemoveDataClosed = (dateToRemove: Date) => {
        setClosingDates((closingDates) => {
            if (closingDates) {
                return closingDates.filter((data) => data.getTime() !== dateToRemove.getTime());
            } else {
                return []; 
            }
        });
    };

    const handleRemoveDateClosed = (dayToRemove: string) => {
        setOpeningWeekDay((prevDays) =>
            prevDays.filter((day) => day !== dayToRemove)
        );
    };

    const handleButtonClick = () => {
        navigate('/store');
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
                    <Button $isBack onClick={handleButtonClick} type="button" />
                    <Button $isConfirm onClick={handleSubmit} type="button" />
                </Col>
            </Row>
            <Row>
                <Col md={3} style={{ padding: "0px" }}>
                    <S.StoreContainer>
                        <S.StoreContent>
                            <p>Store</p>
                            <Input
                                type="toggle"
                                name="active"
                                value={formValuesStore.active.toString()}
                                onChange={handleInputChangeStore}
                                width="300"
                            />
                        </S.StoreContent>
                        <S.StoreContent>
                            <p>Horários de funcionamento</p>
                            <OpeningHoursSelect setTime={setSelectedTimes} />
                        </S.StoreContent>
                        <S.StoreContent>
                            <p>Dias de funcionamento</p>
                            <OpeningWeekDaysSelect setOpeningWeekDay={setOpeningWeekDay} />
                        </S.StoreContent>
                        <S.StoreContent>
                            <p>Datas de fechamento</p>
                            <StoreDataSelect setClosingDates={handleDateChange} />
                        </S.StoreContent>
                    </S.StoreContainer>
                </Col>
                <Col md={9}>
                    <h3 style={{ margin: "50px 0 25px 0" }}>Dados da store</h3>
                    <S.CardStoreWrapper className="d-flex justify-content-start align-items-center">
                        <CardStatus statusStore={statusStore} data={store} title="Status" icon="confirm" />
                        <TimeCard selectedTimes={selectedTimes} title="Hora de abertura" icon="confirm" />
                        <TimeCard selectedTimes={selectedTimes} title="Hora de fechamento" icon="confirm" />
                    </S.CardStoreWrapper>

                    <h3 style={{ margin: '50px 0 25px 0' }}>Dias de funcionamento</h3>
                    <S.CardStoreWrapper className="d-flex justify-content-start align-items-center flex-wrap">
                        {
                            openingWeekDay.map((item: any) => (
                                <WeekDayCard
                                    text={item}
                                    icon="remove"
                                    onRemove={() => handleRemoveDateClosed(item)}
                                />
                            ))
                        }
                    </S.CardStoreWrapper>

                    <h3 style={{ margin: '50px 0 25px 0' }}>Dias de fechamento</h3>
                    <S.CardStoreWrapper className="d-flex justify-content-start align-items-center flex-wrap">
                        {
                            closingDates ?
                                closingDates.map((item: Date, index: number) => (
                                    <ClosingDateCard
                                        key={index}
                                        text={item.toLocaleDateString()}
                                        icon="remove"
                                        onRemove={() => handleRemoveDataClosed(item)}
                                    />
                                )) : ''
                        }
                    </S.CardStoreWrapper>

                </Col>
            </Row>
        </ContainerPage>
    );
}

export default StoreConfigure;
