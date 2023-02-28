function Error({children}) {
    return (
        <div className="my-4 py-3 text-white font-bold bg-red-600 text-center rounded-sm uppercase">
            {children}
        </div>
    )
}

export default Error