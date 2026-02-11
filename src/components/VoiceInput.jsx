import { useState } from 'react';
import './VoiceInput.css';

/**
 * Componente para captura de voz usando Web Speech API
 * Convierte audio del usuario a texto
 */
function VoiceInput({ onTranscriptReady }) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [browserSupported, setBrowserSupported] = useState(true);

  const startListening = () => {
    // Verificar soporte del navegador
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setBrowserSupported(false);
      alert('Tu navegador no soporta reconocimiento de voz. Usa Chrome o Edge.');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.lang = 'es-ES'; // Español
    recognition.continuous = false; // No continuo
    recognition.interimResults = false; // Solo resultados finales

    recognition.onstart = () => {
      setIsListening(true);
      console.log('🎤 Escuchando...');
    };

    recognition.onresult = (event) => {
      const result = event.results[0][0].transcript;
      console.log('📝 Transcripción:', result);
      setTranscript(result);
      
      // Enviar al componente padre
      if (onTranscriptReady) {
        onTranscriptReady(result);
      }
    };

    recognition.onerror = (event) => {
      console.error('❌ Error de reconocimiento:', event.error);
      setIsListening(false);
      
      if (event.error === 'no-speech') {
        alert('No se detectó ningún sonido. Intenta de nuevo.');
      }
    };

    recognition.onend = () => {
      setIsListening(false);
      console.log('🛑 Reconocimiento finalizado');
    };

    recognition.start();
  };

  const clearTranscript = () => {
    setTranscript('');
  };

  return (
    <div className="voice-input">
      <div className="voice-container">
        <div className="voice-controls">
          <button 
            onClick={startListening} 
            disabled={isListening}
            className={`btn-voice ${isListening ? 'listening' : ''}`}
          >
            <div className="microphone-icon">
              <div className="mic-stand"></div>
              <div className="mic-waves">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
            <span className="btn-text">
              {isListening ? 'ESCUCHANDO...' : 'ACTIVAR RECONOCIMIENTO DE VOZ'}
            </span>
          </button>
          
          {transcript && (
            <button onClick={clearTranscript} className="btn-clear">
              <span className="clear-icon">×</span>
              <span>Limpiar</span>
            </button>
          )}
        </div>
      </div>

      {!browserSupported && (
        <div className="warning">
          <span className="warning-icon">!</span>
          <p>Tu navegador no soporta reconocimiento de voz. Usa Chrome o Edge.</p>
        </div>
      )}

      {transcript && (
        <div className="transcript-box">
          <div className="transcript-header">
            <span className="transcript-label">Transcripción</span>
            <div className="pulse-indicator"></div>
          </div>
          <p className="transcript-text">{transcript}</p>
        </div>
      )}

      {isListening && (
        <div className="listening-indicator">
          <div className="sound-wave">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <span className="listening-text">Procesando audio...</span>
        </div>
      )}
    </div>
  );
}

export default VoiceInput;
