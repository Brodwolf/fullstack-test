<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-10">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center text-center">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              :class="`w-full ${
                width ? width : 'max-w-2xl'
              } transform overflow-hidden rounded-xl bg-white p-4 px-6 text-left align-middle shadow-xl transition-all`"
            >
              <DialogTitle
                as="h3"
                class="text-lg font-medium leading-6 py-3 text-slate-800"
              >
                {{ title }}
              </DialogTitle>
              <div>
                <slot />
              </div>
              <div v-if="useButton" class="mt-6">
                <PrimaryButton
                  text="Confirmar"
                  :fluid="true"
                  @click="onConfirm"
                />
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
  
  <script lang="ts">
import { Options, Vue } from "vue-class-component";
import PrimaryButton from "@/components/Button/PrimaryButton.vue";
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";
import { XIcon, HomeIcon } from "lucide-vue-next";

@Options({
  emits: ["onConfirm", "onCancel"],
  props: {
    title: {
      type: String,
      required: true,
    },
    width: {
      type: String,
      required: false,
    },
    useButton: {
      type: Boolean,
      required: false,
    },
  },
  components: {
    PrimaryButton,
    XIcon,
    HomeIcon,
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogPanel,
    DialogTitle,
  },
})
export default class AppModal extends Vue {
  public isOpen = false;

  /**
   * Disparado ao fechar o Modal
   */
  public closeModal() {
    this.$emit("onCancel");
    this.isOpen = false;
  }

  /**
   * Disparado ao abrir o Modal
   */
  public showModal() {
    this.isOpen = true;
  }

  /**
   * Disparado ao confirmar
   */
  public onConfirm() {
    this.$emit("onConfirm");
    this.isOpen = false;
  }
}
</script>
  