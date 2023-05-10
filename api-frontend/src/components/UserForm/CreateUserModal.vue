<template>
  <AppModal ref="mUserRef" :title="'Novo Usuário'" :useButton="false">
    <UserForm :isEditing="false" :formValues="{}" @onSubmit="onSubmitForm" />
  </AppModal>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import UserForm from "./UserForm.vue";
import { useToast } from "vue-toastification";
import { useBackendApi } from "@/service/Backend";
import AppModal from "@/components/AppModal/AppModal.vue";
import CreateUserRequest from "@/interfaces/requests/CreateUserRequest";
import CreateUserResponse from "@/interfaces/responses/CreateUserResponse";
import { handleServiceError } from "@/utils/ServiceErrorHandler";

@Options({
  emits: ["onConfirm"],
  components: {
    AppModal,
    UserForm,
  },
})
export default class CreateUserModal extends Vue {
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

    const data: CreateUserRequest = {
      nome: String(value.nome),
      cpf: String(value.cpf),
    };

    try {
      const response = await backendApi.callPost<
        CreateUserResponse,
        CreateUserRequest
      >("/api/users", data);

      if (response.status === 200) {
        toast.success("Usuário criado com sucesso");
      }
      this.$emit("onConfirm", true);
    } catch (err) {
      handleServiceError(err, "Ocorreu um erro ao incluir o usuário.");
    } finally {
      this.closeModal();
    }
  }
}
</script>
