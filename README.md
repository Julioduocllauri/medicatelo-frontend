# Medicatelo Frontend

Frontend de React + Vite para el sistema de recomendación médica orientativa.

## 🚀 Características

- ✅ Reconocimiento de voz (Web Speech API)
- ✅ Formulario interactivo de síntomas y objetivos  
- ✅ Visualización de recomendaciones con prioridades
- ✅ Plan de tratamiento estructurado
- ✅ Diseño responsive y moderno
- ✅ Conectado al backend en Render

## 📦 Instalación

```bash
# Instalar dependencias
npm install

# Configurar variables de entorno
copy .env.example .env

# Iniciar servidor de desarrollo
npm run dev
```

## 🎤 Reconocimiento de Voz

La aplicación usa **Web Speech API** para convertir voz a texto.

**Navegadores compatibles:**
- ✅ Google Chrome (recomendado)
- ✅ Microsoft Edge
- ❌ Firefox (soporte limitado)
- ❌ Safari (soporte limitado)

## 🔧 Configuración

Edita `.env` y configura la URL del backend:

```env
VITE_API_URL=http://localhost:3000/api
```

Para producción:
```env
VITE_API_URL=https://tu-backend.onrender.com/api
```

## 📁 Estructura

```
src/
├── components/
│   ├── VoiceInput.jsx          # Componente de reconocimiento de voz
│   ├── ConsultationForm.jsx    # Formulario de consulta
│   ├── RecommendationView.jsx  # Vista de recomendación
│   └── Disclaimer.jsx          # Aviso legal
├── services/
│   └── api.js                  # Cliente API
├── App.jsx                     # Componente principal
└── main.jsx                    # Punto de entrada
```

## 🎨 Scripts

- `npm run dev` - Desarrollo (puerto 5173)
- `npm run build` - Compilar para producción
- `npm run preview` - Vista previa de producción

## 🌐 Uso

1. Abre http://localhost:5173
2. Haz clic en "🎤 Habla y cuéntame tus síntomas"
3. Habla claramente tus síntomas (ej: "me duele la cabeza y tengo fiebre")
4. También puedes agregar síntomas manualmente
5. Opcionalmente, configura presupuesto y nivel
6. Haz clic en "Obtener Recomendación"
7. Revisa los productos recomendados y el plan de tratamiento

## ⚠️ Importante

Este sistema es **orientativo únicamente** y **NO reemplaza** consulta médica profesional.
