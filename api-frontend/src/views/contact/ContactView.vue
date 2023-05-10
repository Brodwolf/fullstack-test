<template>
  <CreateContactModal ref="mNewContact" @onConfirm="loadContacts()" />
  <UpdateContactModal ref="mUpdateContact" @onConfirm="loadContacts()" />
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
              @click="newContact"
              class="select-none inline-flex space-x-2 cursor-pointer items-center justify-center w-1/2 px-3 py-2 text-sm font-medium text-center bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-primary-300 sm:w-auto"
            >
              <Plus class="w-4 h-4" />
              <span>Adicionar Contato</span>
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
                    Tipo
                  </th>
                  <th
                    scope="col"
                    class="p-4 text-xs font-medium text-center text-gray-500 uppercase"
                  >
                    Descrição
                  </th>
                  <th
                    scope="col"
                    class="p-4 text-xs font-medium text-center text-gray-500 uppercase"
                  >
                    Usuário
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
                v-if="!loadingContactList"
                class="bg-white divide-y divide-gray-200"
              >
                <tr
                  class="hover:bg-gray-100 dark:hover:bg-gray-700 text-center"
                  v-for="contact of isSearching ? filteredContact : contactlist"
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
                  <td
                    class="max-w-sm p-4 overflow-hidden text-base font-normal text-gray-500 truncate xl:max-w-xs"
                  >
                    {{ contact.user.nome }}
                  </td>
                  <td class="p-4 space-x-2 whitespace-nowrap">
                    <button
                      type="button"
                      data-modal-toggle="delete-user-modal"
                      class="cursor-pointer inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-800"
                      @click="onEditContact(contact)"
                    >
                      <Pencil class="w-4 h-4 mr-2" />
                      Editar
                    </button>
                    <button
                      type="button"
                      data-modal-toggle="delete-user-modal"
                      class="cursor-pointer inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-800"
                      @click="deleteContact(contact.id)"
                    >
                      <Trash class="w-4 h-4 mr-2" />
                      Excluir
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
import { Plus, Trash, Pencil, Users } from "lucide-vue-next";
import { handleServiceError } from "@/utils/ServiceErrorHandler";
import ContactResponse from "@/interfaces/responses/ContactResponse";
import ListContactsResponse from "@/interfaces/responses/ListContactsResponse";
import CreateContactModal from "@/components/ContactForm/CreateContactModal.vue";
import UpdateContactModal from "@/components/ContactForm/UpdateContactModal.vue";

@Options({
  components: {
    Plus,
    Trash,
    Pencil,
    Users,
    CreateContactModal,
    UpdateContactModal,
  },
})
export default class ContactView extends Vue {
  public searchTerm = "";
  public isSearching = false;
  public loadingContactList = false;
  public contactlist!: ContactResponse[];
  public filteredContact!: ContactResponse[];

  /**
   * Evento disparado ao carregar uma janela
   */
  public mounted() {
    this.loadContacts();
  }

  /**
   * Realiza a pesquisa
   */
  public search() {
    if (this.searchTerm.length > 0) {
      this.isSearching = true;
      const result = this.contactlist.filter((contact) =>
        contact.user.nome.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
      this.filteredContact = result.length > 0 ? result : [];
    } else {
      this.isSearching = false;
      this.filteredContact = [];
    }
  }

  /**
   * Retorna a referencia da modal de novo contato
   */
  public get mNewContact() {
    return this.$refs.mNewContact as any;
  }

  /**
   * Abre a modal de novo contato
   */
  public newContact() {
    this.mNewContact.showModal();
  }

  /**
   * Retorna a referencia da modal de atualizar contato
   */
  public get mUpdateContact() {
    return this.$refs.mUpdateContact as any;
  }

  /**
   * Abre a modal de atualizar contato
   */
  public updateContact(contact: ContactResponse) {
    this.mUpdateContact.showModal(contact);
  }

  /**
   * Disparado ao clicar em editar contato
   */
  public onEditContact(contact: ContactResponse) {
    this.updateContact(contact);
  }

  /**
   * Seta a lista de contatos
   */
  public setUsersList(contactlist: ContactResponse[]) {
    this.contactlist = contactlist;
  }

  /**
   * Carrega a lista de contatos.
   */
  public async loadContacts() {
    const analyticsApi = useBackendApi();
    this.loadingContactList = true;
    try {
      const response = await analyticsApi.callGet<ListContactsResponse>(
        "/api/contacts"
      );
      if (response.status === 200) {
        const { data } = response.data;
        this.setUsersList(data);
      }
    } catch (err) {
      console.log(err);
      handleServiceError(err, "Falha ao buscar a lista de contatos");
    } finally {
      this.loadingContactList = false;
    }
  }

  /**
   * Deleta o usuário
   */
  public async deleteContact(contactId: number) {
    const toast = useToast();
    const backendApi = useBackendApi();
    try {
      const response = await backendApi.callDelete(
        `/api/contacts/${contactId}`
      );
      if (response.status === 200) {
        toast.success("Contato excluído com sucesso");
      }
    } catch (err) {
      console.log(err);
      handleServiceError(err, "Falha ao excluír o usuário");
    } finally {
      this.loadContacts();
    }
  }
}
</script>