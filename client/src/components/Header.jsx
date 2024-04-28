import React from "react";
import { Navbar, TextInput, Button } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon } from "react-icons/fa";

export default function Header() {
  const path = useLocation().pathname;
  return (
    <Navbar className="border-b-2 align-middle justify-items-center justify-center">
      <Link
        to="/"
        className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
      >
        <span className="py-1 px-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white ">
          sadar's
        </span>
        blog
      </Link>
      <form>
        <TextInput
          type="text"
          placeholder="search..."
          rightIcon={AiOutlineSearch}
          className="hidden lg:inline"
        />
      </form>

      <Button className="w-12 h-10   lg:hidden  bg-gray-200" color="gray" pill>
        <AiOutlineSearch />
      </Button>
      <div className="flex gap-2 md:order-2">
        <Button className="w-12 h-10 hidden lg:inline" color="gray">
          <FaMoon />
        </Button>
        <Link to="/signin">
          <Button gradientDuoTone="purpleToBlue">Sign In</Button>
        </Link>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link as={'div'} active={path === "/"} >
          <Link to='/'>Home</Link>
        </Navbar.Link>
        <Navbar.Link as={'div'} active={path === "/about"}>
          <Link to='/about'>About</Link>
        </Navbar.Link> 
        <Navbar.Link as={'div'} active={path === "/projects"}>
          <Link to='/projects'>Projucts</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
