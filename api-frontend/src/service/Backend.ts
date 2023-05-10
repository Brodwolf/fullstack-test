import Api from './Api'

export default class Backend extends Api {
  public constructor() {
    super(process.env.VUE_APP_BACKEND_API_URL ?? 'http://localhost:9098')
  }
}

export const useBackendApi = () => new Backend()