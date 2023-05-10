<template>
  <div
    :class="`mb-6 ${disabled && 'opacity-60 pointer-events-none select-none'}`"
  >
    <label
      class="block mb-1 text-sm font-medium text-gray-600 dark:text-gray-300"
    >
      {{ label }}
      <span class="text-xs text-red-500" v-if="required">*</span>
    </label>
    <Listbox v-model="internalValue" @update:modelValue="onUpdateValue">
      <div class="relative mt-1">
        <ListboxButton
          :class="`bg-gray-50 text-gray-600
                                relative w-full cursor-pointer rounded-lg text-sm border p-2.5 text-left
                                focus:outline-none focus:border-black
                                ${
                                  error ? 'border-red-500' : 'border-gray-300'
                                } ${isLoading && 'cursor-wait'}`"
        >
          <span class="block truncate" v-if="internalValue">{{
            internalValue.label
          }}</span>
          <span class="block truncate text-gray-400" v-if="!internalValue">{{
            placeholder
          }}</span>
          <span
            class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
          >
            <template v-if="isLoading">
              <svg
                role="status"
                class="inline w-5 h-5 animate-spin text-gray-300 fill-black"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
            </template>
            <ChevronDown
              v-if="!isLoading"
              class="h-5 w-5 text-gray-600"
              aria-hidden="true"
            />
          </span>
        </ListboxButton>

        <transition
          leave-active-class="transition duration-100 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <ListboxOptions
            class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 shadow-lg focus:outline-none text-sm z-10"
          >
            <template v-if="hasGroups && !selectedGroup">
              <li
                ref="group-selector"
                class="relative cursor-pointer select-none py-2 pl-10 pr-4 text-gray-900 hover:bg-blue-100 hover:text-black"
                v-for="group of groups"
                @click="(event) => selectGroup(event.target, group)"
                :key="group"
              >
                <span :class="['font-normal', 'block truncate']">
                  {{ group }}
                </span>
                <span
                  class="absolute inset-y-0 right-0 flex items-center pr-3 text-black"
                >
                  <ChevronRightIcon class="h-5 w-5" aria-hidden="true" />
                </span>
              </li>
            </template>
            <template v-if="hasGroups && selectedGroup">
              <div
                class="flex items-center py-2 pl-1 cursor-pointer select-none mb-1 border-b hover:bg-gray-100 group"
                @click="selectGroup(null)"
              >
                <ChevronLeftIcon
                  class="h-6 w-6 text-gray-500 group-hover:text-gray-600"
                  aria-hidden="true"
                />
                <span class="pl-1 text-gray-500 group-hover:text-gray-600">{{
                  selectedGroup
                }}</span>
              </div>
              <ListboxOption
                v-slot="{ active, selected }"
                v-for="item in selectedItens"
                :key="item"
                :value="item"
              >
                <li
                  :class="[
                    active ? 'bg-blue-100 text-black' : 'text-gray-900',
                    'relative cursor-pointer select-none py-2 pl-10 pr-4',
                  ]"
                >
                  <span
                    :class="[
                      selected ? 'font-medium' : 'font-normal',
                      'block truncate',
                    ]"
                  >
                    {{ item.label }}
                    <span class="ml-1 text-xs text-gray-400">{{
                      item.description
                    }}</span>
                  </span>
                  <span
                    v-if="selected"
                    class="absolute inset-y-0 left-0 flex items-center pl-3 text-black"
                  >
                    <CheckIcon class="h-5 w-5" aria-hidden="true" />
                  </span>
                </li>
              </ListboxOption>
            </template>

            <template v-if="!hasGroups">
              <ListboxOption
                v-slot="{ active, selected }"
                v-for="item in itens"
                :key="item"
                :value="item"
              >
                <li
                  :class="[
                    active ? 'bg-blue-100 text-black' : 'text-gray-900',
                    'relative cursor-pointer select-none py-2 pl-10 pr-4',
                  ]"
                >
                  <span
                    :class="[
                      selected ? 'font-medium' : 'font-normal',
                      'block truncate',
                    ]"
                  >
                    {{ item.label }}
                    <span class="ml-1 text-xs text-gray-400">{{
                      item.description
                    }}</span>
                  </span>
                  <span
                    v-if="selected"
                    class="absolute inset-y-0 left-0 flex items-center pl-3 text-black"
                  >
                    <CheckIcon class="h-5 w-5" aria-hidden="true" />
                  </span>
                </li>
              </ListboxOption>
            </template>
          </ListboxOptions>
        </transition>
      </div>
    </Listbox>
    <div class="text-sm text-red-500 mt-1" v-if="error">{{ error }}</div>
  </div>
</template>

<script lang="ts">
import { Options, prop, Vue } from "vue-class-component";
import { ref } from "vue";
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";
import {
  CheckIcon,
  ChevronDown,
  ChevronRightIcon,
  ChevronLeftIcon,
} from "lucide-vue-next";
import FormFieldProps from "@/interfaces/FormFieldProps";
import SelectFieldItem from "@/interfaces/SelectFieldItem";

class Props implements FormFieldProps {
  itens: SelectFieldItem[] = prop({
    required: true,
  });

  name: string = prop({
    required: true,
  });

  label: string = prop({
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

  isLoading = prop({
    default: false,
  });
}

@Options({
  emits: ["onInput"],
  watch: {
    value() {
      this.internalValue = ref(this.currentValue ?? undefined);
    },
    itens() {
      if (this.currentValue) {
        this.internalValue = ref(this.currentValue);
      }
    },
  },
  components: {
    Listbox,
    ListboxButton,
    ListboxOptions,
    ListboxOption,
    ChevronRightIcon,
    ChevronLeftIcon,
    CheckIcon,
    ChevronDown,
  },
})
export default class SelectField extends Vue.with(Props) {
  public selectedGroup: string | null = null;

  /**
   * Seta o valor inicial do campo
   */
  public internalValue = ref(this.currentValue);

  /**
   * Retorna os itens do grupo selecionado
   */
  public get selectedItens() {
    if (this.selectedGroup) {
      return this.itens.filter((x) => x.group === this.selectedGroup);
    }
    return this.itens;
  }

  /**
   * Retorna se o select possui agrupamentos
   */
  public get hasGroups() {
    return this.itens.some((x) => x.group !== undefined);
  }

  /**
   * Retorna a lista de grupos
   */
  public get groups() {
    const groupItens = this.itens.map((x) => x.group);
    return [...new Set(groupItens)];
  }

  /**
   * Seta o grupo selecioando
   */
  public selectGroup(element: HTMLElement, group: string) {
    this.selectedGroup = group;
  }

  public get currentValue() {
    if (this.value !== undefined) {
      return this.itens.find((item) => item.value === this.value);
    }
  }

  /**
   * Aguarda eventos de input do campo e emite para o componente pai
   */
  public onUpdateValue() {
    this.$emit("onInput", this.internalValue?.value ?? undefined);
  }
}
</script>
