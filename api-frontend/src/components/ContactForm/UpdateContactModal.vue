<template>
  <AppModal ref="mUserRef" :title="'Editar Contato'" :useButton="false">
    <ContactForm
      :isEditing="true"
      :formValues="contact"
      @onSubmit="onSubmitForm"
    />
  </AppModal>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import ContactForm from "./ContactForm.vue";
import { useToast } from "vue-toastification";
import { useBackendApi } from "@/service/Backend";
import EnumContactType from "@/enum/EnumContactType";
import AppModal from "@/components/AppModal/AppModal.vue";
import { handleServiceError } from "@/utils/ServiceErrorHandler";
import ContactResponse from "@/interfaces/responses/ContactResponse";
import GetContactResponse from "@/interfaces/responses/GetContactResponse";
import UpdateContactRequest from "@/interfaces/requests/UpdateContactRequest";
import UpdateContactResponse from "@/interfaces/responses/UpdateContactResponse";

@Options({
  emits: ["onConfirm"],
  components: {
    AppModal,
    ContactForm,
  },
})
export default class UpdateContactModal extends Vue {
  public contact!: ContactResponse;

  /**
   * Retorna a referencia da modal de novo usuário
   */
  public get modalRef() {
    return this.$refs.mUserRef as any;
  }

  /**
   * Seta o contato
   */
  public setContact(contact: ContactResponse) {
    this.contact = contact;
  }

  /**
   * Mostra o Modal
   */
  public async showModal(contact: ContactResponse) {
    this.setContact(contact);
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

    const data: UpdateContactRequest = {
      tipo: value.tipo as EnumContactType,
      descricao: String(value.descricao),
    };

    try {
      const response = await backendApi.callPut<
        UpdateContactResponse,
        UpdateContactRequest
      >(`/api/contacts/${this.contact.id}`, data);

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
