# Prueba Técnica - Desarrollo de Aplicación CRUD con Vue 3

## Descripción

Esta aplicación es una prueba técnica para Optimum Soft S.A.S. que implementa una aplicación CRUD utilizando Vue 3 (Composition API), Pinia para el manejo del estado y Tailwind CSS para el diseño de la interfaz de usuario. La aplicación permite crear, leer, actualizar y eliminar productos, categorías e impuestos.

## Requisitos

- Node.js >= 14.x
- npm >= 6.x

## Instalación

1. Clona el repositorio:

```sh
git clone https://github.com/camilod529/prueba-tecnica-optimun.git
cd prueba-tecnica-optimun
```

2. Instala las dependencias:

```sh
npm install
```

3. Crea un archivo `.env.local` en la raíz del proyecto con la siguiente configuración:

```sh
VITE_API_BASE_URL=
```

## Ejecución

Para ejecutar la aplicación en modo desarrollo:

```sh
npm run dev
```

Para construir la aplicación para producción:

```sh
npm run build
```

Para previsualizar la aplicación construida:

```sh
npm run preview
```

## Dependencias

- Vue 3
- Pinia
- Tailwind CSS
- Axios
- SweetAlert2

## Decisiones de Diseño

- **Uso de Pinia:** Se eligió Pinia para el manejo del estado global de la aplicación debido a su simplicidad y compatibilidad con Vue 3.
- **Tailwind CSS:** Se utilizó Tailwind CSS para un diseño rápido y consistente de la interfaz de usuario.
- **Axios:** Se utilizó Axios para el consumo de la API REST proporcionada.
- **SweetAlert2:** Se utilizó SweetAlert2 para mostrar alertas y confirmaciones al usuario.

## Funcionalidades

1. **Funcionalidad CRUD:** La aplicación permite crear, leer, actualizar y eliminar registros de productos, categorías e impuestos.
2. **Tabla de Datos:** Los datos obtenidos de la API se muestran en tablas interactivas.
3. **Modal de Formulario:** Se implementó un modal para crear y editar registros.
4. **Consumo de API:** La aplicación consume una API REST proporcionada.
5. **Manejo de Estado:** Se utiliza Pinia para gestionar el estado global de la aplicación.
6. **Estilos:** Se aplicó Tailwind CSS para el diseño y estilizado de la interfaz de usuario.
