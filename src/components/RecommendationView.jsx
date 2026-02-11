import './RecommendationView.css';

/**
 * Componente para mostrar la recomendación generada
 */
function RecommendationView({ recommendation, onNewConsultation }) {
  if (!recommendation) return null;

  const { products, treatment_plan, total_cost, explanation, disclaimer } = recommendation;

  return (
    <div className="recommendation-view">
      <div className="recommendation-header">
        <div className="header-content">
          <h2>RECOMENDACIÓN GENERADA</h2>
          <div className="status-badge">COMPLETADO</div>
        </div>
        <button onClick={onNewConsultation} className="btn-new">
          <span className="refresh-icon">↻</span>
          <span>Nueva Consulta</span>
        </button>
      </div>

      {/* Productos recomendados */}
      <div className="products-section">
        <h3>
          <span className="section-icon"></span>
          Productos Recomendados
        </h3>
        <div className="products-grid">
          {products.map((product, index) => (
            <div key={product.product_id} className={`product-card priority-${product.priority}`}>
              <div className="product-rank">#{index + 1}</div>
              <div className="product-priority">{getPriorityLabel(product.priority)}</div>
              <h4>{product.name}</h4>
              <p className="product-reason">{product.reason}</p>
              <div className="product-price">${product.price}</div>
              {product.score && (
                <div className="product-score">
                  <small>Score: {product.score}</small>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Plan de tratamiento */}
      {treatment_plan && (treatment_plan.immediate?.length > 0 || treatment_plan.complementary?.length > 0) && (
        <div className="treatment-section">
          <h3>
            <span className="section-icon"></span>
            Plan de Tratamiento
          </h3>
          
          {treatment_plan.immediate && treatment_plan.immediate.length > 0 && (
            <div className="treatment-group">
              <h4>
                <span className="priority-dot high"></span>
                Tratamiento Inmediato
              </h4>
              {treatment_plan.immediate.map((item, index) => (
                <div key={index} className="treatment-item immediate">
                  <strong>{item.product_name}</strong>
                  <p><strong>Dosis:</strong> {item.dosage}</p>
                  {item.duration && <p><strong>Duración:</strong> {item.duration}</p>}
                </div>
              ))}
            </div>
          )}

          {treatment_plan.complementary && treatment_plan.complementary.length > 0 && (
            <div className="treatment-group">
              <h4>
                <span className="priority-dot medium"></span>
                Tratamiento Complementario
              </h4>
              {treatment_plan.complementary.map((item, index) => (
                <div key={index} className="treatment-item complementary">
                  <strong>{item.product_name}</strong>
                  <p><strong>Dosis:</strong> {item.dosage}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Costo total */}
      <div className="cost-section">
        <div className="cost-container">
          <h3>Costo Total Estimado</h3>
          <div className="total-cost">${parseFloat(total_cost).toFixed(2)}</div>
          <div className="cost-indicator"></div>
        </div>
      </div>

      {/* Explicación */}
      {explanation && (
        <div className="explanation-section">
          <h3>
            <span className="section-icon"></span>
            Análisis Detallado
          </h3>
          <p className="explanation-text">{explanation}</p>
        </div>
      )}

      {/* Disclaimer legal */}
      <div className="disclaimer-section">
        <div className="disclaimer-icon">!</div>
        <p className="disclaimer-text">
          {disclaimer || 'Esta es una recomendación orientativa. NO reemplaza una consulta médica profesional. Consulte a su médico antes de tomar cualquier medicamento.'}
        </p>
      </div>
    </div>
  );
}

function getPriorityLabel(priority) {
  const labels = {
    high: 'ALTA',
    medium: 'MEDIA',
    low: 'BAJA'
  };
  return labels[priority] || 'SIN PRIORIDAD';
}

export default RecommendationView;
