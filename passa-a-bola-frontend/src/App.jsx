import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Páginas
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Players from './pages/Players';
import Events from './pages/Events';
import Feed from './pages/Feed';

/**
 * Componente de rota protegida
 * Redireciona para login se o usuário não estiver autenticado
 */
const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

/**
 * Componente principal da aplicação
 * Configura roteamento e layout global
 */
function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <div className="flex-grow">
            <Routes>
              {/* Rotas Públicas */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Rotas Protegidas */}
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/players"
                element={
                  <PrivateRoute>
                    <Players />
                  </PrivateRoute>
                }
              />
              <Route
                path="/events"
                element={
                  <PrivateRoute>
                    <Events />
                  </PrivateRoute>
                }
              />
              <Route
                path="/feed"
                element={
                  <PrivateRoute>
                    <Feed />
                  </PrivateRoute>
                }
              />
              
              {/* Rota para páginas não encontradas (simulação) */}
              <Route path="/tournaments" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
              <Route path="/noticias" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
              <Route path="/perfil" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
              <Route path="/perfil/editar" element={<PrivateRoute><Dashboard /></PrivateRoute>} />

              {/* Rota 404 */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
