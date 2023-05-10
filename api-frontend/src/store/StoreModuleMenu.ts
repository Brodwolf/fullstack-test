import store from './Store'
import { VuexModule, Module, Mutation, Action } from 'vuex-class-modules'

@Module
class MenuModule extends VuexModule {

  // state
  public sidebarOpened = false

  // mutations
  @Mutation
  private setSidebarOpened(opened: boolean) {
    this.sidebarOpened = opened
  }

  @Action
  async toggleSidebarState() {
    this.setSidebarOpened(!this.sidebarOpened)
  }
}

export default new MenuModule({ store, name: 'menu' })
