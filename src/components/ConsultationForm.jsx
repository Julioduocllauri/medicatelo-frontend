import { useState } from 'react';
import VoiceInput from './VoiceInput';
import './ConsultationForm.css';

/**
 * Formulario principal de consulta
 * Incluye entrada por voz y campos manuales
 */
function ConsultationForm({ onSubmit, isLoading }) {
  const [formData, setFormData] = useState({
    symptoms: [],
    objectives: [],
    max_budget: '',
    desired_level: '',
    raw_audio_text: ''
  });

  const [symptomInput, setSymptomInput] = useState('');
  const [objectiveInput, setObjectiveInput] = useState('');

  // Procesar transcripción de voz
  const handleVoiceTranscript = (transcript) => {
    setFormData(prev => ({
      ...prev,
      raw_audio_text: transcript
    }));

    // Intentar extraer síntomas automáticamente (simplificado)
    const extractedSymptoms = extractSymptomsFromText(transcript);
    if (extractedSymptoms.length > 0) {
      setFormData(prev => ({
        ...prev,
        symptoms: extractedSymptoms
      }));
    }
  };

  // Extracción simple de síntomas del texto
  const extractSymptomsFromText = (text) => {
    const lowerText = text.toLowerCase();
    const symptoms = [];

    const symptomKeywords = [
      'dolor de cabeza', 'dolor muscular', 'fiebre', 'malestar',
      'cansancio', 'fatiga', 'acidez', 'alergia', 'tos',
      'dolor', 'inflamación', 'mareo'
    ];

    symptomKeywords.forEach(keyword => {
      if (lowerText.includes(keyword)) {
        symptoms.push({ name: keyword, severity: 7 }); // Gravedad por defecto
      }
    });

    return symptoms;
  };

  // Agregar síntoma manualmente
  const addSymptom = () => {
    if (symptomInput.trim()) {
      setFormData(prev => ({
        ...prev,
        symptoms: [...prev.symptoms, { name: symptomInput.trim(), severity: 5 }]
      }));
      setSymptomInput('');
    }
  };

  // Eliminar síntoma
  const removeSymptom = (index) => {
    setFormData(prev => ({
      ...prev,
      symptoms: prev.symptoms.filter((_, i) => i !== index)
    }));
  };

  // Agregar objetivo
  const addObjective = () => {
    if (objectiveInput.trim()) {
      setFormData(prev => ({
        ...prev,
        objectives: [...prev.objectives, objectiveInput.trim()]
      }));
      setObjectiveInput('');
    }
  };

  // Eliminar objetivo
  const removeObjective = (index) => {
    setFormData(prev => ({
      ...prev,
      objectives: prev.objectives.filter((_, i) => i !== index)
    }));
  };

  // Enviar formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.symptoms.length === 0) {
      alert('Por favor, ingresa al menos un síntoma');
      return;
    }

    // Preparar datos
    const consultationData = {
      symptoms: formData.symptoms,
      objectives: formData.objectives.length > 0 ? formData.objectives : undefined,
      max_budget: formData.max_budget ? parseFloat(formData.max_budget) : undefined,
      desired_level: formData.desired_level || undefined,
      raw_audio_text: formData.raw_audio_text || undefined
    };

    onSubmit(consultationData);
  };

  return (
    <div className="consultation-form">
      <div className="form-header">
        <h2>Análisis de Síntomas</h2>
        <div className="header-line"></div>
      </div>

      {/* Entrada por voz */}
      <VoiceInput onTranscriptReady={handleVoiceTranscript} />

      <form onSubmit={handleSubmit}>
        {/* Síntomas */}
        <div className="form-section">
          <label>Síntomas *</label>
          <div className="input-group">
            <input
              type="text"
              value={symptomInput}
              onChange={(e) => setSymptomInput(e.target.value)}
              placeholder="Ej: dolor de cabeza, fiebre..."
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSymptom())}
            />
            <button type="button" onClick={addSymptom} className="btn-add">
              <span className="btn-icon">+</span>
              <span>Agregar</span>
            </button>
          </div>

          {formData.symptoms.length > 0 && (
            <div className="chips-container">
              {formData.symptoms.map((symptom, index) => (
                <div key={index} className="chip">
                  {symptom.name}
                  <button 
                    type="button" 
                    onClick={() => removeSymptom(index)}
                    className="chip-remove"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Objetivos */}
        <div className="form-section">
          <label>Objetivos (opcional)</label>
          <div className="input-group">
            <input
              type="text"
              value={objectiveInput}
              onChange={(e) => setObjectiveInput(e.target.value)}
              placeholder="Ej: alivio rápido, reducir inflamación..."
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addObjective())}
            />
            <button type="button" onClick={addObjective} className="btn-add">
              <span className="btn-icon">+</span>
              <span>Agregar</span>
            </button>
          </div>

          {formData.objectives.length > 0 && (
            <div className="chips-container">
              {formData.objectives.map((objective, index) => (
                <div key={index} className="chip chip-objective">
                  {objective}
                  <button 
                    type="button" 
                    onClick={() => removeObjective(index)}
                    className="chip-remove"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Presupuesto */}
        <div className="form-section">
          <label>Presupuesto máximo (opcional)</label>
          <input
            type="number"
            min="0"
            step="0.01"
            value={formData.max_budget}
            onChange={(e) => setFormData({ ...formData, max_budget: e.target.value })}
            placeholder="Ej: 150"
            className="input-budget"
          />
        </div>

        {/* Nivel deseado */}
        <div className="form-section">
          <label>Nivel de complejidad (opcional)</label>
          <select
            value={formData.desired_level}
            onChange={(e) => setFormData({ ...formData, desired_level: e.target.value })}
            className="select-level"
          >
            <option value="">Cualquiera</option>
            <option value="basico">Básico (venta libre)</option>
            <option value="medio">Medio</option>
            <option value="avanzado">Avanzado</option>
          </select>
        </div>

        {/* Botón de envío */}
        <button 
          type="submit" 
          className="btn-submit"
          disabled={isLoading || formData.symptoms.length === 0}
        >
          {isLoading ? (
            <>
              <span className="loading-spinner"></span>
              <span>Analizando datos...</span>
            </>
          ) : (
            <>
              <span className="btn-glow"></span>
              <span>GENERAR RECOMENDACIÓN</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}

export default ConsultationForm;
