import Logo from "@/assets/Logo";

const Header = () => {
  return (
    <div className="bg-white border-b border-gray-200 justify-between sm:flex sm:py-2 sm:px-8">
      <div className="flex items-center">
        <Logo />
        <div className="ml-2">
          <h1 className="text-slate-500 font-medium">Project Name</h1>
        </div>
      </div>

      <nav></nav>
    </div>
  );
};

export default Header;
