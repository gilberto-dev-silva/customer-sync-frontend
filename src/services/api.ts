import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

export interface ApiResponse<T> {
  message: string
  data: T
}

export interface CreateClientPayload {
  name: string
  email: string
  cpf_cnpj: string
  telephone: string
  person_type: string
  date_of_birth: string
  status: string
  city: string
  uf: string
  neighborhood: string
  address: string
  number: string
  complement?: string
  id_profession: number
}

export async function createClient(payload: CreateClientPayload): Promise<ApiResponse<unknown>> {
  const { data } = await api.post<ApiResponse<unknown>>('/customers', payload)
  return data
}
