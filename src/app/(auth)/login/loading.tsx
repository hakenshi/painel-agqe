export default function Loading() {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div>
                <p>Carregando...</p> <br/>
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-pink-500"></div>
            </div>
        </div>
    )
}