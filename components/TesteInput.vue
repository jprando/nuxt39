<template>
  <section>
    <label>
      <div>{{ teste?.titulo }}</div>
      <input
        :placeholder
        v-model="teste.valor"
      />
    </label>
  </section>
</template>

<script setup lang="ts">
  import type { TesteInputModel } from "./tipos";

  const teste = defineModel<TesteInputModel>({
    required: true,
    type: Object,
    default: {
      titulo: '',
      valor: '',
    },
  });

  const placeholder = computed(() => `informe o ${teste.value?.titulo} aqui`);
</script>
