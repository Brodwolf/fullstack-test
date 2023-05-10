<template>
  <button
    class="p-2 bg-black hover:opacity-90 rounded text-white text-sm disabled:opacity-80"
    :class="dynamicClasses"
    @click="onClickButton"
    :disabled="disabled || loading"
  >
    <template v-if="!loading">
      {{ text }}
    </template>
    <template v-if="loading">
      <loading-spinner-button />
      Carregando...
    </template>
  </button>
</template>

<script lang="ts">
import { Vue, prop, WithDefault, Options } from "vue-class-component";
import LoadingSpinnerButton from "./LoadingSpinnerButton.vue";

class Props {
  text: string = prop({
    required: true,
  });

  fluid: WithDefault<boolean> = prop({
    required: false,
    default: false,
  });

  loading: WithDefault<boolean> = prop({
    required: false,
    default: false,
  });

  disabled: WithDefault<boolean> = prop({
    required: false,
    default: false,
  });
}
@Options({
  components: {
    LoadingSpinnerButton,
  },
})
export default class PrimaryButton extends Vue.with(Props) {
  /**
   * Retorna as classes
   */
  public get dynamicClasses() {
    return {
      "w-full": this.fluid,
    };
  }

  /**
   * Disparado ao clicar no botão
   */
  public onClickButton() {
    this.$emit("onClick");
  }
}
</script>
