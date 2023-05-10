<template>
  <div class="w-screen h-screen flex bg-gray-50">
    <SideMenu class="w-full h-full">
      <router-view />
    </SideMenu>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import SideMenu from "@/components/SideMenu/SideMenu.vue";

@Options({
  components: {
    SideMenu,
  },
})
export default class PageStructure extends Vue {}
</script>
