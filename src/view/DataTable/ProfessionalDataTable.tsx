import React, { useEffect, useRef, useState } from "react";
import {
  DataGrid,
  GridCellParams,
  GridColDef,
  GridRenderCellParams,
  GridRowSelectionModel,
} from "@mui/x-data-grid";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { updateUserEmployee } from "../../services/EmployeeServices";
import { useSnackbar } from "notistack";
import { ServiceType } from "../../models/ServiceType";
import { UserEmployeeUpdate } from "../../models/UserEmployee";
import { Appointment } from "../../models/Appointment";
import Paper from "@mui/material/Paper";
import info from "../../assets/info.svg";
import edit from "../../assets/edit.svg";
import confirm from "../../assets/confirmCardStore.svg";
import remove from "../../assets/removeRed.svg";
import EditUserEmployeeModal from "../Modal/EditUserEmployeeModal";
import InfoEmployeeServiceModal from "../Modal/InfoEmployeeServiceModal";
import { decodeToken } from "../../services/AuthService";

interface DecodedToken {
  userId: string;
  userEmail: string;
  userRole: string;
}

interface ProfessionalDataTableProps {
  service?: boolean;
  professional?: boolean;
  appointment?: boolean;
  loja?: boolean;
  rowsService?: ServiceType[];
  rowsAppointment?: Appointment[];
  rowsProfessional?: Array<{
    id: number;
    name: string;
    lastName: string;
    phone: string;
    services: number[];
  }>;
  onRowSelect?: (id: number[]) => void;
  setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  update: boolean;
  fetchData: () => void;
}

const ProfessionalDataTable: React.FC<ProfessionalDataTableProps> = ({
  rowsAppointment,
  rowsService,
  rowsProfessional,
  service,
  appointment,
  professional,
  onRowSelect,
  fetchData,
  update,
  setUpdate,
}) => {
  const [showModal, setShowModal] = useState({ edit: false, info: false });
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number>();
  const [columnWidth, setColumnWidth] = useState(250);
  const containerRef = useRef<HTMLDivElement>(null);
  const handleClose = () => setShowModal({ edit: false, info: false });
  const handleShowModal = (type: "edit" | "info", id: number) => {
    setSelectedEmployeeId(id);
    setShowModal({ ...showModal, [type]: true });
  };
  const { userEmployeeUpdateContext, userRoleContext } =
    useContext(AppContext)!;

  const storedToken = localStorage.getItem("authToken");
  const [decodedData, setDecodedData] = useState<DecodedToken>();

  const { enqueueSnackbar } = useSnackbar();

  // const updateUser = async (id: number, data: UserEmployeeUpdate) => {
  //   try {
  //     const response = await updateUserEmployee(id, data);
  //     setUpdate(false);

  //     if (response.status === 200 || response.status === 204) {
  //       enqueueSnackbar(`Profissional editado com sucesso!`, {
  //         variant: "success",
  //       });
  //     }
  //   } catch (error: any) {
  //     console.error("Erro ao editar o Usuário e Funcionario", error.message);
  //   }
  // };

  const fetchToken = async () => {
    if (storedToken) {
      try {
        const data = await decodeToken(storedToken);
        setDecodedData(data);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  };

  useEffect(() => {
    fetchData();
    setUpdate(false);
  }, [update]);

  useEffect(() => {
    const updateColumnWidth = () => {
      if (containerRef.current) {
        const totalWidth = containerRef.current.offsetWidth;
        const columnsCount = userRoleContext?.userRole === "Admin" ? 5 : 4;
        setColumnWidth(Math.floor(totalWidth / columnsCount));
      }
    };
    updateColumnWidth();
    fetchToken();
    window.addEventListener("resize", updateColumnWidth);

    return () => window.removeEventListener("resize", updateColumnWidth);
  }, []);

  const handleRowClick = (ids: number[]) => onRowSelect?.(ids);

  const columns: GridColDef[] = professional
    ? [
        {
          field: "fullName",
          headerName: "Nome Completo",
          width: columnWidth,
          align: "center" as const,
          headerAlign: "center" as const,
          renderCell: (params) => `${params.row.name} ${params.row.lastName}`,
        },
        {
          field: "email",
          headerName: "Email",
          width: columnWidth,
          align: "center" as const,
          headerAlign: "center" as const,
        },
        {
          field: "phone",
          headerName: "Telefone",
          width: columnWidth,
          align: "center" as const,
          headerAlign: "center" as const,
        },
        {
          field: "active",
          headerName: "Ativo",
          type: "boolean",
          width: columnWidth,
          align: "center" as const,
          headerAlign: "center" as const,
          renderCell: (params: GridRenderCellParams) =>
            params.value === "true" ? (
              <img style={{ cursor: "pointer" }} src={confirm} alt="Ativo" />
            ) : (
              <img style={{ cursor: "pointer" }} src={remove} alt="Inativo" />
            ),
        },

        ...(decodedData?.userRole === "Admin"
          ? [
              {
                field: "acoes",
                headerName: "Ações",
                renderCell: (params: GridCellParams) => (
                  <div
                    style={{
                      display: "flex",
                      gap: "50px",
                      justifyContent: "center",
                      margin: "12.5px 0px 0px 5px",
                    }}
                  >
                    <img
                      style={{ cursor: "pointer" }}
                      src={edit}
                      onClick={() => handleShowModal("edit", params.row.id)}
                      alt="Editar"
                    />
                  </div>
                ),
                width: columnWidth,
                align: "center" as const,
                headerAlign: "center" as const,
              },
            ]
          : []),
      ]
    : [];

  let rows: any[] = [];

  if (professional) rows = rowsProfessional || [];

  return (
    <div ref={containerRef} style={{ marginTop: "3rem" }}>
      <Paper
        sx={{
          height: 800,
          width: "100%",
          borderRadius: "15px",
          overflow: "hidden",
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{ pagination: { paginationModel: { pageSize: 13 } } }}
          pageSizeOptions={[13, 20, 25]}
          checkboxSelection
          disableRowSelectionOnClick
          onRowSelectionModelChange={(newSelection: GridRowSelectionModel) => {
            const selectedRowIds = newSelection.map((id) => Number(id));
            if (selectedRowIds.every((id) => !isNaN(id)))
              handleRowClick(selectedRowIds);
          }}
          sx={{ border: 0 }}
        />
      </Paper>
      {showModal.info && (
        <InfoEmployeeServiceModal
          title="Informações do professional"
          info
          subTitle="Todos os serviços que contém esse professional."
          handleClose={handleClose}
          handleShow={() => setShowModal({ ...showModal, info: true })}
          size="small"
          fetchData={() => {}}
          rowId={selectedEmployeeId}
        />
      )}
      {showModal.edit && (
        <EditUserEmployeeModal
          title="Editar professional"
          subTitle="Preencha as informações abaixo para editar o professional."
          edit
          handleClose={handleClose}
          handleShow={() => setShowModal({ ...showModal, edit: true })}
          size="large"
          rowId={selectedEmployeeId}
          setUpdate={setUpdate}
        />
      )}
    </div>
  );
};

export default ProfessionalDataTable;
