import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaGripLines } from "react-icons/fa";
import { BsCart3 } from "react-icons/bs";
import { useSelector } from "react-redux";

const Navbar = () => {
    const links = [
        { title: "Home", link: "/" },
        { title: "All Books", link: "/all-books" },
        { title: "Cart", link: "/cart" },
        { title: "Profile", link: "/profile" },
    ];
    const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn);
    if (isLoggedIn === false){
        links.splice(2, 2);
    }
    const [MobileNav,setMobileNav] = useState("hidden");
    return (
        <>
            <nav className="z-50 relative flex bg-zinc-800 text-white px-8 py-4 items-center justify-between">
            <Link to="/" className="flex items-center">
                <img
                    className="h-20 me-2"
                    src="src/components/Navbar/rb_2149341898.png"
                    alt="logo"
                />
                <h1 className="text-2xl font-semibold ">MyBook Mart </h1>
            </Link>
            <div className="nav-links-pustakstore block md:flex items-center gap-4">
                <div className="hidden md:flex gap-4">
                    {links.map((item, i) => (
                        <div className="flex items-center">
                            {item.title === "Profile" ? <Link
                            key={i}
                            to={item.link}
                            className="px-4 py-1 text-white hover:bg-white hover:text-blue-500 border border-blue-500 rounded transition-all duration-300"
                        >
                            {item.title}
                        </Link> : <Link
                            key={i}
                            to={item.link}
                            className="text-white hover:text-blue-500 transition-all duration-300"
                        >
                            {item.title}{" "}
                        </Link>}
                        </div>
                    ))}
                </div>
                {isLoggedIn === false && (
                    <div className="hidden md:flex gap-4">
                        <Link to="/LogIn" className="px-4 py-1 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition duration-300">LogIn</Link>
                        <Link to="/SignUp" className="px-4 py-1 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition duration-300">SignUp</Link>
                    </div>
                )}
                <button className="block md:hidden text-white text-2xl hover:text-zinc-400" onClick={()=>MobileNav==="hidden" ? setMobileNav("block") : setMobileNav("hidden")}><FaGripLines /></button>
            </div>
            </nav>
            <div className={`${MobileNav} bg-zinc-800 h-screen absolute top-0 left-0 w-full z-40 flex flex-col items-center justify-center`}>
                {links.map((item, i) => (
                            <Link
                                key={i}
                                to={item.link}
                                className={`${MobileNav} text-white text-4xl font-semibold mb-8 hover:text-blue-500 transition-all duration-300`}
                                onClick={()=>MobileNav==="hidden" ? setMobileNav("block") : setMobileNav("hidden")}
                            >
                                {item.title}
                            </Link>
                ))}
                {isLoggedIn === false ? (
                    <>
                        <Link to="/LogIn" className={`${MobileNav} px-8 mb-8 text-3xl font-semibold py-2 border border-blue-500 rounded text-white  hover:bg-white hover:text-zinc-800 transition duration-300`}>LogIn</Link>
                        <Link to="/SignUp" className={`${MobileNav} px-8 mb-8 text-3xl font-semibold py-2 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition duration-300`}>SignUp</Link>
                    </>
                ) : (
                    <></>
                )}
            </div>
        </>
    );
};

export default Navbar;
