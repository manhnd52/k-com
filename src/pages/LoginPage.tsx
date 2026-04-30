import { useState } from "react";
import { login } from "../services/userService";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        const result = login(username, password);

        if (result.success) {
            setLoading(false);
            navigate("/");
        } else {
            setError(result.message || "Đăng nhập thất bại");
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-100 to-blue-200">
            <div className="px-4 py-10">
                <div className="mx-auto flex min-h-[70vh] w-full max-w-md items-center">
                <section className="w-full rounded-2xl border border-blue-100 bg-white p-6 shadow-xl shadow-blue-200/60 sm:p-8">
                    <div className="mb-6 text-center">
                        <h1 className="text-3xl font-bold text-blue-700">Welcome Back</h1>
                        <p className="mt-2 text-sm text-slate-600">
                            Sign in to continue to your account.
                        </p>
                    </div>

                    {error && (
                        <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600 border border-red-200">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label
                                htmlFor="username"
                                className="mb-1 block text-sm font-medium text-slate-700"
                            >
                                Username
                            </label>
                            <input
                                id="username"
                                type="text"
                                placeholder="john_doe"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full rounded-lg border border-blue-200 px-3 py-2 text-slate-800 outline-none ring-0 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                required
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="password"
                                className="mb-1 block text-sm font-medium text-slate-700"
                            >
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full rounded-lg border border-blue-200 px-3 py-2 text-slate-800 outline-none ring-0 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-lg bg-blue-600 px-4 py-2.5 font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:opacity-50 disabled:cursor-not-allowed"
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
