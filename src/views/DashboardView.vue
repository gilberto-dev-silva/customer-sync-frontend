<template>
  <div class="dashboard">
    <div class="row">
      <div class="col-md-4">
        <div class="card bg-primary text-white">
          <div class="card-body">
            <h5 class="card-title">Total de Clientes</h5>
            <p class="card-text display-4">20</p>
          </div>
        </div>
      </div>

      <div class="col-md-4">
        <div class="card bg-secondary text-white">
          <div class="card-body">
            <h5 class="card-title">Clientes Ativos</h5>
            <p class="card-text display-4">15</p>
          </div>
        </div>
      </div>

      <div class="col-md-4">
        <div class="card bg-tertiary text-white">
          <div class="card-body">
            <h5 class="card-title">Clientes Inativos</h5>
            <p class="card-text display-4">5</p>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-4">
      <customers-list />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useClienteStore } from '../stores/clients'
import AppHeader from '../components/layout/AppHeader.vue'
import CustomersList from '../components/customers/CustomersList.vue'


  const clienteStore = useClienteStore()
  const clientes = ref([])

  onMounted(async () => {
    await clienteStore.fetchClientes()
    clientes.value = clienteStore.clientes
  })
</script>
