import { HTMLAttributes, ReactNode } from "react";

type VariantType = 1;
interface Params extends HTMLAttributes<HTMLDivElement> {
    variant: VariantType;
    children: ReactNode;
}
const Error = ({ variant, className, children, ...props }: Params) => {
    const variants = {
        1: "text-red-500 font-bold text-sm",
    }
    return <div {...props} className={`${variants[variant]} ${className}`}>{children}</div>
}
export default Error;
