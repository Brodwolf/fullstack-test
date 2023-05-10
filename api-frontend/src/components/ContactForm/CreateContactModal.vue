<template>
  <AppModal ref="mUserRef" :title="'Novo Contato'" :useButton="false">
    <ContactForm :isEditing="false" :formValues="{}" @onSubmit="onSubmitForm" />
  </AppModal>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import ContactForm from "./ContactForm.vue";
import { useToast } from "vue-toastification";
import { useBackendApi } from "@/service/Backend";
import AppModal from "@/components/AppModal/AppModal.vue";
import { handleServiceError } from "@/utils/ServiceErrorHandler";
import CreateContactRequest from "@/interfaces/requests/CreateContactRequest";
import CreateContactResponse from "@/interfaces/responses/CreateContactResponse";
import EnumContactType from "@/enum/EnumContactType";

@Options({
  emits: ["onConfirm"],
  components: {
    AppModal,
    ContactForm,
  },
})
export default class CreateContactModal extends Vue {
  /**
   * Retorna a referencia da modal de novo usuário
   */
  public get modalRef() {
    return this.$refs.mUserRef as any;
  }

  /**
   * Mostra o Modal
   */
  public showModal() {
    this.modalRef.showModal();
  }

  /**
   * Fecha o Modal
   */
  public closeModal() {
    this.modalRef.closeModal();
  }

  /**
   * Disparado ao confirmar o modal
   */
  public async onSubmitForm(value: Record<string, string | number>) {
    const toast = useToast();
    const backendApi = useBackendApi();

    const data: CreateContactRequest = {
      userId: Number(value.user),
      tipo: value.tipo as EnumContactType,
      descricao: String(value.descricao),
    };

    try {
      const response = await backendApi.callPost<
        CreateContactResponse,
        CreateContactRequest
      >("/api/contacts", data);

      if (response.status === 200) {
        toast.success("Contato criado com sucesso!");
      }
      this.$emit("onConfirm", true);
    } catch (err) {
      handleServiceError(err, "Ocorreu um erro ao incluir o contato.");
    } finally {
      this.closeModal();
    }
  }
}
</script>
