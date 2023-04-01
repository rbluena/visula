import Logo from "@/assets/Logo";

const Header = () => {
  return (
    <div className="bg-white justify-between sm:flex sm:py-2 sm:px-8">
      <Logo />
      <nav></nav>
    </div>
  );
};

export default Header;
