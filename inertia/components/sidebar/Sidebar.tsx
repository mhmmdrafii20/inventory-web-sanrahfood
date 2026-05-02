import Logo from '../../../resources/assets/logo_sanrahfood.png'
import SectionDivider from './SectionDivider'
import SidebarMenuItem from './SidebarMenuItem'
import { TbHome } from 'react-icons/tb'
import { data as menuSections } from './data'
import { Link, usePage } from '@inertiajs/react'
import supabase from 'services/supabase'
import axios from 'axios'
import { useState, useEffect } from 'react'
import Button from '~/components/ui/Button/Button'
import { useForm } from '@inertiajs/react'

export default function Sidebar() {
  const { url } = usePage()
  const { post } = useForm()
  const isDashboardActive = url === '/dashboard' || url.startsWith('/dashboard/')
  const [user, setUser] = useState(null)

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
      items: item.items.filter((subItem) => subItem.role.includes(user?.hakAkses?.namaHakAkses)),
    }
  })
  async function handleAction(item) {
    if (item.type === 'action' && item.action === 'logout') {
      post('/signout')
    }
  }

  return (
    <>
      <nav className="w-80 bg-dark-teal max-h-screen overflow-y-auto">
        <div className="px-5 pt-5 pb-3">
          <img src={Logo} height="200px" alt="logo_sanrah" />
        </div>
        {/* Dashboard */}
        <ul className="flex flex-col px-5 gap-1 pb-2">
          <li>
            <Link
              href="/dashboard"
              className={[
                'flex flex-row items-center gap-3 py-2 rounded-lg',
                'transition-all duration-200 ease-in-out select-none',
                isDashboardActive
                  ? 'bg-white/20 border-l-4 border-white font-semibold'
                  : 'border-l-4 border-transparent hover:bg-white/10 hover:border-white/30',
              ].join(' ')}
            >
              <TbHome size={18} className={isDashboardActive ? 'text-white' : 'text-white/60'} />
              <span
                className={[
                  'text-[15px] leading-none whitespace-nowrap',
                  isDashboardActive ? 'text-white font-semibold' : 'text-white/70',
                ].join(' ')}
              >
                Dashboard
              </span>
            </Link>
          </li>
        </ul>
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
                        <Button
                          onClick={() => handleAction(item)}
                          className="w-full text-left p-0 cursor-pointer"
                        >
                          <SidebarMenuItem item={item} />
                        </Button>
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
