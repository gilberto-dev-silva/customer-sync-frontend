<template>
  <form @submit.prevent="handleSubmit">
    <div class="form-group">
      <label for="profession">Profissão</label>
      <select v-model="localForm.profession_id" id="profession" required>
        <option disabled value="">Selecione uma profissão</option>
        <option
          v-for="profession in professions"
          :key="profession.id"
          :value="profession.id"
        >
          {{ profession.profession_name }}
        </option>
      </select>
    </div>

    <div class="form-actions-profession">
    <div class="form-actions-back">
      <button type="button" @click="onPrev">
        <i class="fa-solid fa-arrow-left"></i>
        Voltar
      </button>
    </div>

    <div class="form-actions-next">
      <button type="submit">
        Enviar
        <i class="fa-solid fa-paper-plane"></i>
      </button>
    </div>
  </div>
  </form>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'

type Profession = {
  id: number
  profession_name: string
}

interface Props {
  modelValue: { profession_id: number } & Record<string, unknown>
  onPrev: () => void
  onSubmit: () => void
}

const props = defineProps<Props>()
const emit = defineEmits(['update:modelValue'])

const localForm = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

const professions = ref<Profession[]>([
  { id: 1, profession_name: 'Administração' },
  { id: 2, profession_name: 'Consultor' },
  { id: 3, profession_name: 'Contabilidade' },
  { id: 4, profession_name: 'Engenheiro de Software' },
  { id: 5, profession_name: 'Logística' },
  { id: 6, profession_name: 'Recursos Humanos' },
])

function handleSubmit() {
  props.onSubmit()
}
</script>
