import { NavLink } from "react-router-dom";

const navItems = [
  {
    label: "New Feeds",
    to: "/",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    ),
  },
  {
    label: "Create Post",
    to: "/posts/create",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
      </svg>
    ),
  },
];

export default function Sidebar() {
  return (
    <nav className="flex flex-col gap-1 p-3">
      {navItems.map(({ label, to, icon }) => (
        <NavLink
          key={to}
          to={to}
          end={to === "/"}
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150 ${
              isActive
                ? "bg-brand/10 text-brand"
                : "text-[#a1a1aa] hover:bg-[#27272a] hover:text-[#f4f4f5]"
            }`
          }
        >
          <span className="text-current">{icon}</span>
          {label}
        </NavLink>
      ))}
    </nav>
  );
}
