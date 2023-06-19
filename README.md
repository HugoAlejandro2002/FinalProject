# Gestor de tareas web

Este README proporciona información sobre el proyecto del Gestor de Tareas web, que está construido con React y Material-UI. La aplicación permite a los usuarios administrar tareas pendientes y completadas. Los usuarios pueden iniciar sesión, registrar nuevas cuentas y realizar acciones relacionadas con las tareas, como marcar tareas como completadas, agregar nuevas tareas y ver un resumen de sus tareas. La aplicación utiliza almacenamiento local para persistir las tareas y admite características como arrastrar y soltar para reordenar las tareas y buscar tareas por título.

## Instalación

Para ejecutar la aplicación de forma local, debes tener Node.js y npm instalados en tu máquina. Sigue estos pasos para configurar el proyecto:

1. Clona este repositorio en tu máquina local.
2. Navega hasta el directorio del proyecto en tu terminal.
3. Ejecuta el siguiente comando para instalar las dependencias requeridas:

   ```
   npm install
   
   ```

4. Una vez que se complete la instalación, inicia el servidor de desarrollo con el siguiente comando:

   ```
   
   npm start
   
   ```

5. La aplicación debería estar ejecutándose en `http://localhost:3000`.

## Uso

- Para agregar una nueva tarea, haz clic en el botón "Agregar tarea".
- Para editar una tarea, haz clic en el ícono de edición junto a la tarea.
- Para eliminar una tarea, haz clic en el ícono de eliminación junto a la tarea.
- Para marcar una tarea como completada, haz clic en el ícono de finalización junto a la tarea.
- Para reordenar las tareas, arrastra y suelta una tarea en la posición deseada.
- Para buscar tareas por título, ingresa tu término de búsqueda en el campo de entrada de búsqueda.

## Componentes

### App.js

Este archivo es el punto de entrada de la aplicación. Configura la estructura de enrutamiento utilizando `react-router-dom` y define el tema de la aplicación utilizando el componente `ThemeProvider`.

### ThemeProvider.js

Este archivo contiene el contexto y los hooks relacionados con el tema de la aplicación. Utiliza el hook `useReducer` para manejar los cambios de tema y autenticación.

### themeReducers.js

Este archivo define el estado inicial del tema de la aplicación y proporciona el reductor para manejar los cambios de tema y autenticación.

### AppRouter.js

Este archivo define las rutas de la aplicación utilizando el enrutador `react-router-dom`. Incluye rutas para la autenticación y rutas protegidas que requieren autenticación.

### AuthRoute.js

Este archivo define las rutas relacionadas con la autenticación, como la página de inicio de sesión y la página de registro. También redirige a la página de inicio de sesión si se intenta acceder a una ruta no válida.

### LoginPage.js

Este archivo contiene el formulario de inicio de sesión y su lógica asociada. Utiliza el hook `useForm` de `react-hook-form` para manejar la validación y el estado del formulario. También utiliza el contexto del tema para manejar el estado de autenticación y la navegación.

### RegisterPage.js

Este archivo contiene el formulario de registro y su lógica asociada. Utiliza el hook `useForm` de `react-hook-form` para manejar la validación y el estado del formulario.

### AppRoutes.js

Este archivo define las rutas protegidas de la aplicación una vez que el usuario ha iniciado sesión. Utiliza el contexto del tema para verificar el estado de autenticación y mostrar las rutas correspondientes.

### ResumePage.js

Este archivo muestra un resumen de las tareas del usuario. Utiliza el contexto de tareas para obtener la lista de tareas pendientes y completadas. También utiliza el contexto del tema para cargar tareas y el estado de autenticación cuando se carga la página.

### TaskSummary.js

Este archivo muestra un resumen de las tareas completadas y pendientes. Utiliza los datos proporcionados como propiedades para calcular y mostrar el porcentaje de tareas completadas y el número de tareas pendientes.

## Contexto

El contexto `TasksContext` se crea utilizando la función `createContext` de React. Proporciona los hooks `useTasks` y `useDispatch` para acceder al estado de las tareas y despachar acciones, respectivamente.

El componente `ThemeProvider` gestiona el estado del tema de la aplicación y el estado de autenticación utilizando un contexto creado con `createContext`. Proporciona los hooks `useTheme` y `useDispatch` para acceder al estado del tema y despachar acciones, respectivamente.

## Reductor

El reductor `tasksReducer` se encarga de manejar las diferentes acciones relacionadas con las tareas. Actualiza el estado según el tipo de acción y la carga útil.

El reductor `themeReducer` se utiliza para manejar los cambios de tema y autenticación. Actualiza el estado según el tipo de acción y la carga útil.

LINK DEL VIDEO:  https://drive.google.com/drive/folders/10Vhc0eCak6enHYnTqTcz9QgcmDapVc5b?usp=drive_link

