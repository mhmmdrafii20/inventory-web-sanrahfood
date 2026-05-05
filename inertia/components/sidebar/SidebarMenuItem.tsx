// SATU BARIS MENU
import { Link, usePage } from '@inertiajs/react'
import type { MenuItem } from './types'

export default function SidebarMenuItem({ item }: { item: MenuItem }) {
  const { url } = usePage()

  // Aktif jika pathname dimulai dengan link item ini
  // (misal: /pengguna cocok dengan /pengguna/edit/1)
  const isActive = url === item.link

  const className = [
    // Base — layout & transition
    'flex flex-row items-center gap-2 py-2 rounded-lg',
    'transition-all duration-200 ease-in-out',
    'select-none',

    // Active state
    isActive
      ? 'bg-white/20 border-l-4 border-white font-semibold'
      : // Default + Hover state
        'border-l-4 border-transparent',
    'hover:bg-white/10 hover:border-white/30',
  ].join(' ')

  const content = (
    <>
      {/* Icon — lebih kontras saat aktif */}
      {item.icon && (
        <item.icon
          size={18}
          className={isActive ? 'text-white' : 'text-white/60 group-hover:text-white/90'}
        />
      )}
      {/* Label */}
      <span
        className={[
          'text-[15px] leading-none whitespace-nowrap',
          isActive ? 'text-white font-semibold' : 'text-white/70',
        ].join(' ')}
      >
        {item.name}
      </span>
    </>
  )
  //kalau tipe action render sebagai div. kalau tidak render sebagai link
  if (item.type === 'action') {
    return <div className={className}>{content}</div>
  }

  return (
    <Link href={item.link} className={className}>
      {content}
    </Link>
  )
}
