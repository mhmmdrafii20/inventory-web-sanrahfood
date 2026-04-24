import { IconType } from "react-icons/lib";

export interface MenuItem {
    name: string;
    link: string;
    icon: IconType;
}
export interface MenuSection {
    label: string;
    items: MenuItem[];
}