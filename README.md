# Ward Spy - League of Legends Stats Tracker

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

Ward Spy es una aplicación web moderna para rastrear estadísticas de League of Legends, ofreciendo información detallada sobre jugadores, partidas en vivo y más.

## 🚀 Características

- 📊 Estadísticas detalladas de invocadores
- 🎮 Seguimiento de partidas en vivo
- 📈 Historial de partidas con análisis detallado
- 🏆 Clasificaciones y logros
- 🎨 Interfaz de usuario moderna y receptiva

## 🛠️ Tecnologías

- **Frontend:**
  - Next.js 15 (App Router)
  - React 19
  - Tailwind CSS
  - Zustand (gestión de estado)
  - Recharts (gráficos)

- **Backend:**
  - Next.js API Routes
  - MongoDB con Mongoose
  - Riot Games API

- **Herramientas de desarrollo:**
  - TypeScript
  - ESLint
  - Prettier

## 📦 Requisitos previos

- Node.js 18+
- npm o yarn
- MongoDB Atlas o local
- API Key de Riot Games

## 🚀 Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/ward-spy.git
   cd ward-spy
   ```

2. Instala las dependencias:
   ```bash
   npm install
   # o
   yarn
   ```

3. Configura las variables de entorno:
   Crea un archivo `.env.local` en la raíz del proyecto con las siguientes variables:
   ```
   MONGODB_URI=tu_cadena_de_conexion_mongodb
   RIOT_API_KEY=tu_api_key_de_riot
   NEXT_PUBLIC_RIOT_API_KEY=tu_api_key_publica_de_riot
   NEXTAUTH_SECRET=tu_secreto_para_next_auth
   NEXTAUTH_URL=http://localhost:3000
   ```

4. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   # o
   yarn dev
   ```

5. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 🏗️ Estructura del Proyecto

```
ward-spy/
├── app/                    # Rutas de la aplicación
│   ├── api/               # Endpoints de la API
│   ├── components/        # Componentes compartidos
│   ├── hooks/             # Custom hooks
│   ├── store/             # Estado global con Zustand
│   └── utils/             # Utilidades
├── components/            # Componentes de la UI
│   ├── clash/            # Componentes de Clash
│   ├── intro/            # Página de inicio
│   ├── liveGame/         # Partidas en vivo
│   ├── matchHistory/     # Historial de partidas
│   ├── summoner/         # Perfil de invocador
│   └── ui/               # Componentes de UI reutilizables
├── lib/                  # Lógica del lado del servidor
│   └── models/           # Modelos de MongoDB
├── public/               # Archivos estáticos
└── styles/              # Estilos globales
```

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más información.

## 🤝 Contribución

¡Las contribuciones son bienvenidas! Por favor, lee nuestras pautas de contribución para más detalles.

## 📧 Contacto

¿Tienes preguntas? Contáctame en [maicolcontreras241@gmail.com](mailto:maicolcontreras241@gmail.com)

---

Hecho con ❤️ por [George Contreras](https://github.com/GeorgeContreras241)

Aun en desarrollo 🚀
