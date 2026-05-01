import { HTMLAttributes, ReactNode } from "react";

type SizesType = "sm" | "md" | "lg";
type ColorsType = "dark_slate_grey" | "ultra_light_grey" | "dark_grey" | "red_500";

type Params = HTMLAttributes<HTMLParagraphElement> & {
    size: SizesType,
    color?: ColorsType,
    children: ReactNode,
}

const Paragraph = ({ size, color, children, className, ...props }: Params) => {
    const colors = {
        dark_slate_grey: "text-dark-slate-grey",
        ultra_light_grey: "text-ultra-light-grey",
        dark_grey: "text-dark-grey",
        red_500: "text-red-500"
    }
    const sizes = {
        sm: "text-[12px]",
        md: "text-[16px]",
        lg: "text-[18px]",
    }
    return <p {...props} className={`${sizes[size]} ${color ? colors[color] : ''} ${className ?? ''}`} >{children}</p>
}
export default Paragraph;