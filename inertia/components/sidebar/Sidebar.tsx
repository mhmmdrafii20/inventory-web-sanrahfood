import Logo from '../../../resources/assets/logo_sanrahfood.png'
import SectionDivider from './SectionDivider'
import SidebarMenuItem from './SidebarMenuItem'
import { data as menuSections } from './data'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useForm } from '@inertiajs/react'
import { MenuItem, User } from './types'
import Heading from '~/components/ui/Heading'

export default function Sidebar() {
  const { post } = useForm()
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get('/current-user')
      setUser(res.data.currentUser)
    }
    fetchUser()
  }, [])

  const menuWithPermissions = menuSections.map((item) => {
    return {
      ...item,
      items: item.items.filter(
        (subItem) => subItem.role && subItem.role.includes(user?.hakAkses?.namaHakAkses ?? '')
      ),
    }
  })
  async function handleAction(item: MenuItem) {
    if (item.type === 'action' && item.action === 'logout') {
      post('/signout')
    }
  }

  return (
    <>
      <nav className="w-80 bg-dark-teal overflow-y-auto">
        <div className="px-5 pt-5 pb-3 ">
          <h1 className="font-bold text-center !text-white w-full">
            SANRAHFOOD INVENTORY MANAGEMENT
          </h1>
        </div>
        {/* Grouped sections */}
        <ul className="flex flex-col px-5 gap-1 pb-6">
          {menuWithPermissions
            .filter((section) => section.items.length > 0)
            .map((section) => (
              <li key={section.label}>
                <SectionDivider label={section.label} />

                <ul className="flex flex-col">
                  {section.items.map((item) => (
                    <li key={item.name}>
                      {item.type === 'action' ? (
                        <button
                          onClick={() => handleAction(item)}
                          className="w-full text-left p-0 cursor-pointer"
                        >
                          <SidebarMenuItem item={item} />
                        </button>
                      ) : (
                        <SidebarMenuItem item={item} />
                      )}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
        </ul>
      </nav>
    </>
  )
}
