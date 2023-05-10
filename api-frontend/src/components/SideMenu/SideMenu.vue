<template>
  <main class="flex w-full h-full">
    <TransitionRoot :show="sidebarOpened">
      <Dialog
        as="div"
        @close="toggleSidebar"
        class="fixed max-w-xs inset-0 z-40 pr-2 md:hidden"
      >
        <TransitionChild
          enter="transition ease-in-out duration-200 transform"
          enter-from="-translate-x-full"
          enter-to="translate-x-0"
          leave="transition ease-in-out duration-200 transform"
          leave-from="translate-x-0"
          leave-to="-translate-x-full"
          as="template"
        >
          <div
            class="flex flex-col justify-between h-full bg-black duration-500 transition-all w-60"
          >
            <div>
              <div
                class="w-full flex items-center justify-center space-x-3 py-10"
              >
                <img
                  class="w-max px-5 select-none"
                  src="../../assets/logo-magazord.png"
                />
              </div>

              <div class="w-full px-1">
                <div
                  class="flex flex-colitems-center w-full text-gray-300"
                  v-for="(menu, index) in MenuItems"
                  @click="onClickMenu(menu)"
                  :key="index"
                >
                  <a
                    :class="`flex items-center w-full px-3 my-1 py-2 cursor-pointer hover:bg-gray-700 hover:text-gray-300 space-x-5
              ${isActive(menu) ? 'border-l-2 border-white' : ''}`"
                  >
                    <component
                      :is="menu.icon"
                      class="w-5 h-5 flex-shrink-0 ml-6"
                    />
                    <span class="ml-2 text-sm font-normal">{{
                      menu.title
                    }}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </TransitionChild>
      </Dialog>
    </TransitionRoot>

    <div
      class="md:flex flex-col hidden justify-between h-full bg-black duration-500 transition-all w-60"
    >
      <div>
        <div class="w-full flex items-center justify-center space-x-3 py-10">
          <img
            class="w-max px-5 select-none"
            src="../../assets/logo-magazord.png"
          />
        </div>

        <div class="w-full px-1">
          <div
            class="flex flex-colitems-center w-full text-gray-300"
            v-for="(menu, index) in MenuItems"
            @click="onClickMenu(menu)"
            :key="index"
          >
            <a
              :class="`flex items-center w-full px-3 my-1 py-2 cursor-pointer hover:bg-gray-700 hover:text-gray-300 space-x-5
              ${isActive(menu) ? 'border-l-2 border-white' : ''}`"
            >
              <component :is="menu.icon" class="w-5 h-5 flex-shrink-0 ml-6" />
              <span class="ml-2 text-sm font-normal">{{ menu.title }}</span>
            </a>
          </div>
        </div>
      </div>
    </div>

    <div class="flex flex-col w-full h-full">
      <Navbar :title="title" />
      <slot></slot>
    </div>
  </main>
</template>
  
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { LogOut } from "lucide-vue-next";
import Navbar from "../Navbar/Navbar.vue";
import SideMenuItems from "@/utils/SideMenuItems";
import StoreModuleMenu from "@/store/StoreModuleMenu";
import type SideMenuItem from "@/interfaces/SideMenuItem";
import {
  Dialog,
  DialogOverlay,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";

@Options({
  components: {
    Navbar,
    LogOut,
    Dialog,
    DialogOverlay,
    TransitionChild,
    TransitionRoot,
  },
})
export default class SideMenu extends Vue {
  public title = "Home";

  /**
   * Indica se a sidebar está aberta
   */
  public get sidebarOpened() {
    return StoreModuleMenu.sidebarOpened;
  }

  /**
   * Altera o estado da sidebar
   */
  public toggleSidebar() {
    StoreModuleMenu.toggleSidebarState();
  }

  /**
   * Retorna os itens do Menu
   */
  public get MenuItems() {
    return SideMenuItems;
  }

  /**
   * Verifica se o menu está ativo
   */
  public isActive(menu: SideMenuItem) {
    return this.$route.path.startsWith(menu.link);
  }

  /**
   * Disparado ao clicar em um item do menu
   */
  public onClickMenu(menu: SideMenuItem) {
    this.title = menu.title;
    this.$router.push(menu.link);
  }
}
</script>
