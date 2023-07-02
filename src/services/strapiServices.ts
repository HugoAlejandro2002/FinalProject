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
        const response = await strapiAPI.get('/api/practicas?populate=*', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        throw new Error('Error al obtener las prácticas');
    }
};

export const updatePractica = async (token, proyectoId, usuarioId) => {
    try {
        const response = await strapiAPI.put(
            `/api/practicas/${proyectoId}`,
            {
                data: { users_permissions_user: usuarioId, Status: "progreso" }
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return response.data;
    } catch (error) {
        throw new Error('Error al actualizar el proyecto');
    }
};

export const createPostulacion = async (jwt, practicaId, userId) => {
    try {
        const response = await strapiAPI.post(
            '/api/postulacions',
            {
                data: {
                    practica: practicaId,
                    users_permissions_user: userId
                }
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


export const getAllPostulaciones = async (jwt) => {
    try {
        const response = await strapiAPI.get("/api/postulacions?populate=*", {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        });
        return response.data;
    } catch (error) {
        throw new Error("Error al obtener todas las postulaciones");
    }
};


export const deletePostulacion = async (token, postulacionId) => {
    try {
        const response = await strapiAPI.delete(`/api/postulacions/${postulacionId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw new Error('Error al eliminar la postulación');
    }
};


export const createPractica = async (token, practicaData) => {
    try {
        const response = await strapiAPI.post("/api/practicas",
            {
                data: { ...practicaData }
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

        return response.data;
    } catch (error) {
        throw new Error('Error al crear la práctica');
    }
};

export const getPracticasByUser = async (token, userID) => {
    try {
        const response = await getPracticas(token);
        console.log(response)

        // Filtrar las prácticas por el ID del usuario y el estado "acabada"
        const practicasByUser = response.data.filter(practica => {
            const userId = practica.attributes.users_permissions_user?.data?.id;
            return userId === userID && practica.attributes.Status === "progreso";
        });

        return practicasByUser;
    } catch (error) {
        throw new Error('Error al obtener las prácticas del usuario');
    }
};


export const finalizarPractica = async (token, practicaId) => {
    try {
        const response = await strapiAPI.put(`api/practicas/${practicaId}`, {
            data: { Status: 'acabada' }
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data;
    } catch (error) {
        throw new Error('Error al finalizar la práctica');
    }
};

export const getAllPracticasByUser = async (token,userId) => {
    try {
        const response = await getPracticas(token);
        console.log(response);

        // Filtrar las prácticas por el ID del usuario
        const practicasByUser = response.data.filter(practica => {
            const userId = practica.attributes.users_permissions_user?.data?.id;
            return userId === userId;
        });

        return practicasByUser;
    } catch (error) {
        throw new Error('Error al obtener las prácticas del usuario');
    }
};