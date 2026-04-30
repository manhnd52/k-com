import { useState } from "react";
import { login } from "../services/userService";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            // support sync or async login implementations
            const result = await Promise.resolve(login(username, password));

            if (result?.success) {
                setLoading(false);
                navigate("/");
            } else {
                setError(result?.message || "Đăng nhập thất bại");
                setLoading(false);
            }
        } catch (err) {
            setError("Có lỗi xảy ra. Vui lòng thử lại.");
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-slate-50 text-slate-900">
            <div className="relative px-4 py-12">
                <div className="absolute inset-x-0 top-0 -z-10 h-48 bg-gradient-to-b from-sky-100/70 to-transparent" />

                <div className="mx-auto grid w-full max-w-5xl grid-cols-1 items-center gap-8 lg:grid-cols-2">
                    <div className="hidden flex-col gap-6 rounded-2xl bg-gradient-to-b from-white to-slate-50 p-8 lg:flex">
                        <div className="inline-flex items-center gap-3 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                            Welcome back
                        </div>
                        <h2 className="text-2xl font-semibold text-slate-900">Sign in to K-COM</h2>
                        <p className="text-sm text-slate-600">Securely access your MVP workspace and local data fixtures.</p>
                    </div>

                    <section className="w-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/70 sm:p-8">
                        <div className="mb-6 text-center">
                            <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">Welcome back</h1>
                            <p className="mt-2 text-sm leading-6 text-slate-600">Sign in to continue with your account.</p>
                        </div>

                        {error && (
                            <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="username" className="mb-1 block text-sm font-medium text-slate-700">
                                    Username
                                </label>
                                <input
                                    id="username"
                                    type="text"
                                    placeholder="john_doe"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className="mb-1 block text-sm font-medium text-slate-700">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full rounded-lg bg-blue-600 px-4 py-2.5 font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {loading ? "Đang đăng nhập..." : "Login"}
                            </button>
                        </form>
                    </section>
                </div>
            </div>
        </main>
    );
}
