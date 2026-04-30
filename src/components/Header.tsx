import { Link } from "react-router-dom";

export default function Header() {
	return (
		<header className="border-b border-slate-200 bg-white/95 backdrop-blur">
			<div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
				<Link to="/" className="flex items-center gap-3">
					<span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-blue-50 text-blue-700 ring-1 ring-blue-100 font-semibold">K</span>
					<span className="text-lg font-semibold tracking-tight text-slate-900">K-COM</span>
				</Link>

				<nav className="flex items-center gap-3">
					<Link
						to="/"
						className="rounded-md px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-900"
					>
						Home
					</Link>

					<Link
						to="/login"
						className="rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-100"
					>
						Login
					</Link>
				</nav>
			</div>
		</header>
	);
}
