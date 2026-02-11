import './Disclaimer.css';

/**
 * Componente de aviso legal / disclaimer médico
 */
function Disclaimer() {
  return (
    <div className="disclaimer">
      <span className="warning-icon">!</span>
      <p><strong>Aviso:</strong> Este sistema proporciona recomendaciones orientativas. NO sustituye el diagnóstico médico profesional. Consulte siempre a su médico.</p>
    </div>
  );
}

export default Disclaimer;
