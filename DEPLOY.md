# Deployment - Medicatelo Frontend (Vercel)

## Variables de Entorno en Vercel

Configura estas variables en tu proyecto de Vercel:

```
VITE_API_URL=https://tu-backend.onrender.com/api
```

## Pasos para Deploy

1. **Conectar repositorio a Vercel**
   - Ve a [vercel.com](https://vercel.com)
   - Importa tu repositorio de GitHub
   - Selecciona la carpeta `medicatelo-frontend`

2. **Configuración del Proyecto**
   - Framework Preset: **Vite**
   - Root Directory: `medicatelo-frontend`
   - Build Command: `npm run build`
   - Output Directory: `dist`

3. **Variables de Entorno**
   - Settings → Environment Variables
   - Agregar: `VITE_API_URL` con la URL de tu backend en Render

4. **Deploy**
   - Click en "Deploy"
   - Espera a que termine el build

## Notas
- El frontend se actualizará automáticamente con cada push a la rama main
- Asegúrate de que el backend esté deployado primero en Render
