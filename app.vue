<template>
  <TesteInput v-model="teste" />
  <pre>{{ teste }}</pre>
  <div>
    <label>
      <div>titulo</div>
      <input v-model="teste.titulo" />
    </label>
  </div>
  <div>
    <label>
      <div>valor</div>
      <input v-model="teste.valor" />
    </label>
  </div>
</template>

<script setup lang="ts">
  const teste = ref({
    titulo: "nome",
    valor: "JEUDI PRANDO",
  });
</script>
