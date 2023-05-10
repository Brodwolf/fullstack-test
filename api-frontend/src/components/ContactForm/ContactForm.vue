<template>
  <Form
    ref="fUser"
    @submit="onSubmitForm"
    :validation-schema="formSchema"
    :initial-values="formValues"
    v-slot="{ setFieldValue }"
  >
    <div>
      <div class="max-h-60vh overflow-y-auto px-5">
        <Field
          v-if="!isEditing"
          name="user"
          v-slot="{ handleChange, value, errorMessage }"
        >
          <SelectField
            name="user"
            label="Usuario:"
            placeholder="Selecione o usuário..."
            :isLoading="loadingUsersList"
            :error="errorMessage"
            :value="value"
            :itens="userList"
            :disabled="isEditing"
            :required="true"
            @onInput="
              (value) => onSelectUser(value, setFieldValue, handleChange)
            "
          />
        </Field>
        <Field name="tipo" v-slot="{ handleChange, value, errorMessage }">
          <SelectField
            name="tipo"
            label="Tipo:"
            placeholder="Tipo de Contato..."
            :error="errorMessage"
            :value="value"
            :itens="contactType"
            :required="true"
            @onInput="
              (value) => onSelectContactType(value, setFieldValue, handleChange)
            "
          />
        </Field>
        <Field name="descricao" v-slot="{ handleChange, value, errorMessage }">
          <InputField
            name="descricao"
            label="Descrição:"
            placeholder="Informe a descrição do contato..."
            type="text"
            :error="errorMessage"
            :required="true"
            :value="value"
            @onInput="handleChange"
          />
        </Field>
      </div>
      <div class="px-5 py-2">
        <PrimaryButton text="Confirmar" :fluid="true" :loading="isProcessing" />
      </div>
    </div>
  </Form>
</template>

<script lang="ts">
import { Options, prop, Vue } from "vue-class-component";
import * as yup from "yup";
import { Form, Field } from "vee-validate";
import { TrashIcon } from "lucide-vue-next";
import { useBackendApi } from "@/service/Backend";
import EnumContactType from "@/enum/EnumContactType";
import AppModal from "@/components/AppModal/AppModal.vue";
import InputField from "@/components/Form/InputField.vue";
import SelectFieldItem from "@/interfaces/SelectFieldItem";
import SelectField from "@/components/Form/SelectField.vue";
import UserResponse from "@/interfaces/responses/UserResponse";
import { handleServiceError } from "@/utils/ServiceErrorHandler";
import PrimaryButton from "@/components/Button/PrimaryButton.vue";
import ListUsersResponse from "@/interfaces/responses/ListUsersResponse";

class Props {
  isEditing: boolean = prop({
    required: true,
  });

  formValues: Record<string, any> = prop({
    required: true,
  });
}

@Options({
  emits: ["onSubmit"],
  components: {
    AppModal,
    TrashIcon,
    Form,
    Field,
    PrimaryButton,
    InputField,
    SelectField,
  },
})
export default class ContactForm extends Vue.with(Props) {
  public isProcessing = false;
  public usersList!: UserResponse[];
  public loadingUsersList = true;

  /**
   * Disparado ao entrar no componente
   */
  public mounted() {
    this.loadUsers();
  }

  /**
   * Seta a lista de usuários
   */
  public setUsersList(usersList: UserResponse[]) {
    this.usersList = usersList;
  }

  /**
   * Retorna schema de validação do formulário
   */
  public get formSchema() {
    return yup.object({
      tipo: yup.string().required("O tipo é obrigatório"),
      descricao: yup.string().required("A descrição é obrigatória"),
    });
  }

  /**
   * Retorna a lista de tipos de contato
   */
  public get contactType(): SelectFieldItem[] {
    return [
      {
        label: "Email",
        value: EnumContactType.EMAIL,
      },
      {
        label: "Telefone",
        value: EnumContactType.TELEFONE,
      },
    ];
  }

  /**
   * Disparado ao selecionar um usuário
   */
  public onSelectUser(
    userId: string,
    setFieldValue: (fieldName: string, value: any) => void,
    formHandleChange: (value: string) => void
  ) {
    formHandleChange(userId);
  }

  /**
   * Disparado ao selecionar um tipo
   */
  public onSelectContactType(
    type: string,
    setFieldValue: (fieldName: string, value: any) => void,
    formHandleChange: (value: string) => void
  ) {
    formHandleChange(type);
  }

  /**
   * Retorna a lista de usuários tratada para o campo de seleção
   */
  public get userList(): SelectFieldItem[] {
    if (this.loadingUsersList || this.isEditing) {
      return [];
    }

    return this.usersList.map((user: UserResponse) => ({
      label: user.nome,
      value: user.id,
    }));
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

  /**
   * Disparado ao confirmar o formulário
   */
  public async onSubmitForm(values: Record<string, string | number>) {
    this.isProcessing = true;
    this.$emit("onSubmit", values);
  }
}
</script>
