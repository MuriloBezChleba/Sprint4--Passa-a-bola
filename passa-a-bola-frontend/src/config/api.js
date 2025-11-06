/**
 * Configuração da API
 * Define a URL base da API backend
 */

// URL da API - usar variável de ambiente ou localhost
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

/**
 * Configuração padrão para requisições fetch
 * @param {string} token - Token JWT para autenticação
 * @returns {object} Headers configurados
 */
export const getAuthHeaders = (token) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  return headers;
};

/**
 * Função auxiliar para fazer requisições GET
 * @param {string} endpoint - Endpoint da API
 * @param {string} token - Token JWT (opcional)
 * @returns {Promise} Response da API
 */
export const apiGet = async (endpoint, token = null) => {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'GET',
      headers: getAuthHeaders(token),
    });
    
    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Erro na requisição GET:', error);
    throw error;
  }
};

/**
 * Função auxiliar para fazer requisições POST
 * @param {string} endpoint - Endpoint da API
 * @param {object} data - Dados para enviar
 * @param {string} token - Token JWT (opcional)
 * @returns {Promise} Response da API
 */
export const apiPost = async (endpoint, data, token = null) => {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'POST',
      headers: getAuthHeaders(token),
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || `Erro na requisição: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Erro na requisição POST:', error);
    throw error;
  }
};

/**
 * Função auxiliar para fazer requisições PUT
 * @param {string} endpoint - Endpoint da API
 * @param {object} data - Dados para atualizar
 * @param {string} token - Token JWT (opcional)
 * @returns {Promise} Response da API
 */
export const apiPut = async (endpoint, data, token = null) => {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'PUT',
      headers: getAuthHeaders(token),
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Erro na requisição PUT:', error);
    throw error;
  }
};

/**
 * Função auxiliar para fazer requisições DELETE
 * @param {string} endpoint - Endpoint da API
 * @param {string} token - Token JWT (opcional)
 * @returns {Promise} Response da API
 */
export const apiDelete = async (endpoint, token = null) => {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'DELETE',
      headers: getAuthHeaders(token),
    });
    
    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Erro na requisição DELETE:', error);
    throw error;
  }
};

