import Link from "next/link";

const Nav = () => {
  return (
    <nav>
      <div className="w-full h-[60px] border-b border-b-slate-300 flex items-center">
        <ul className="flex space-x-3 items-center justify-center mx-auto">
          {/* <li>
              <Link className="text-indigo-700 text-sm font-bold" href="/">
                Back
              </Link>
            </li> */}
          <li>
            <Link className="text-indigo-700 text-sm font-bold" href="/">
              How it works?
            </Link>
          </li>
          <li>
            <Link
              className="text-indigo-700 text-sm font-bold"
              href="/waitlist/try"
            >
              Try
            </Link>
          </li>
          <li>
            <Link
              className="text-indigo-700 text-sm font-bold"
              href="/waitlist"
            >
              Join waitlist
            </Link>
          </li>
          <li>
            <Link className="text-indigo-700 text-sm font-bold" href="/roadmap">
              Roadmap
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
