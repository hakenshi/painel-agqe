import LoginForm from "./login-form";

export default function LoginPage() {
    return (
        <main className="bg-linear-90 from-purple-600 via pink-500 to-red-500 h-screen grid place-items-center relative">
            <div className="bg-black/10 absolute inset-0"></div>
            <LoginForm />
        </main>
    )
}
