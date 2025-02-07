import { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import { Col, Row } from "react-bootstrap";

import Button from "../../components/Button";
import InputGroupProfessionalAdd from "../../components/InputGroup/InputGroupProfessionalAdd";

import { getServiceTypes } from "../../services/ServiceTypeServices";
import {
  createEmployee,
} from "../../services/EmployeeServices";

import closeIcon from "../../assets/remove.svg";

import { UserEmployee } from "../../models/UserEmployee";
import { Employee } from "../../models/Employee";
import { SelectOption } from "../../models/SelectOptions";

import * as S from "./Modal.styles";
import { getUserById } from "../../services/UserServices";

interface AddUserEmployeeModalProps {
  title: string;
  subTitle?: string;
  handleShow: () => void;
  handleClose: () => void;
  fetchData: () => void;
  size: "small" | "medium" | "large";
  rowId?: number;
}

const AddUserEmployeeModal: React.FC<AddUserEmployeeModalProps> = ({
  handleClose,
  title,
  subTitle,
  size,
  fetchData,
}) => {
  const [formValuesProfessional, setFormValuesProfessional] =
    useState<UserEmployee>({
      id: 0,
      userId: 0,
      name: "",
      lastName: "",
      email: "",
      phone: "",
      active: "false",
      password: "",
      userTypeId: 0,
      serviceIds: [] as number[],
      storeId: 0,
    });

  const [serviceType, setServiceType] = useState([]);
  const [loading, setLoading] = useState(false);
  const [employee, setEmployee] = useState<SelectOption | null>(null);

  const storeUser = Number(localStorage.getItem("storeUser"));

  const { enqueueSnackbar } = useSnackbar();

  const sizeMap = {
    small: "650px",
    medium: "850px",
    large: "1050px",
  };

  useEffect(() => {
    async function fetchServices() {
      const services = await getServiceTypes();
      setServiceType(services.data);
    }
    fetchServices();
  }, []);

  const handleSubmit = async () => {
    if (employee) {
      const responseEmployee = await getUserById(employee.value);

      const employeeData = {
        id: 0,
        userId: responseEmployee.id,
        active: "true",
        storeId: Number(storeUser),
        serviceIds: formValuesProfessional.serviceIds,
      };

      console.log(employeeData);
      
      handleEmployeeAdd([employeeData]);
    }

    fetchData();
    handleClose();
  };

  const handleEmployeeAdd = async (employeeData: Employee[]) => {
    setLoading(true);
    try {
      const updatedEmployeeData = employeeData.map((employee) => ({
        ...employee,
        serviceIds: formValuesProfessional.serviceIds,
      })); 
      
      console.log(updatedEmployeeData);
      
      // const response = await createEmployee(updatedEmployeeData);
      // if (response) {
      //   enqueueSnackbar("Profissional adicionado com sucesso.", {
      //     variant: "success",
      //   });
      // }
    } catch (error) {
      console.error("Erro ao registrar o profissional: ", error);
      enqueueSnackbar("Ocorreu um erro. Por favor, tente novamente.", {
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <S.Overlay>
      <div
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "8px",
          maxWidth: sizeMap[size],
          width: "100%",
        }}
      >
        <Row>
          <Col md={10}>
            <h3>{title}</h3>
            <p>{subTitle}</p>
          </Col>
          <Col
            md={2}
            style={{ textAlign: "right", cursor: "pointer" }}
            onClick={handleClose}
          >
            <img
              src={closeIcon}
              alt="Close Icon"
              style={{ marginRight: "8px", verticalAlign: "middle" }}
              width={25}
            />
          </Col>
          <hr />
        </Row>      
          <InputGroupProfessionalAdd
            setFormValuesProfessional={setFormValuesProfessional}
            data={serviceType}
            setEmployee={setEmployee}
            employee={employee}
            addProf
          />
        <hr />
        <Row>
          <Col
            md={12}
            className="d-flex flex-row justify-content-center align-items-center"
          >
            <Button $isClosed type="button" onClick={handleClose} />
            <Button
              $isConfirm
              type="button"
              onClick={handleSubmit}
              disabled={loading}
            />
          </Col>
        </Row>
      </div>
    </S.Overlay>
  );
};

export default AddUserEmployeeModal;
