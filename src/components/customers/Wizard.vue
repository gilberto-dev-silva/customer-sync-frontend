<template>
  <div class="wizard-container">
    <div v-if="loading" class="loading-overlay">
      <div class="loading-spinner"></div>
      <div class="loading-text">Enviando dados...</div>
    </div>

    <component
      :is="steps[currentStep]"
      v-model="form"
      :loading="loading"
      :on-next="nextStep"
      :on-prev="prevStep"
      :on-submit="submitForm"
      :is-last="currentStep === steps.length - 1"
    />

    <div class="wizard-indicator">
      Etapa <span>{{ currentStep + 1 }}</span> de <span>{{ steps.length }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import StepAddress from './StepAddress.vue'
import StepPersonal from './StepPersonal.vue'
import StepProfession from './StepProfession.vue'
import { createClient } from '../../services/api'
import type { CreateClientPayload } from '../../services/api'
import { customerSchema } from '../../validation/customerSchema'

type FormData = {
  name: string
  email: string
  cpf_cnpj: string
  telephone: string
  person_type: 'Física' | 'Jurídica'
  date_of_birth: string
  address: {
    city: string
    uf: string
    neighborhood: string
    address: string
    number: string
    complement: string
  }
  profession_id: number
}

const steps = [StepPersonal, StepAddress, StepProfession]
const currentStep = ref(0)
const loading = ref(false)

const form = reactive<FormData>({
  name: '',
  email: '',
  cpf_cnpj: '',
  telephone: '',
  person_type: 'Física',
  date_of_birth: '',
  address: {
    city: '',
    uf: '',
    neighborhood: '',
    address: '',
    number: '',
    complement: ''
  },
  profession_id: 0
})

function nextStep() {
  if (currentStep.value < steps.length - 1) {
    currentStep.value++
  }
}

function prevStep() {
  if (currentStep.value > 0) {
    currentStep.value--
  }
}

function resetForm() {
  Object.assign(form, {
    name: '',
    email: '',
    cpf_cnpj: '',
    telephone: '',
    person_type: 'Física',
    date_of_birth: '',
    address: {
      city: '',
      uf: '',
      neighborhood: '',
      address: '',
      number: '',
      complement: ''
    },
    profession_id: 0
  })
}

function flattenFormData(form: FormData): CreateClientPayload {
  return {
    name: form.name,
    email: form.email,
    cpf_cnpj: form.cpf_cnpj,
    telephone: form.telephone,
    person_type: form.person_type,
    date_of_birth: form.date_of_birth,
    status: 'Active',
    id_profession: form.profession_id,
    address: form.address.address,
    number: form.address.number,
    neighborhood: form.address.neighborhood,
    city: form.address.city,
    uf: form.address.uf,
    complement: form.address.complement
  }
}

async function submitForm() {
  try {
    loading.value = true
    await new Promise(resolve => setTimeout(resolve, 2000))
    await customerSchema.validate(form, { abortEarly: false })

    const payload = flattenFormData(form)
    const response = await createClient(payload)

    alert(response.message)
    resetForm()
  } catch (err) {
    if (err?.errors) {
      alert('Validação: ' + err.errors.join('\n'))
    } else {
      alert('Erro ao enviar: ' + err.message)
    }
  } finally {
    loading.value = false
  }
}
</script>
