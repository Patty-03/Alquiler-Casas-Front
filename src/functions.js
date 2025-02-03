import axios from 'axios';
import { useAuthStore } from './stores/auth';
import { ref } from 'vue';


export async function getHouses() {
    try {
        const response = await axios.get('http://localhost:5048/api/Casas/listaCasas');
        return response.data;
    } catch (error) {
        console.error('No se pudieron obtener las casas: ', error);
        throw error;
    }
}


export async function getReservationDays(idHouse){
    try{
        const response = await axios.get(`http://localhost:5048/api/Calendario/listaFechas?idCasa=${idHouse}`)
        return response.data
    }
    catch(error){
        console.error('No se pudieron obtener las fecha de reservaciones', error)
        throw error
    }
}

export async function filterByServiceAndOthers(params){
    try{
        const response = await axios.post('http://localhost:5048/api/Casas/filtrar', params)
        return response.data
    }
    catch(error){
        console.error('No se pudieron filtrar las casas', error)
        throw error
    }

}

export async function getHouseById(id) {
    try {
        const response = await axios.get(`http://localhost:5048/api/Casas/${id}`);
        return response.data;
    } catch (error) {
        console.error(`No se pudo obtener la casa con ID ${id}: `, error);
        throw error;
    }
}

export async function createReservation(reserv) {
    try {
        console.log(reserv)
        const response = await axios.post('http://localhost:5048/api/Reservacion', reserv);
        return response.data;
    }
    catch (error) {
        console.error('Error al crear la reservación:', error);
        throw error;
    }
}

export async function createHouse(house) {
    try {
        const response = await axios.post('http://localhost:5048/api/Casas/crear', house, {
            headers: {
                 Authorization: `Bearer ${useAuthStore().token}`
            }
        });
        return response.data
    } catch (error) {
        console.error('Error al crear la casa:', error);
    }
}

export async function createReview(val) {
    try {
        const response = await axios.post('http://localhost:5048/api/Valoracion', val)
        return response.data
    }
    catch (error) {
        console.error('Error al crear la valoracion', error)
        throw error
    }
}

export async function getUserData(id){
    const user = ref({
        nombreUsuario: "",
        correo: "",
        numeroContacto: ""
    })
    try{
        const response = await axios.get(`http://localhost:5048/api/Usuarios/${id}`)
        user.value.nombreUsuario = response.data.nombreUsuario
        user.value.correo = response.data.correo
        user.value.numeroContacto = response.data.numeroContacto
        return user
    }
    catch(error){
        console.error('Error al cargar la informacion del usuario', error)
        throw error
    }
}

export async function getGananciasTotales() {
    const authStore = useAuthStore()
    const userId = localStorage.getItem('userId')

    try {
        const response = await axios.get(`http://localhost:5048/api/Gestor/${userId}/ganancias`, 
            {
                headers: {
                    Authorization: `Bearer ${authStore.token}`,
                }
            }
        )
        return response.data
    } catch (error) {
        console.error('Error al obtener las ganacias', error)
        throw error
    }
}

export async function getGananciasMensuales() {
    const authStore = useAuthStore()
    const userId = localStorage.getItem('userId')

    try {
        const response = await axios.get(`http://localhost:5048/api/Gestor/${userId}/ganancias/mensuales`, 
            {
                headers: {
                    Authorization: `Bearer ${authStore.token}`,
                }
            }
        )
        return response.data
    } catch (error) {
        console.error('Error al obtener las ganacias mensuales', error)
        throw error
    }
}

export async function getHousesByGestorId() {
    const authStore = useAuthStore()
    const userId = localStorage.getItem('userId')

    try {
        const response = await axios.get(`http://localhost:5048/api/Gestor/${userId}/listaCasas`, 
            {
                headers: {
                    Authorization: `Bearer ${authStore.token}`,
                }
            }
        )
        return response.data
    } catch (error) {
        console.error('Error al obtener las casas del gestor', error)
        throw error
    }
}

export async function updateHouse(house){
    try{
        const response = await axios.patch('http://localhost:5048/api/Casas/editar', {
            headers: {
                Authorization: `Bearer ${authStore.token}`,
            }
        })
        return response.data
    }
    catch(error){
        console.error('Error al editar la casa', error)
        throw error
    }
}

export async function deleteHouse(id){
    const authStore = useAuthStore()
    try {
        const response =  await axios.delete(`http://localhost:5048/api/Casas/${id}`, 
            {
                headers: {
                    Authorization: `Bearer ${authStore.token}`
                }
            }
        )
        return response.data
    } catch (error) {
        console.error('Error al eliminar la casa', error)
        throw error
    }
}

