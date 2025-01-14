import axios from 'axios';
import { useAuthStore } from './stores/auth';

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

export async function filterByService(params){
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
        const response = await axios.post('http://localhost:5048/api/Casas/crear', house)
        return response.data
    }
    catch (error) {
        console.error('Error al crear la casa', error)
        throw error
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

export async function getUserData(){
    const authStore = useAuthStore()
    try{
        const response = await axios.get(`http://localhost:5048/api/Usuarios/${authStore.userId}`)
        const user = {
            nombreUsuario: response.data.nombreUsuario,
            correo: response.data.correo,
            numeroContacto: response.data.numeroContacto
        }
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

export async function editHouses(house){
    try{
        const response = await axios.patch('http://localhost:5048/api/Casas/editar')
        return response.data
    }
    catch(error){
        console.error('Error al editar la casa', error)
        throw error
    }
}

export async function deleteHouse(id){
    try {
        const response =  await axios.delete(`http://localhost:5048/api/Casas/${id}`)
        return response.data
    } catch (error) {
        console.error('Error al eliminar la casa', error)
        throw error
    }
}

export async function filtroHome(params) {
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



export function convertToBase64(url, callback) {
    fetch(url)
        .then(response => response.blob())
        .then(blob => {
            const reader = new FileReader();
            reader.onloadend = function() {
                const base64String = reader.result.replace('data:', '').replace(/^.+,/, '');
                callback(base64String);
            };
            reader.readAsDataURL(blob);
        })
        .catch(error => {
            console.error('Error al convertir la imagen a Base64:', error);
            callback(null);
        });
}

export function calculateCost(housePrice, days){
    return housePrice * days
}
