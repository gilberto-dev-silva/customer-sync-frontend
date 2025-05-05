import { defineStore } from 'pinia'
import { ref } from 'vue'
import { mockClients } from '@/data/mockClients'

export const useClienteStore = defineStore('clientes', () => {
  const clientes = ref(mockClients)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchClientes = async () => {
    loading.value = true
    error.value = null
    try {
      // Aqui seria a chamada real para a API
      // const response = await axios.get('/api/clientes')
      // clientes.value = response.data

      // Simulando delay de rede
      await new Promise((resolve) => setTimeout(resolve, 800))
    } catch (err) {
      console.error('Erro ao carregar clientes:', err)
      error.value = 'Erro ao carregar clientes'
    } finally {
      loading.value = false
    }
  }

  return { clientes, loading, error, fetchClientes }
})
