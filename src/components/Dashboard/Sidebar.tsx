import { Link } from "react-router-dom";

export default function Sidebar({ children }: { children: any }) {
  return (
    <section className="">
      <div>
        {/* Sidebar header */}
        <div className="p-2">
          <h1>
            <span className="block text-gray-900 font-extrabold text-4xl">
              Credoks
            </span>
            <span className="block text-yellow-500 font-bold text-2xl">
              Digital
            </span>
          </h1>
        </div>
        <div className="border-b border-slate-200"></div>

        {/* Sidebar */}
        <div>
          {/* sidebar section 1 */}
          <div className="py-10">
            <ul>{children}</ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export function SidebarItem({
  icon,
  name,
  url,
}: {
  icon: any;
  name: any;
  url: string;
}) {
  return (
    <li className="flex justify-start gap-4 text-md font-semibold text-gray-600 px-6 py-3 items-center hover:bg-gray-100 hover:transition hover:ease-in-out">
      {icon}
      <Link to={url}>{name}</Link>
    </li>
  );
}
