import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { authActions } from "../store/auth";

const Login = () => {
    const [values, setValues] = useState({
        username: "",
        password: "",
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (values.username.trim() === "" || values.password.trim() === "") {
                alert("All fields are required");
                return;
            }

            const response = await axios.post("http://localhost:1000/api/v1/sign-in", values);
            dispatch(authActions.login());
            dispatch(authActions.changeRole(response.data.role));
            localStorage.setItem("id", response.data.id);
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("role", response.data.role);
            
            navigate("/profile");
        } catch (error) {
            alert(error.response?.data?.message || "Login failed. Please try again.");
        }
    };

    return (
        <div className="h-screen flex items-center justify-center bg-zinc-900 px-12 py-8">
            <div className="bg-zinc-800 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6">
                <p className="text-zinc-200 text-xl">Login</p>
                <form onSubmit={handleSubmit}>
                    <div className="mt-4">
                        <label className="text-zinc-400">Username</label>
                        <input 
                            type="text"
                            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
                            placeholder="Enter your username"
                            name="username"
                            value={values.username}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mt-4">
                        <label className="text-zinc-400">Password</label>
                        <input 
                            type="password"
                            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
                            placeholder="Enter your password"
                            name="password"
                            value={values.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mt-4">
                        <button 
                            type="submit"
                            className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition-all duration-300"
                        >
                            Login
                        </button>
                    </div>
                </form>
                <div className="mt-4 text-center">
                    <p className="text-zinc-400">
                        Don't have an account?{" "}
                        <Link to="/signup" className="text-blue-500 hover:underline">
                            Sign Up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
