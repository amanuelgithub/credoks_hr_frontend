import { MdLogout } from "react-icons/md";

function Header() {
  return (
    <div className="h-14 bg-white fixed w-screen z-10 border-b border-gray-200">
      <div className="flex justify-between items-center pr-72 pt-3">
        {/* header left section */}
        <div></div>
        {/* header right section */}
        <div>
          <div className="flex justify-end items-center gap-4">
            <p>Amanuel</p>
            <button>
              <MdLogout />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
