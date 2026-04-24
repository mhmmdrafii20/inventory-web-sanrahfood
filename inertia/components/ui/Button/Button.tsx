import { ButtonHTMLAttributes, ReactNode } from "react"

type ModelType = 1;
type SizeType = 'md';

type Params = ButtonHTMLAttributes<HTMLButtonElement> & {
    children: ReactNode,
    variant: ModelType,
    size: SizeType,
}

const Button = ({ variant, size, children, className, ...props }: Params) => {
    const model = {
        1: "bg-medium-teal text-[16px] text-white cursor-pointer rounded-md transition-all duration-200 ease-in-out hover:brightness-110",
    }
    const sizes = {
        md: "px-4 py-2",
    }
    return <button {...props} className={`${model[variant]} ${sizes[size]} ${className ?? ''}`} >{children}</button>
}

export default Button;