import { usePage } from "@inertiajs/react";
export const hideSidebar = () => {
    const {url} = usePage();
    const hideSidebarRoutes = [
        '/'
    ];
    return !!hideSidebarRoutes.includes(url);    
}
