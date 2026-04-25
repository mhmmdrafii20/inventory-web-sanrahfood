import { Data } from '@generated/data'
import { ReactElement } from 'react'
import Sidebar from '~/components/sidebar/Sidebar'
import { hideSidebar } from '~/hooks/usePageLayout';
import { useEffect } from 'react';
import { toast } from 'sonner'
import { usePage } from '@inertiajs/react';

export default function Layout({ children }: { children: ReactElement<Data.SharedProps> }) {
  const { flash } = usePage<{ flash?: { success?: string; error?: string } }>().props;

  useEffect(() => {
    flash?.success && toast.success(flash.success)
    flash?.error && toast.error(flash.error)
  }, [flash]);

  return (
    <>
      <div className="flex flex-row min-h-screen">
        {!hideSidebar() && <Sidebar />}
        <main className="w-full p-5">{children}</main>
      </div>
    </>
  )
}
