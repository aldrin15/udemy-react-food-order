const Error = ({ title, message }: { title: string; message: string }) => {
    return (
        <div className="error">
            <h2>{title}</h2>
            <p>{message}</p>
        </div>
    )
}

export default Error
