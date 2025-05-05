<template>
  <div class="cliente-list-container">
    <div class="list-header">
      <h2>Clientes</h2>
      <div class="actions">
        <router-link to="/clientes" class="btn-primary">
          <i class="fas fa-plus"></i> Novo Cliente
        </router-link>
        <div class="search-box">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Buscar clientes..."
            class="search-input"
          >
          <i class="fas fa-search"></i>
        </div>
      </div>
    </div>

    <div class="filters">
      <div class="filter-group">
        <label>Status:</label>
        <select v-model="statusFilter" class="filter-select">
          <option value="all">Todos</option>
          <option value="Ativo">Ativos</option>
          <option value="Inativo">Inativos</option>
        </select>
      </div>
      <div class="filter-group">
        <label>Ordenar por:</label>
        <select v-model="sortBy" class="filter-select">
          <option value="nome">Nome</option>
          <option value="data_cadastro">Data de Cadastro</option>
        </select>
      </div>
    </div>

    <div class="table-responsive">
      <table class="cliente-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>CPF/CNPJ</th>
            <th>E-mail</th>
            <th>Telefone</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="cliente in filteredClientes" :key="cliente.id">
            <td>{{ cliente.nome }}</td>
            <td>{{ formatCpfCnpj(cliente.cpf_cnpj) }}</td>
            <td>{{ cliente.email }}</td>
            <td>{{ formatTelefone(cliente.telefone) }}</td>
            <td>
              <span :class="['status-badge', cliente.status.toLowerCase()]">
                {{ cliente.status }}
              </span>
            </td>
            <td class="actions-cell">
              <router-link
                :to="`/clientes/editar/${cliente.id}`"
                class="action-btn edit-btn"
                title="Editar"
              >
                <i class="fas fa-edit"></i>
              </router-link>
              <button
                @click="toggleStatus(cliente)"
                class="action-btn status-btn"
                :title="cliente.status === 'Ativo' ? 'Desativar' : 'Ativar'"
              >
                <i :class="cliente.status === 'Ativo' ? 'fas fa-toggle-on' : 'fas fa-toggle-off'"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="pagination">
      <button
        @click="prevPage"
        :disabled="currentPage === 1"
        class="pagination-btn"
      >
        <i class="fas fa-chevron-left"></i>
      </button>
      <span class="page-info">Página {{ currentPage }} de {{ totalPages }}</span>
      <button
        @click="nextPage"
        :disabled="currentPage === totalPages"
        class="pagination-btn"
      >
        <i class="fas fa-chevron-right"></i>
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'
import type { Cliente } from '@/types'
const mockClientes: Cliente[] = [
  {
    id: 1,
    nome: 'João Silva',
    cpf_cnpj: '123.456.789-09',
    email: 'joao@empresa.com',
    telefone: '(11) 99999-9999',
    status: 'Ativo',
    data_cadastro: '2023-01-15'
  },
  {
    id: 2,
    nome: 'Empresa XYZ Ltda',
    cpf_cnpj: '12.345.678/0001-99',
    email: 'contato@xyz.com',
    telefone: '(11) 88888-8888',
    status: 'Ativo',
    data_cadastro: '2023-02-20'
  },
  {
    id: 3,
    nome: 'Maria Oliveira',
    cpf_cnpj: '987.654.321-00',
    email: 'maria@email.com',
    telefone: '(21) 77777-7777',
    status: 'Inativo',
    data_cadastro: '2023-03-10'
  },
  // Adicione mais clientes conforme necessário
]

const clientes = ref<Cliente[]>([])
const searchQuery = ref('')
const statusFilter = ref('all')
const sortBy = ref('nome')
const currentPage = ref(1)
const itemsPerPage = 10

onMounted(() => {
  setTimeout(() => {
    clientes.value = mockClientes
  }, 500)
})

const filteredClientes = computed(() => {
  let result = [...clientes.value]

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(cliente =>
      cliente.nome.toLowerCase().includes(query) ||
      cliente.email.toLowerCase().includes(query) ||
      cliente.cpf_cnpj.includes(query)
    )
  }

  if (statusFilter.value !== 'all') {
    result = result.filter(cliente => cliente.status === statusFilter.value)
  }

  if (sortBy.value === 'nome') {
    result.sort((a, b) => a.nome.localeCompare(b.nome))
  } else {
    result.sort((a, b) => new Date(b.data_cadastro).getTime() - new Date(a.data_cadastro).getTime())
  }

  return result
})

const paginatedClientes = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredClientes.value.slice(start, end)
})

const totalPages = computed(() => {
  return Math.ceil(filteredClientes.value.length / itemsPerPage)
})

function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

function formatCpfCnpj(value: string) {
  return value.length <= 14
    ? value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
    : value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5')
}

function formatTelefone(value: string) {
  return value.replace(/(\d{2})(\d{4,5})(\d{4})/, '($1) $2-$3')
}

function toggleStatus(cliente: Cliente) {
  cliente.status = cliente.status === 'Ativo' ? 'Inativo' : 'Ativo'
}
</script>
