<template>
  <AppModal ref="mUserRef" :title="`Editar usuário`" :useButton="false">
    <UserForm :isEditing="true" :formValues="user" @onSubmit="onSubmitForm" />
  </AppModal>
</template>

<script lang="ts">
import { Options, Vue, prop } from "vue-class-component";
import UserForm from "./UserForm.vue";
import { useToast } from "vue-toastification";
import { useBackendApi } from "@/service/Backend";
import AppModal from "@/components/AppModal/AppModal.vue";
import UserResponse from "@/interfaces/responses/UserResponse";
import { handleServiceError } from "@/utils/ServiceErrorHandler";
import CreateUserRequest from "@/interfaces/requests/CreateUserRequest";
import GetUserResponse from "@/interfaces/responses/GetUserResponse";
import CreateUserResponse from "@/interfaces/responses/CreateUserResponse";

@Options({
  emits: ["onConfirm"],
  components: {
    AppModal,
    UserForm,
  },
})
export default class UpdateUserModal extends Vue {
  public user!: UserResponse;

  /**
   * Retorna a referencia da modal de editar
   */
  public get modalRef() {
    return this.$refs.mUserRef as any;
  }

  /**
   * Seta a lista de usuários
   */
  public setUser(user: UserResponse) {
    this.user = user;
  }

  /**
   * Mostra o Modal
   */
  public async showModal(user: UserResponse) {
    this.setUser(user);
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
      const response = await backendApi.callPut<
        CreateUserResponse,
        CreateUserRequest
      >(`/api/users/${value.id}`, data);

      if (response.status === 200) {
        toast.success("Usuário Atualizado com sucesso!");
      }
      this.$emit("onConfirm", true);
    } catch (err) {
      handleServiceError(err, "Ocorreu um erro ao Atualizar o usuário.");
    } finally {
      this.closeModal();
    }
  }
}
</script>
