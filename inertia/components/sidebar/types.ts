import { IconType } from 'react-icons/lib'

export interface MenuItem {
  name: string
  link?: string
  icon?: IconType,
  role?: string[],
  type?: string,
  action?: string
}
export interface MenuSection {
  label: string
  items: MenuItem[]
}

export interface HakAkses {
  namaHakAkses: string
}
export interface User {
  hakAkses: HakAkses
}