export async function filtroHome(params) {
    console.log(params)
    try {
        const response = await axios.post('http://localhost:5048/api/Casas/filtrarInicial', params)
        return response.data
    } catch (error) {
        console.error('Error al filtrar las casas', error)
        throw error
    }
} 

export async function getCiudades() {
    try {
        const response = await axios.get('http://localhost:5048/api/Ciudad/listaCiudades')
        return response.data
    }
    catch (error) {
        console.log('Error al cargar las ciudades', error)
        throw error
    }

}

export function decodeJWT(token) {
    const authStore = useAuthStore()

    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        const parsedPayload = JSON.parse(jsonPayload);
        console.log(parsedPayload);
        authStore.userId = parsedPayload.sub
        authStore.userRol = parsedPayload.role
        return parsedPayload;
    } catch (error) {
        console.error('Error decoding token', error);
    }
}

export function calculateCost(housePrice, days){
    return housePrice * days
}

export async function getClientReservations() {

    try {
        const response = await axios.get(`http://localhost:5048/api/Reservacion/listaIdUsuario?idUsuario=${localStorage.getItem('userId')}`)
        return response.data
    } catch (error) {
        console.log('No se pudieron obtener las reservaciones de este usuario')
        throw error
    }
}

export async function getReservations(id) {
    const authStore = useAuthStore()

    const jwt = authStore.token
    try {
        const response = await axios.get(`http://localhost:5048/api/Gestor/${id}/reservaciones`, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        })
        return response.data
    } catch (error) {
        console.log('No se pudieron obtener las reservaciones de esta casa', error)
        throw error
    }
}

export function convertToFullPath(relativePath) {
    const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5048';
    const normalizedPath = relativePath.replace(/^wwwroot[\\\/]/, '').replace(/\\/g, '/');
    return `${baseUrl}/${normalizedPath}`;
  }
  

export async function getPendHouses() {
    const idUsuario = localStorage.getItem('userId')
    const authStore = useAuthStore()

    try{
        const response = await axios.get(`http://localhost:5048/api/Casas/listaCasasPendientesUsuario?idUsuario=${idUsuario}`, {
            headers: {
                Authorization: `Bearer ${authStore.token}`,
            }
        })
        return response.data
    }
    catch(error){
        console.log('No se pudieron obtener las casas pendientes', error)
        throw error
    }

}

export async function publicarAnuncio(idCasa){
    const authStore = useAuthStore()
    try {
        const response = await axios.patch(`http://localhost:5048/api/Casas/publicar?idCasa=${idCasa}`, 
            {}, {
            headers: {
                Authorization: `Bearer ${authStore.token}`,
            }
        })
        return response.data
    } catch (error) {
        console.error('No se pudo publicar la casa', error)
        throw error
    }
}

export async function getAllPendHouses() {
const authStore = useAuthStore()
    try{
        const response = await axios.get('http://localhost:5048/api/Casas/listaCasasPendientes', {
            headers: {
                Authorization: `Bearer ${authStore.token}`,
            }
        })
        return response.data
    }
    catch(error){
        console.error('No se pudieron obtener las casas pendientes', error)
        throw error
    }
}

export async function getAllUsers() {
    const authStore = useAuthStore()
    try {
        const response = await axios.get('http://localhost:5048/api/Usuarios/listaUsuarios', {
            headers: {
                Authorization: `Bearer ${authStore.token}`,
            }
        })
        return response.data
    } catch (error) {
        console.error('No se pudieron obtener todos los usuarios', error)
        throw error
    }
}

export async function cambiarRol(params){
    const authStore = useAuthStore()
    try {
        const response = await axios.patch('http://localhost:5048/api/Usuarios/cambiarRol', params, {
            headers: {
                Authorization: `Bearer ${authStore.token}`,
            }
        })
        return response.data
    } catch (error) {
        console.error('No se pudo cambiar el rol del usuario', error)
        throw error
    }
}

export async function getGananciasTotalesAdmin() {
    const authStore = useAuthStore()
    try {
        const response = await axios.get('http://localhost:5048/api/Administrador/gananciasTotales', {
            headers: {
                Authorization: `Bearer ${authStore.token}`
            }
        })
        return response.data
    } catch (error) {
        console.error('No se pudieron obtener las ganancias', error)
        throw error
    }
}

export async function getGananciasMensualesAdmin() {
    const authStore = useAuthStore()
    try {
        const response = await axios.get('http://localhost:5048/api/Administrador/gananciasMensuales', {
            headers: {
                Authorization: `Bearer ${authStore.token}`
            }
        })
        return response.data
    } catch (error) {
        console.error('No se pudieron obtener las ganancias', error)
        throw error
    }
}