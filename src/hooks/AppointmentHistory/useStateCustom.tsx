import { useState } from "react";
import { Service } from "../../models/Service";
import { SelectOption } from "../../models/SelectOptions";
import { Appointment } from "../../models/Appointment";
import { DecodedToken } from "../../models/DecodedToken";

export const useStateCustom = () => {
  const [showModalAppointmentHistoryInfo, setShowModalAppointmentHistoryInfo] =
    useState<boolean>(false);
  const [
    showModalAppointmentHistoryStatus,
    setShowModalAppointmentHistoryStatus,
  ] = useState<boolean>(false);
  const [selectableBoxServices, setSelectableBoxServices] = useState<Service[]>(
    []
  );
  const [selectedAppointmentHistoryId, setSelectedAppointmentHistoryId] =
    useState<number>(0);
  const [options, setOptions] = useState<SelectOption[]>([]);
  const [statusAppointment, setStatusAppointment] = useState<SelectOption[]>(
    []
  );
  const [rows, setRows] = useState<Appointment[]>([]);
  const [decodedData, setDecodedData] = useState<DecodedToken | null>(null);
  const [selectedAppointmentIds, setSelectedAppointmentIds] = useState<
    number[]
  >([]);
  return {
    showModalAppointmentHistoryInfo,
    setShowModalAppointmentHistoryInfo,
    showModalAppointmentHistoryStatus,
    setShowModalAppointmentHistoryStatus,
    selectableBoxServices,
    setSelectableBoxServices,
    selectedAppointmentHistoryId,
    setSelectedAppointmentHistoryId,
    options,
    setOptions,
    statusAppointment,
    setStatusAppointment,
    rows,
    setRows,
    decodedData,
    setDecodedData,
    selectedAppointmentIds,
    setSelectedAppointmentIds,
  };
};
