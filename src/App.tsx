import "./App.css";
import Navigation from "./view/Sidebar";
import Dashboard from "./pages/Dashboard";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Servico from "./pages/Servico";
import Profissional from "./pages/Profissional";
import Imagem from "./pages/Imagem";
import Loja from "./pages/Loja";
import Pagamento from "./pages/Pagamento";
import Chamada from "./pages/Chamada";
import { Agendamento } from "./pages/Agendamento";
import AgendamentoHistorico from "./pages/AgendamentoHistorico";
import LojaConfigurar from "./pages/LojaConfigurar";
import Login from "./pages/Login";

function App() {
  const isAuthenticated = false; // Troque para sua lógica de autenticação

  return (
    <div className="App" style={{ display: "flex" }}>
      <Router>
        <Routes>
          {/* Tela de Login, isolada */}
          <Route path="/" element={<Login />} />

          {/* Rotas protegidas para usuários autenticados */}
          {isAuthenticated && (
            <Route
              path="/*"
              element={
                <>
                  <Navigation />
                  <div style={{ flex: 1, marginLeft: "18.75rem" }}>
                    <Routes>
                      <Route path="/home" element={<h1>Home</h1>} />
                      <Route path="/agendamento" element={<Agendamento />} />
                      <Route
                        path="/agendamento-historico"
                        element={<AgendamentoHistorico />}
                      />
                      <Route
                        path="/dashboard"
                        element={<h1 style={{ padding: "40px" }}>Dashboard</h1>}
                      />
                      <Route path="/servico" element={<Servico />} />
                      <Route path="/profissional" element={<Profissional />} />
                      <Route path="/imagem" element={<Imagem />} />
                      <Route path="/loja" element={<Loja />} />
                      <Route
                        path="/loja-configurar"
                        element={<LojaConfigurar />}
                      />
                      <Route path="/pagamento" element={<Pagamento />} />
                      <Route path="/chamada" element={<Chamada />} />
                    </Routes>
                  </div>
                </>
              }
            />
          )}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
