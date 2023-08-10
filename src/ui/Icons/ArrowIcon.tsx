interface IArrowIcon {
    className?: string;
    isOpen?: boolean;
}

export const ArrowIcon = ({className, isOpen}: IArrowIcon) => {
    const transform = isOpen ? 'rotate(180)' : '';

    return (
        <svg className={className} width="16" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg" transform={transform}>
            <path d="M15 1L8 8L1 1" stroke="#B7280F" strokeWidth="2"/>
        </svg>
    )
}