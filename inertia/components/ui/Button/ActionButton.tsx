import { HTMLAttributes, ReactNode } from "react"

type ActionType = 'search' | 'update' | 'delete';
type SizeType = 'xs' | 'sm' | 'md' | 'lg';

type Params = HTMLAttributes<HTMLElement> & {
    children:ReactNode,
    type:ActionType,
    size:SizeType,
    as?: 'button' | 'span' | 'div',
}


const ActionButton = ({type, size, children, as, className,  ...props}:Params) => {
    const Component = as || 'button';

    const actionType = {
        search:"bg-medium-teal text-white",
        update:"bg-deep-cyan text-white",
        delete:"bg-red-500 text-white",
    }
    const actionSize = {
        xs:"px-1 h-5",
        sm:"px-2 h-7.5",    
        md:"px-2 h-8",
        lg:"px-4 h-10"
    }
    return <Component {...props} className={`rounded-sm cursor-pointer ${actionType[type]} ${actionSize[size]} ${className ?? ''} `}>{children}</Component>
}
export default ActionButton