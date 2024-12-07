import React, { useState, useEffect } from "react";
import { ContainerPage } from "./_Page.styles";
import HeaderTitle from "../view/HeaderTitle";
import DataTable from "../view/DataTable";
import { Col, Row } from "react-bootstrap";
import Button from "../components/Button";
import Modal from "../view/Modal";
import { getUsuarios, deleteUsuario } from "../services/UsuarioServices";
import { getFuncionarios, deleteFuncionario, createFuncionarioUsuario, updateUsuarioFuncionario } from "../services/FuncionarioServices";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

interface Usuario {
  id: number;
  nome: string;
  sobrenome: string;
  email: string;
  telefone: string;
  senha: string;
  tipoUsuarioId: number;
}

interface Funcionario {
  id: number;
  usuarioId: number;
  ativo: string;
  servicosId: number[];
}

interface Row {
  id: number;
  nome: string;
  sobrenome: string;
  telefone: string;
  email: string;
  servicos: number[];
}

function Profissional() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
  const [rows, setRows] = useState<Row[]>([]);
  const [selectedUserIds, setSelectedUserIds] = useState<number[]>([]);
  const [show, setShow] = useState(false);
  const [post, setPost] = useState(false);
  const [update, setUpdate] = useState(false);

  const { 
    setUsuarioFuncionarioContext,
    usuarioFuncionarioContext,
    usuarioFuncionarioUpdateContext,
  } = useContext(AppContext)!;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const fetchData = async () => {
    try {

      // Usando os serviços para buscar dados
      const usuariosData = await getUsuarios();
      const funcionariosData = await getFuncionarios();

      const mappedRows: Row[] = funcionariosData.map((funcionario: Funcionario) => {
        const usuario = usuariosData.find((u: any) => u.id === funcionario.usuarioId);

        if (usuario) {
          return {
            id: usuario.id,
            nome: usuario.nome,
            sobrenome: usuario.sobrenome,
            telefone: usuario.telefone,
            email: usuario.email,
            ativo: funcionario.ativo,
            servicos: funcionario.servicosId || [],
          };
        }
        return null;
      }).filter(Boolean) as Row[];

      setUsuarios(usuariosData);
      setFuncionarios(funcionariosData);
      setRows(mappedRows);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  };

  const request = async () => {
    if (post) {
      if (usuarioFuncionarioContext !== null) {
        await createFuncionarioUsuario(usuarioFuncionarioContext);
      } else {
        console.error("Falha na requisição");
      }
      setUsuarioFuncionarioContext(null)
      setPost(false);
    }
  }

  useEffect(() => {
    request();
    fetchData();
  }, [post]);

  const handleDeleteUsers = async () => {
    console.log("IDs selecionados para exclusão: ", selectedUserIds); // Depuração para ver os IDs selecionados

    if (selectedUserIds.length > 0) {
      try {
        // Para cada ID de usuário selecionado, buscamos o ID do funcionário e deletamos o funcionário
        await Promise.all(
          selectedUserIds.map(async (usuarioId) => {
            try {
              // Buscar o funcionário associado ao usuário
              const funcionarioResponse = await getFuncionarios(); // Buscando todos os funcionários (pode otimizar aqui)
              const funcionario = funcionarioResponse.find((f: Funcionario) => f.usuarioId === usuarioId);

              if (funcionario) {
                const funcionarioId = funcionario.id; // O ID do funcionário associado

                // Deletar o funcionário
                await deleteFuncionario(funcionarioId);
                console.log(`Funcionário com ID ${funcionarioId} removido com sucesso!`);
              } else {
                console.log(`Nenhum funcionário encontrado para o usuário com ID ${usuarioId}`);
              }

              // Depois de deletar o funcionário, deletar o usuário
              await deleteUsuario(usuarioId);
              console.log(`Usuário com ID ${usuarioId} removido com sucesso!`);

            } catch (error) {
              console.error(`Erro ao remover o usuário ${usuarioId}:`, error);
            }
          })
        );

        alert("Usuários e funcionários removidos com sucesso!");
        fetchData();
        setSelectedUserIds([]); 
      } catch (error) {
        console.error("Erro ao remover os usuários:", error);
      }
    } else {
      alert("Nenhum usuário selecionado!");
    }
  };

  const handleRowSelect = (ids: number[]) => {
    console.log("IDs selecionados na tabela: ", ids);
    setSelectedUserIds(ids);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <ContainerPage style={{ height: "100vh" }}>
        <Row>
          <Col md={7} style={{ padding: "0px" }}>
            <HeaderTitle
              title="Profissional"
              subTitle="Área destinada para gerenciamento de profissionais."
            />
          </Col>

          <Col
            md={5}
            className="d-flex flex-row justify-content-end align-items-center"
          >
            <Button $isRemover type="button" onClick={handleDeleteUsers} /> {/* Botão para remover selecionados */}
            <Button $isAdicionar type="button" onClick={handleShow} />
          </Col>
        </Row>
        <DataTable
          profissional
          rowsProfissional={rows}
          onRowSelect={handleRowSelect} 
          setUpdate={setUpdate}
          fetchData={fetchData}
        />
        {show && (
          <Modal
            title="Adicionar profissional"
            subTitle="Preencha as informações abaixo para criar um novo profissional."
            profissional
            handleClose={handleClose}
            handleShow={handleShow}
            size="grande"
            fetchData={fetchData}
            addProf
            setUpdate={setUpdate}
            setPost={setPost}
          />
        )}
      </ContainerPage>
    </>
  );
}

export default Profissional;
