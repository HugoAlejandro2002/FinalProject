import { strapiAPI } from "./strapiInstance";

export const loginUser = async (credentials) => {
    try {
        const response = await strapiAPI.post("/api/auth/local?populate=*",
            {
                "identifier": credentials.email,
                "password": credentials.password
            }
        );
        return response.data;
    } catch (error) {
        throw new Error("Error al iniciar sesión");
    }
};


export const fetchUserInfo = async (token) => {
    console.log(token)
    try {
        const response = await strapiAPI.get('/api/users/me?populate=*', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        // Procesar la respuesta
        return response.data;
    } catch (error) {
        // Manejar el error
        console.error(error);
    }
};


export const getPracticas = async (token) => {
    try {
        const response = await strapiAPI.get('/api/practicas', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        throw new Error('Error al obtener las prácticas');
    }
};


export const createPostulacion = async (jwt, practicaId, userId) => {
    try {
        const response = await strapiAPI.post(
            '/api/postulacions',
            {
                practica: practicaId,
                users_permissions_user: userId
            },
            {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            }
        );
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message); // Cambia `error.response.data` por `error.response.data.message`
    }
};