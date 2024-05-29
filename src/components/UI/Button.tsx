const Button = ({
    children,
    textOnly,
    type,
    className,
    onClick,
    ...props
}: {
    children?: string | JSX.Element | JSX.Element[]
    textOnly?: Boolean
    type?: 'submit' | 'email' | 'text' | 'button' | undefined
    onClick?: () => void
    className?: string
}) => {
    let cssClasses = textOnly ? 'text-button' : 'button'
    cssClasses += ' ' + className

    return (
        <button className={cssClasses} {...props}>
            {children}
        </button>
    )
}

export default Button
