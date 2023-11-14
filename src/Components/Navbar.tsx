import { HiVideoCamera } from "react-icons/hi2";

function Navbar() {
  return (
    <header className="text-gray-600 body-font bg-teal-900" style={{ position: "sticky", top: "0", zIndex: "100" }}>
      <div className="container mx-auto flex flex-wrap p-3 flex-col md:flex-row items-center">
        <a className="flex title-font font-medium items-center text-gray-900 mb-2 md:mb-0">
          <span className="ml-3 text-xl" style={{ color: "white", marginLeft:"1rem" }}>Entertainment is here for you !!!</span>
        </a>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center"></nav>
      </div>
    </header>
  );
}

export default Navbar;
