import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav
      className="
      sticky
      top-0
      z-50
      px-[5%]
      py-4
      backdrop-blur-md
      bg-[#1E1B1B]/80
      border-b
      border-[#2A2525]
      flex
      items-center
      justify-between"
    >

      {/* Logo */}

      <Link to="/">

        <div className="flex items-center gap-3">

          {/* Replace later with logo image */}

          <h2 className="text-3xl text-[#D98C95]">
            AADSHI
          </h2>

        </div>

      </Link>


      {/* Navigation */}

      <ul className="hidden md:flex gap-10 text-[#F7F3F0]">

        <Link to="/">
          <li className="hover:text-[#D98C95] transition relative group">

            Home

            <span
            className="
            absolute
            left-0
            -bottom-1
            h-[2px]
            w-0
            bg-[#D98C95]
            group-hover:w-full
            transition-all"
            >
            </span>

          </li>
        </Link>


        <Link to="/shop">
          <li className="hover:text-[#D98C95] transition relative group">

            Shop

            <span
            className="
            absolute
            left-0
            -bottom-1
            h-[2px]
            w-0
            bg-[#D98C95]
            group-hover:w-full
            transition-all"
            >
            </span>

          </li>
        </Link>


        <Link to="/customize">
          <li className="hover:text-[#D98C95] transition relative group">

            Customize

            <span
            className="
            absolute
            left-0
            -bottom-1
            h-[2px]
            w-0
            bg-[#D98C95]
            group-hover:w-full
            transition-all"
            >
            </span>

          </li>
        </Link>


      </ul>


      {/* Right side */}

      <div className="flex gap-4 items-center">

        <button
        className="
        bg-[#2A2525]
        p-3
        rounded-full
        text-white
        hover:bg-[#D98C95]
        transition"
        >
          ♡
        </button>

        <Link to="/cart">

        <button
        className="
        bg-[#D98C95]
        px-6
        py-3
        rounded-full
        text-white
        hover:bg-[#c57781]
        transition"
        >

        Cart

        </button>

        </Link>

      </div>

    </nav>
  );
}

export default Navbar;