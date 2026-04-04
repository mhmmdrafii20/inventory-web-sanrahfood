import { HTMLAttributes, ReactNode } from "react";

type SizesType = 1 | 2 | 3;
type ColorsType = "dark_slate_grey" | "ultra_light_grey" | "dark_grey";

type Params = HTMLAttributes<HTMLHeadingElement> & {
    children:ReactNode,
    level:SizesType,
    color:ColorsType,
}

const Heading = ({level, color, children, ...props}:Params) => {
    const sizes = {
        1:"text-[32px]",
        2:"text-[18px]",
        3:"text-[16px]",
    };
    const colors = {
        dark_slate_grey:"text-dark-slate-grey",
        ultra_light_grey:"text-ultra-light-grey",
        dark_grey:"text-dark-grey",
    }
    return <h1 {...props} className={`${sizes[level]} ${colors[color]}`} >{children}</h1>
}

export default Heading; 