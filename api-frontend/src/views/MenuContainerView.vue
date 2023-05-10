<template>
  <div class="flex h-screen w-screen">
    <SideMenu>
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
export default class MenuContainerView extends Vue {}
</script>
