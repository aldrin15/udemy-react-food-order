const Input = ({
    label,
    id,
    ...props
}: {
    label: string
    id: string
    type: string
}) => {
    return (
        <p className="control">
            <label htmlFor={id}>{label}</label>
            <input id={id} name={id} {...props} required />
        </p>
    )
}

export default Input
