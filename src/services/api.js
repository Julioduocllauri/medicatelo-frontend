const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

/**
 * Cliente API para Medicatelo
 */
class ApiService {
  
  /**
   * Obtener todos los productos
   */
  async getProducts() {
    const response = await fetch(`${API_URL}/products`);
    const data = await response.json();
    return data;
  }

  /**
   * Obtener producto por ID
   */
  async getProduct(id) {
    const response = await fetch(`${API_URL}/products/${id}`);
    const data = await response.json();
    return data;
  }

  /**
   * Filtrar productos por nivel
   */
  async getProductsByLevel(level) {
    const response = await fetch(`${API_URL}/products/filter/level/${level}`);
    const data = await response.json();
    return data;
  }

  /**
   * Generar recomendación
   */
  async generateRecommendation(consultationData) {
    const response = await fetch(`${API_URL}/recommendations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(consultationData),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'Error al generar recomendación');
    }
    
    const data = await response.json();
    return data;
  }

  /**
   * Generar recomendación rápida (sin guardar)
   */
  async quickRecommendation(consultationData) {
    const response = await fetch(`${API_URL}/recommendations/quick`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(consultationData),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'Error al generar recomendación');
    }
    
    const data = await response.json();
    return data;
  }

  /**
   * Obtener recomendación por ID
   */
  async getRecommendation(id) {
    const response = await fetch(`${API_URL}/recommendations/${id}`);
    const data = await response.json();
    return data;
  }

  /**
   * Crear consulta
   */
  async createConsultation(consultationData) {
    const response = await fetch(`${API_URL}/consultations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(consultationData),
    });
    
    const data = await response.json();
    return data;
  }

  /**
   * Obtener consulta con recomendación
   */
  async getConsultationWithRecommendation(consultationId) {
    const response = await fetch(`${API_URL}/consultations/${consultationId}/recommendation`);
    const data = await response.json();
    return data;
  }
}

export default new ApiService();
