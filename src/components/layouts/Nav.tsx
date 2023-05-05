import Link from "next/link";

const Nav = () => {
  return (
    <nav className="w-full fixed h-[60px] border-b border-b-slate-300 bg-slate-50 flex items-center">
      <ul className="flex space-x-3 items-center justify-center mx-auto">
        <li>
          <Link
            className="text-indigo-700 text-sm font-bold hover:underline"
            href="/waitlist/try"
          >
            Try
          </Link>
        </li>
        <li>
          <Link
            className="text-indigo-700 text-sm font-bold hover:underline hover:opacity-80"
            href="/waitlist"
          >
            Join waitlist
          </Link>
        </li>
        <li>
          <Link
            className="text-indigo-700 text-sm font-bold hover:underline hover:opacity-80"
            href="/roadmap"
          >
            Roadmap
          </Link>
        </li>
        <li>
          <Link
            className="text-indigo-700 text-sm font-bold hover:underline hover:opacity-80"
            href="/"
          >
            How it works?
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
