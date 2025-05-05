<template>
  <form @submit.prevent="handleNext">
    <div class="form-group">
      <label for="city">Cidade</label>
      <input v-model="localForm.address.city" ref="cityInput" id="city" type="text" required />
    </div>

    <div class="form-group">
      <label for="uf">UF (Estado)</label>
      <input
        v-model="localForm.address.uf"
        id="uf"
        type="text"
        maxlength="2"
        required
      />
    </div>

    <div class="form-group">
      <label for="neighborhood">Bairro</label>
      <input
        v-model="localForm.address.neighborhood"
        id="neighborhood"
        type="text"
        required
      />
    </div>

    <div class="form-group">
      <label for="address">Endereço</label>
      <input
        v-model="localForm.address.address"
        id="address"
        type="text"
        required
      />
    </div>

    <div class="form-group">
      <label for="number">Número</label>
      <input
        v-model="localForm.address.number"
        id="number"
        type="text"
        required
      />
    </div>

    <div class="form-group">
      <label for="complement">Complemento</label>
      <input
        v-model="localForm.address.complement"
        id="complement"
        type="text"
      />
    </div>

    <div class="form-actions-back">
      <button type="button" @click="onPrev">
        <i class="fa-solid fa-arrow-left"></i>
        Voltar
      </button>
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

const cityInput = ref(null)

type Address = {
  city: string
  uf: string
  neighborhood: string
  address: string
  number: string
  complement: string
}

interface Props {
  modelValue: { address: Address } & Record<string, unknown>
  onNext: () => void
  onPrev: () => void
}
const props = defineProps<Props>()
const emit = defineEmits(['update:modelValue'])

const localForm = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

const focusInput = () => {
  if (cityInput.value) cityInput.value.focus()
}

onMounted(() => {
  focusInput()
})

function handleNext() {
  props.onNext()
}
</script>

