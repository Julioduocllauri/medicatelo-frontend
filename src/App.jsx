import { useState } from 'react';
import ConsultationForm from './components/ConsultationForm';
import RecommendationView from './components/RecommendationView';
import Disclaimer from './components/Disclaimer';
import api from './services/api';
import './App.css';

function App() {
  const [recommendation, setRecommendation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleConsultationSubmit = async (consultationData) => {
    setIsLoading(true);
    setError(null);

    try {
      console.log('📤 Enviando consulta:', consultationData);
      
      // Generar recomendación
      const response = await api.generateRecommendation(consultationData);
      
      console.log('✅ Recomendación recibida:', response);
      
      if (response.success && response.data) {
        setRecommendation(response.data);
      } else {
        throw new Error('No se pudo generar la recomendación');
      }
    } catch (err) {
      console.error('❌ Error:', err);
      setError(err.message || 'Error al generar recomendación');
      alert('Error: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewConsultation = () => {
    setRecommendation(null);
    setError(null);
  };

  return (
    <div className="app">
      {/* Estrellas flotantes decorativas */}
      <div className="stars-layer">
        <span className="star" style={{top: '15%', left: '10%'}}></span>
        <span className="star" style={{top: '25%', left: '85%'}}></span>
        <span className="star" style={{top: '45%', left: '15%'}}></span>
        <span className="star" style={{top: '60%', left: '75%'}}></span>
        <span className="star" style={{top: '80%', left: '20%'}}></span>
        <span className="star" style={{top: '35%', left: '50%'}}></span>
        <span className="star" style={{top: '70%', left: '90%'}}></span>
        <span className="star" style={{top: '10%', left: '60%'}}></span>
      </div>

      <header className="app-header">
        <div className="header-content">
          <div className="logo-container">
            <div className="logo-circle"></div>
            <h1>MEDICATELO</h1>
          </div>
          <p className="app-subtitle">SISTEMA DE RECOMENDACIÓN MÉDICA INTELIGENTE</p>
        </div>
        <div className="header-bg-animation"></div>
      </header>

      <main className="app-main">
        {/* Formulario de consulta */}
        {!recommendation && (
          <ConsultationForm 
            onSubmit={handleConsultationSubmit}
            isLoading={isLoading}
          />
        )}

        {/* Vista de recomendación */}
        {recommendation && (
          <RecommendationView 
            recommendation={recommendation}
            onNewConsultation={handleNewConsultation}
          />
        )}

        {/* Mensaje de error */}
        {error && (
          <div className="error-message">
            ❌ {error}
          </div>
        )}

        {/* Disclaimer legal */}
        <Disclaimer />
      </main>

      <footer className="app-footer">
        <div className="footer-content">
          <p>© 2026 MEDICATELO - Powered by AI-Assisted Recommendations</p>
          <small>Orientative system · Does not replace professional medical consultation</small>
        </div>
      </footer>
    </div>
  );
}

export default App;
