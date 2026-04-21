import { HTMLAttributes, ReactNode } from "react";

type SizesType = "sm" | "md" | "lg";
type Params = HTMLAttributes<HTMLParagraphElement> & {
    size: SizesType,
    children: ReactNode,
}

const Paragraph = ({ size, children, className, ...props }: Params) => {
    const sizes = {
        sm: "text-[12px]",
        md: "text-[16px]",
        lg: "text-[18px]",
    }
    return <p {...props} className={`${sizes[size]} ${className}`} >{children}</p>
}
export default Paragraph;