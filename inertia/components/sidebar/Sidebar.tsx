import Logo from '../../../resources/assets/logo_sanrahfood.png';
import SectionDivider from "./SectionDivider";
import SidebarMenuItem from "./SidebarMenuItem";
import { TbHome } from "react-icons/tb";
import { data as menuSections } from "./data";
import { Link, usePage } from "@inertiajs/react";

export default function Sidebar() {
    const { url } = usePage();
    const isDashboardActive = url === "/dashboard" || url.startsWith("/dashboard/");
    return (
        <>
            <nav className="w-80 bg-dark-teal h-screen overflow-y-auto">
                <div className="px-5 pt-5 pb-3">
                    <img src={Logo} height="200px" alt="logo_sanrah" />
                </div>
                {/* Dashboard */}
                <ul className="flex flex-col px-5 gap-1 pb-2">
                    <li>
                        <Link
                            href="/dashboard"
                            className={[
                                "flex flex-row items-center gap-3 py-2 rounded-lg",
                                "transition-all duration-200 ease-in-out select-none",
                                isDashboardActive
                                    ? "bg-white/20 border-l-4 border-white font-semibold"
                                    : "border-l-4 border-transparent hover:bg-white/10 hover:border-white/30",
                            ].join(" ")}
                        >
                            <TbHome
                                size={18}
                                className={isDashboardActive ? "text-white" : "text-white/60"}
                            />
                            <span
                                className={[
                                    "text-[15px] leading-none whitespace-nowrap",
                                    isDashboardActive ? "text-white font-semibold" : "text-white/70",
                                ].join(" ")}
                            >
                                Dashboard
                            </span>
                        </Link>
                    </li>
                </ul>
                {/* Grouped sections */}
                <ul className="flex flex-col px-5 gap-1 pb-6">
                    {menuSections.map((section, i) => (
                        <div key={i}>
                            <SectionDivider label={section.label} />
                            {section.items.map((item, j) => (
                                <SidebarMenuItem key={j} item={item} />
                            ))}
                        </div>
                    ))}
                </ul>
            </nav>
        </>
    );
}
