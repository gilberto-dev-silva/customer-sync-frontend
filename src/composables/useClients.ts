import { ref } from 'vue'
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

export function useClientes() {
  const clientes = ref([])
  const loading = ref(false)
  const error = ref(null)

  const fetchClientes = async (params = {}) => {
    loading.value = true
    error.value = null
    try {
      const response = await api.get('/clientes', { params })
      clientes.value = response.data.data
    } catch (err) {
      error.value = err.response?.data?.message || 'Erro ao carregar clientes'
    } finally {
      loading.value = false
    }
  }

  const createCliente = async (clienteData: any) => {
    loading.value = true
    error.value = null
    try {
      const response = await api.post('/clientes', clienteData)
      return response.data
    } catch (err) {
      error.value = err.response?.data?.message || 'Erro ao criar cliente'
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    clientes,
    loading,
    error,
    fetchClientes,
    createCliente,
  }
}
