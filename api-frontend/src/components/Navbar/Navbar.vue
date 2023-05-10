<template>
  <div
    class="flex flex-row justify-between items-center w-full px-5 h-16 border-b border-gray-300 bg-gray-50"
  >
    <div class="flex items-center space-x-3">
      <div class="md:hidden flex p-1 cursor-pointer" @click="onClickMenu()">
        <Menu class="mt-1 w-5 shrink-0 text-slate-800 hover:text-slate-500" />
      </div>
      <span class="text-black text-xl font-bold">{{ title }}</span>
    </div>

    <div class="flex flex-row">
      <img
        class="h-9 rounded-lg select-none"
        src="https://media.licdn.com/dms/image/C5603AQGZFjntVrD7Kg/profile-displayphoto-shrink_800_800/0/1632881489563?e=1686182400&v=beta&t=3dR4DDsH-oHmX5u7h5V72m_7Q47ikbMhZ7pNbvqp_8k"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { Menu } from "lucide-vue-next";
import StoreModuleMenu from "@/store/StoreModuleMenu";
import SideMenu from "@/components/SideMenu/SideMenu.vue";

@Options({
  components: {
    Menu,
    SideMenu,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
  },
})
export default class Navbar extends Vue {
  /**
   * Disparado ao clicar no icone do menu hamburguer
   */
  public onClickMenu() {
    console.log(process.env.VUE_APP_BACKEND_API_URL);
    StoreModuleMenu.toggleSidebarState();
  }
}
</script>
