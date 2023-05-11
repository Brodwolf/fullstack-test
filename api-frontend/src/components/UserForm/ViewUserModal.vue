<template>
  <AppModal
    ref="mViewUserRef"
    :width="'max-w-4xl'"
    :title="`Visualizar Usuário`"
    :useButton="true"
  >
    <div class="w-full flex pt-2 pb-5">
      <div class="w-2/5 h-96 p-5">
        <InputField
          name="id"
          label="Id:"
          type="text"
          :disabled="true"
          :value="user.id"
        />
        <InputField
          name="nome"
          label="Nome:"
          type="text"
          :disabled="true"
          :value="user.nome"
        />
        <InputField
          name="cpf"
          label="CPF:"
          type="text"
          :disabled="true"
          :value="user.cpf"
        />
      </div>
      <div
        class="flex flex-col w-3/5 h-96 overflow-hidden overflow-y-scroll p-5"
      >
        <table class="min-w-full divide-y divide-gray-200 table-fixed">
          <thead class="bg-gray-100">
            <tr>
              <th
                scope="col"
                class="p-4 text-xs font-medium text-center text-gray-500 uppercase"
              >
                Id
              </th>
              <th
                scope="col"
                class="p-4 text-xs font-medium text-center text-gray-500 uppercase"
              >
                Tipo
              </th>
              <th
                scope="col"
                class="p-4 text-xs font-medium text-center text-gray-500 uppercase"
              >
                Descrição
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr
              class="hover:bg-gray-100 dark:hover:bg-gray-700 text-center"
              v-for="contact in contactList"
              :key="contact.id"
            >
              <td
                class="max-w-sm p-4 overflow-hidden text-base font-normal text-gray-500 truncate xl:max-w-xs"
              >
                {{ contact.id }}
              </td>
              <td
                class="max-w-sm p-4 overflow-hidden text-base font-normal text-gray-500 truncate xl:max-w-xs"
              >
                {{ contact.tipo }}
              </td>
              <td
                class="max-w-sm p-4 overflow-hidden text-base font-normal text-gray-500 truncate xl:max-w-xs"
              >
                {{ contact.descricao }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </AppModal>
</template>

<script lang="ts">
import { Options, Vue, prop } from "vue-class-component";
import UserForm from "./UserForm.vue";
import { useBackendApi } from "@/service/Backend";
import InputField from "@/components/Form/InputField.vue";
import AppModal from "@/components/AppModal/AppModal.vue";
import UserResponse from "@/interfaces/responses/UserResponse";
import { handleServiceError } from "@/utils/ServiceErrorHandler";
import ContactResponse from "@/interfaces/responses/ContactResponse";
import ListContactsResponse from "@/interfaces/responses/ListContactsResponse";

@Options({
  emits: ["onConfirm"],
  components: {
    AppModal,
    InputField,
    UserForm,
  },
})
export default class ViewUserModal extends Vue {
  public user!: UserResponse;
  public contactList!: ContactResponse[];
  public loadingContactList!: boolean;

  /**
   * Retorna a referencia da modal de visualizar usuário
   */
  public get modalRef() {
    return this.$refs.mViewUserRef as any;
  }

  /**
   * Seta a lista de usuários
   */
  public setUser(user: UserResponse) {
    this.user = user;
  }

  /**
   * Seta a lista de usuários
   */
  public setContactList(contactList: ContactResponse[]) {
    this.contactList = contactList;
  }

  /**
   * Mostra o Modal
   */
  public async showModal(user: UserResponse) {
    this.setUser(user);
    await this.loadContacts(user.id);
    this.modalRef.showModal();
  }

  /**
   * Fecha o Modal
   */
  public closeModal() {
    this.modalRef.closeModal();
  }

  /**
   * Carrega a lista de contatos.
   */
  public async loadContacts(userId: number) {
    const analyticsApi = useBackendApi();
    this.loadingContactList = true;
    try {
      const response = await analyticsApi.callGet<ListContactsResponse>(
        `/api/users/${userId}/contacts`
      );
      if (response.status === 200) {
        const { data } = response.data;
        this.setContactList(data);
      }
    } catch (err) {
      console.log(err);
      handleServiceError(err, "Falha ao buscar a lista de contatos");
    } finally {
      this.loadingContactList = false;
      console.log(this.contactList);
    }
  }
}
</script>
