<template>
  <div class="mb-6">
    <label
      class="block mb-1 text-sm font-medium text-gray-600 dark:text-gray-300"
    >
      {{ label }}
      <span class="text-xs text-red-500" v-if="required">*</span>
    </label>
    <input
      ref="field"
      :class="`bg-gray-50 text-gray-600 text-sm rounded-md block w-full p-2.5
               border focus:outline-none focus:border-black
               ${error ? 'border-red-500' : 'border-gray-300'}`"
      :type="type"
      :id="name"
      :placeholder="placeholder"
      :value="value"
      :disabled="disabled"
      @input="handleInput"
    />
    <div class="text-sm text-red-500 mt-1" v-if="error">{{ error }}</div>
  </div>
</template>

<script lang="ts">
import { Options, prop, Vue } from "vue-class-component";
import FormFieldProps from "@/interfaces/FormFieldProps";

class Props implements FormFieldProps {
  name: string = prop({
    required: true,
  });

  label: string = prop({
    required: true,
  });

  type: string = prop({
    required: true,
  });

  placeholder?: string | undefined = prop({
    required: false,
  });

  value?: string | undefined = prop({
    required: false,
  });

  required?: boolean | undefined = prop({
    required: false,
  });

  disabled?: boolean | undefined = prop({
    required: false,
  });

  error?: string | undefined = prop({
    required: false,
  });
}

@Options({
  emits: ["onInput"],
})
export default class InputField extends Vue.with(Props) {
  /**
   * Dispara eventos de alteração na input
   */
  public handleInput(e: InputEvent) {
    const ref = e.target as any;
    if (ref !== undefined) {
      this.$emit("onInput", ref.value);
    }
  }
}
</script>
