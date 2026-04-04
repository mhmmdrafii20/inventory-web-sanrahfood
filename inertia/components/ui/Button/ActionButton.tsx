import { HTMLAttributes, ReactNode } from "react"

type ActionType = 'search' | 'update' | 'delete';
type SizeType = 'sm' | 'md' | 'lg';

type Params = HTMLAttributes<HTMLButtonElement> & {
    children:ReactNode,
    type:ActionType,
    size:SizeType,
}

const ActionButton = ({type, size, children, ...props}:Params) => {
    const actionType = {
        search:"bg-medium-teal text-white",
        update:"bg-deep-cyan text-white",
        delete:"bg-red-500 text-white",
    }
    const actionSize = {
        sm:"px-2 h-7.5",
        md:"px-2 h-8",
        lg:"px-4 h-10"
    }
    return <button {...props} className={`rounded-sm cursor-pointer ${actionType[type]} ${actionSize[size]}`}>{children}</button>
}
export default ActionButton