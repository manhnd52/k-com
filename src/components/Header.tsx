import { Link } from "react-router-dom";

export default function Header() {
	return (
		<header className="border-b border-blue-100 bg-white/95 backdrop-blur">
			<div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3">
				<Link to="/" className="text-lg font-semibold text-blue-700">
					K-COM
				</Link>

				<nav className="flex items-center gap-2">
					<Link
						to="/"
						className="rounded-md px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-blue-50 hover:text-blue-700"
					>
						Home
					</Link>
					<Link
						to="/login"
						className="rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-blue-700"
					>
						Login
					</Link>
				</nav>
			</div>
		</header>
	);
}
