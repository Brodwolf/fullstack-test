<template>
  <CreateUserModal ref="mNewUser" @onConfirm="loadUsers()" />
  <UpdateUserModal ref="mUpdateUser" @onConfirm="loadUsers()" />
  <ViewUserModal ref="mViewUser" />
  <div class="w-full h-full flex flex-col bg-gray-50 overflow-y-scroll">
    <div
      class="p-4 bg-white block sm:flex items-center border-b border-gray-200 lg:mt-1.5"
    >
      <div class="w-full mb-1">
        <div class="sm:flex">
          <div
            class="items-center hidden mb-3 sm:flex sm:divide-x sm:divide-gray-100 sm:mb-"
          >
            <label for="users-search" class="sr-only">Search</label>
            <div class="relative mt-1 lg:w-64 xl:w-96">
              <input
                ref="searchInput"
                @keyup="search"
                v-model="searchTerm"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                placeholder="Pesquisar Usuário"
              />
            </div>
          </div>
          <div class="flex items-center ml-auto space-x-2 sm:space-x-3">
            <div
              @click="newUser"
              class="select-none inline-flex space-x-2 cursor-pointer items-center justify-center w-1/2 px-3 py-2 text-sm font-medium text-center bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-primary-300 sm:w-auto"
            >
              <Plus class="w-4 h-4" />
              <span>Adicionar Usuário</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-col">
      <div class="overflow-x-auto">
        <div class="inline-block min-w-full align-middle">
          <div class="overflow-hidden shadow">
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
                    Nome
                  </th>
                  <th
                    scope="col"
                    class="p-4 text-xs font-medium text-center text-gray-500 uppercase"
                  >
                    CPF
                  </th>
                  <th
                    scope="col"
                    class="p-4 text-xs font-medium text-center text-gray-500 uppercase"
                  >
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody
                v-if="!loadingUsersList"
                class="bg-white divide-y divide-gray-200"
              >
                <tr
                  class="hover:bg-gray-100 dark:hover:bg-gray-700 text-center"
                  v-for="user of isSearching ? filteredUser : usersList"
                  :key="user.id"
                >
                  <td
                    class="max-w-sm p-4 overflow-hidden text-base font-normal text-gray-500 truncate xl:max-w-xs"
                  >
                    {{ user.id }}
                  </td>
                  <td
                    class="max-w-sm p-4 overflow-hidden text-base font-normal text-gray-500 truncate xl:max-w-xs"
                  >
                    {{ user.nome }}
                  </td>
                  <td
                    class="max-w-sm p-4 overflow-hidden text-base font-normal text-gray-500 truncate xl:max-w-xs"
                  >
                    {{ user.cpf }}
                  </td>
                  <td class="p-4 space-x-2 whitespace-nowrap">
                    <button
                      type="button"
                      data-modal-toggle="delete-user-modal"
                      class="cursor-pointer inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-800"
                      @click="onEditUser(user)"
                    >
                      <Pencil class="w-4 h-4 mr-2" />
                      Editar
                    </button>
                    <button
                      type="button"
                      data-modal-toggle="delete-user-modal"
                      class="cursor-pointer inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-800"
                      @click="deleteUser(user.id)"
                    >
                      <Trash class="w-4 h-4 mr-2" />
                      Excluir
                    </button>
                    <button
                      type="button"
                      data-modal-toggle="delete-user-modal"
                      class="cursor-pointer inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-800"
                      @click="onViewUser(user)"
                    >
                      <Eye class="w-4 h-4 mr-2" />
                      Visualizar
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { useToast } from "vue-toastification";
import { useBackendApi } from "@/service/Backend";
import UserResponse from "@/interfaces/responses/UserResponse";
import { handleServiceError } from "@/utils/ServiceErrorHandler";
import { Plus, Trash, Pencil, Users, Eye } from "lucide-vue-next";
import ViewUserModal from "@/components/UserForm/ViewUserModal.vue";
import CreateUserModal from "@/components/UserForm/CreateUserModal.vue";
import UpdateUserModal from "@/components/UserForm/UpdateUserModal.vue";
import ListUsersResponse from "@/interfaces/responses/ListUsersResponse";

@Options({
  components: {
    Plus,
    Trash,
    Pencil,
    Users,
    Eye,
    CreateUserModal,
    UpdateUserModal,
    ViewUserModal,
  },
})
export default class DashboardView extends Vue {
  public searchTerm = "";
  public isSearching = false;
  public loadingUsersList = false;
  public filteredUser: UserResponse[] = [];
  public usersList!: UserResponse[];

  /**
   * Evento disparado ao carregar uma janela
   */
  public mounted() {
    this.loadUsers();
  }

  /**
   * Realiza a pesquisa
   */
  public search() {
    if (this.searchTerm.length > 0) {
      this.isSearching = true;
      const result = this.usersList.filter((user) =>
        user.nome.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
      this.filteredUser = result.length > 0 ? result : [];
    } else {
      this.isSearching = false;
      this.filteredUser = [];
    }
  }

  /**
   * Retorna a referencia da modal de novo usuario
   */
  public get mNewUser() {
    return this.$refs.mNewUser as any;
  }

  /**
   * Retorna a referencia da modal de visualizar usuário
   */
  public get mViewUser() {
    return this.$refs.mViewUser as any;
  }

  /**
   * Retorna a referencia da modal de atualizar usuário
   */
  public get mUpdateUser() {
    return this.$refs.mUpdateUser as any;
  }

  /**
   * Abre a modal de novo usuário
   */
  public newUser() {
    this.mNewUser.showModal();
  }

  /**
   * Abre a modal de atualizar usuário
   */
  public updateUser(user: UserResponse) {
    this.mUpdateUser.showModal(user);
  }

  /**
   * Abre a modal de visualizar usuário
   */
  public viewUser(user: UserResponse) {
    this.mViewUser.showModal(user);
  }

  /**
   * Disparado ao clicar em editar usuário
   */
  public onEditUser(user: UserResponse) {
    this.updateUser(user);
  }

  /**
   * Disparado ao clicar em editar usuário
   */
  public onViewUser(user: UserResponse) {
    this.viewUser(user);
  }

  /**
   * Seta a lista de usuários
   */
  public setUsersList(usersList: UserResponse[]) {
    this.usersList = usersList;
  }

  /**
   * Deleta o usuário
   */
  public async deleteUser(userId: number) {
    const toast = useToast();
    const backendApi = useBackendApi();
    try {
      const response = await backendApi.callDelete(`/api/users/${userId}`);
      if (response.status === 200) {
        toast.success("Usuário excluído com sucesso");
      }
    } catch (err) {
      console.log(err);
      handleServiceError(err, "Falha ao excluír o usuário");
    } finally {
      this.loadUsers();
    }
  }

  /**
   * Carrega a lista de usuários.
   */
  public async loadUsers() {
    const backendApi = useBackendApi();
    this.loadingUsersList = true;
    try {
      const response = await backendApi.callGet<ListUsersResponse>(
        "/api/users"
      );
      if (response.status === 200) {
        const { data } = response.data;
        this.setUsersList(data);
      }
    } catch (err) {
      console.log(err);
      handleServiceError(err, "Falha ao buscar a lista de usuários");
    } finally {
      this.loadingUsersList = false;
    }
  }
}
</script>