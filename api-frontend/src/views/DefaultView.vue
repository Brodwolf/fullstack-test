<template>
  <div class="w-full h-full flex items-center justify-center bg-gray-50">
    <div
      class="flex flex-col items-center justify-center space-y-5 p-10 rounded-md bg-white border border-gray-300"
    >
      <img src="@/assets/logo-magazord.png" class="w-60" />
      <h1 class="text-black text-xl font-medium">
        Teste para vaga de Full Stack no Magazord.com.br
      </h1>
      <span class="text-slate-800 text-base font-normal"
        >As funcionalidades solicitadas estão acessíveis no menu lateral.</span
      >
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";

@Options({
  components: {},
})
export default class DefaultView extends Vue {}
</script>
