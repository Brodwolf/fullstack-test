<template>
  <Form
    ref="fUser"
    @submit="onSubmitForm"
    :validation-schema="formSchema"
    :initial-values="formValues"
  >
    <div>
      <div class="max-h-60vh overflow-y-auto px-5">
        <Field name="nome" v-slot="{ handleChange, value, errorMessage }">
          <InputField
            name="nome"
            label="Nome:"
            placeholder="Informe o Nome..."
            type="text"
            :error="errorMessage"
            :required="true"
            :value="value"
            @onInput="handleChange"
          />
        </Field>
        <Field name="cpf" v-slot="{ handleChange, value, errorMessage }">
          <InputField
            name="cpf"
            label="CPF:"
            placeholder="Informe o CPF (somente números)..."
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
import AppModal from "@/components/AppModal/AppModal.vue";
import InputField from "@/components/Form/InputField.vue";
import PrimaryButton from "@/components/Button/PrimaryButton.vue";

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
  },
})
export default class UserForm extends Vue.with(Props) {
  public isProcessing = false;

  /**
   * Retorna schema de validação do formulário
   */
  public get formSchema() {
    return yup.object({
      nome: yup.string().required("O nome é obrigatório"),
      cpf: yup
        .string()
        .required("O CPF é obrigatório")
        .test("test-invalid-cpf", "CPF Inválido", (cpf) =>
          this.isValidCPF(cpf)
        ),
    });
  }

  /**
   * Verifica se o cpf é válido
   */
  public isValidCPF = (cpf: string) => {
    if (cpf == null) {
      return false;
    }
    if (cpf.length != 11) {
      return false;
    }
    if (
      cpf == "00000000000" ||
      cpf == "11111111111" ||
      cpf == "22222222222" ||
      cpf == "33333333333" ||
      cpf == "44444444444" ||
      cpf == "55555555555" ||
      cpf == "66666666666" ||
      cpf == "77777777777" ||
      cpf == "88888888888" ||
      cpf == "99999999999"
    ) {
      return false;
    }
    let numero: number = 0;
    let caracter: string = "";
    let numeros: string = "0123456789";
    let j: number = 10;
    let somatorio: number = 0;
    let resto: number = 0;
    let digito1: number = 0;
    let digito2: number = 0;
    let cpfAux: string = "";
    cpfAux = cpf.substring(0, 9);
    for (let i: number = 0; i < 9; i++) {
      caracter = cpfAux.charAt(i);
      if (numeros.search(caracter) == -1) {
        return false;
      }
      numero = Number(caracter);
      somatorio = somatorio + numero * j;
      j--;
    }
    resto = somatorio % 11;
    digito1 = 11 - resto;
    if (digito1 > 9) {
      digito1 = 0;
    }
    j = 11;
    somatorio = 0;
    cpfAux = cpfAux + digito1;
    for (let i: number = 0; i < 10; i++) {
      caracter = cpfAux.charAt(i);
      numero = Number(caracter);
      somatorio = somatorio + numero * j;
      j--;
    }
    resto = somatorio % 11;
    digito2 = 11 - resto;
    if (digito2 > 9) {
      digito2 = 0;
    }
    cpfAux = cpfAux + digito2;
    if (cpf != cpfAux) {
      return false;
    } else {
      return true;
    }
  };

  /**
   * Disparado ao confirmar o formulário
   */
  public async onSubmitForm(values: Record<string, string | number>) {
    this.isProcessing = true;
    this.$emit("onSubmit", values);
  }
}
</script>
