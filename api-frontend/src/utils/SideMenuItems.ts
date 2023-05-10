import type SideMenuItem from '@/interfaces/SideMenuItem'
import { HomeIcon, UsersIcon, Phone } from 'lucide-vue-next'

const items: SideMenuItem[] = [
  {
    title: 'Home',
    icon: HomeIcon,
    link: '/home'
  },
  {
    title: 'Usuários',
    icon: UsersIcon,
    link: '/users'
  },
  {
    title: 'Contatos',
    icon: Phone,
    link: '/contacts'
  }
]

export default items