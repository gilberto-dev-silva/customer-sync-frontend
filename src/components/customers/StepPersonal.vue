<template>
  <form @submit.prevent="handleNext">
    <div class="form-group">
      <label for="name">Nome completo</label>
      <input ref="nameInput" v-model="localForm.name" id="name" type="text" required />
    </div>

    <div class="form-group">
      <label for="email">E-mail</label>
      <input v-model="localForm.email" id="email" type="email" required />
    </div>

    <div class="form-group">
      <label for="cpf_cnpj">CPF ou CNPJ</label>
      <input v-model="localForm.cpf_cnpj" @input="handleCpfCnpj" id="cpf_cnpj" type="text" required />
    </div>

    <div class="form-group">
      <label for="telephone">Telefone</label>
      <input v-model="localForm.telephone" @input="handlePhone" id="telephone" maxlength="15" type="tel" required />
    </div>

    <div class="form-group">
      <label for="person_type">Tipo de Pessoa</label>
      <select v-model="localForm.person_type" id="person_type" required>
        <option value="Física">Física</option>
        <option value="Jurídica">Jurídica</option>
      </select>
    </div>

    <div class="form-group">
      <label for="date_of_birth">Data de nascimento</label>
      <input
        v-model="localForm.date_of_birth"
        id="date_of_birth"
        type="date"
        required
      />
    </div>

    <div class="form-actions-next">
      <button type="submit">
        Próximo
        <i class="fa-solid fa-arrow-right"></i>
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

const nameInput = ref(null)

type PersonalData = {
  name: string
  email: string
  cpf_cnpj: string
  telephone: string
  person_type: 'Física' | 'Jurídica'
  date_of_birth: string
}

interface Props {
  modelValue: PersonalData & Record<string, unknown>
  onNext: () => void
}
const props = defineProps<Props>()
const emit = defineEmits(['update:modelValue'])

const localForm = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

const handlePhone = (event: Event) => {
  const input = event.target as HTMLInputElement
  input.value = phoneMask(input.value)
}

const phoneMask = (value: string) => {
  if (!value) return ""
  value = value.replace(/\D/g,'')
  value = value.replace(/(\d{2})(\d)/,"($1) $2")
  value = value.replace(/(\d)(\d{4})$/,"$1-$2")
  return value
}

const cpfCnpjMask = (value: string) => {
  if (!value) return ""
  value = value.replace(/\D/g,'')
  if (value.length <= 11) {
    value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
  } else {
    value = value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})(\d)/, "$1.$2.$3/$4-$5")
  }
  return value
}

const handleCpfCnpj = (event: Event) => {
  const input = event.target as HTMLInputElement
  input.value = cpfCnpjMask(input.value)
}

const focusInput = () => {
  if (nameInput.value) nameInput.value.focus()
}

function handleNext() {
  props.onNext()
}

onMounted(() => {
  focusInput()
})
</script>

