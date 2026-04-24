import { ComponentProps } from "react";

type VariantType = 1;
type SizesType = "md";
interface Params extends Omit<ComponentProps<"select">, "size"> {
    variant: VariantType;
    size: SizesType;
}

const Select = ({ variant, size, className, ...props }: Params) => {
    const variants = {
        1: "bg-white rounded-md outline-none border-1 border-light-grey",
    }

    const sizes = {
        md: "px-4 py-2",
    }
    return <select {...props} className={`${variants[variant]} ${sizes[size]} ${className ?? ''}`} />
}
export default Select;
