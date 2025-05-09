import LoginForm from "./login-form";

export default function LoginPage() {
    return (
        <main className="bg-linear-90 from-purple-600 via pink-500 to-red-500 h-screen grid place-items-center">
            <section className="bg-white max-w-3xl w-full h-120 rounded-xl border-zinc-100 border-2" style={{
                boxShadow: "0px 0px 30px rgba(0,0,0,0.25)"
            }}>
                <LoginForm />
            </section>
        </main>
    )
}
