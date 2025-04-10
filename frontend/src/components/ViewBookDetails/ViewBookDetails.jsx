import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { GrLanguage } from "react-icons/gr";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { useSelector } from "react-redux";

const ViewBookDetails = () => {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const role = useSelector((state) => state.auth.role);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await axios.get(`http://localhost:1000/api/v1/get-book-by-id/${id}`);
                setData(response.data.data);
            } catch (err) {
                console.error("Error fetching book details:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchBook();
    }, [id]);
    const headers =  {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
        bookid: id , 
    };
    const handleFavourite = async() =>{
        const response = await axios.put("http://localhost:1000/api/v1/add-book-to-favourite",{},{headers});
        alert(response.data.message);
    };
    const handleCart = async()=>{
        const response = await axios.put("http://localhost:1000/api/v1/add-to-cart",{},{ headers });
        alert(response.data.message);
    };
    if (loading) return <Loader />;
    if (error) return <div className="text-red-500 text-center mt-10">Error: {error}</div>;

    return (
        <div className="px-4 md:px-12 py-8 bg-zinc-900 flex flex-col lg:flex-row gap-8">
            {data ? (
                <>
                    <div className="w-full lg:w-1/2 flex flex-col items-center bg-zinc-800 p-6 rounded-lg">
                        <img
                            src={data.url}
                            alt={data.title}
                            className="h-[50vh] md:h-[60vh] lg:h-[70vh] rounded"
                        />
                        {isLoggedIn === true && role === "user" && (
                            <div className="flex flex-row items-center justify-between lg:justify-start mt-8  space-x-2">
                                <button className="bg-white rounded text-red-500 text-xl p-2 flex items-center justify-center" onClick ={handleFavourite}>
                                    <FaHeart />
                                    <span className="ms-2 block lg:hidden text-base">Favourites</span>
                                </button>
                                <button className="bg-blue-500 text-white rounded text-xl p-2 flex items-center justify-center" onClick ={handleCart}>
                                    <FaShoppingCart />
                                    <span className="ms-2 block lg:hidden text-base">Add to cart</span>
                                </button>
                            </div>
                        )}
                        {isLoggedIn=== true && role === "admin" && (
                            <div className="flex flex-row items-center justify-between lg:justify-start mt-8  space-x-2">
                                <button className="bg-white rounded text-xl p-2 flex items-center justify-center">
                                <FaRegEdit />
                                    <span className="ms-2 block lg:hidden text-base">Edit Book</span>
                                </button>
                                <button className="text-red-500 bg-white rounded text-xl p-2 flex items-center justify-center">
                                <MdDeleteOutline />
                                    <span className="ms-2 block lg:hidden text-base">Delete Book</span>
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="w-full lg:w-1/2 text-zinc-100 space-y-4">
                        <h1 className="text-4xl font-bold text-zinc-300">{data.title}</h1>
                        <p className="text-lg text-zinc-400">by {data.author}</p>
                        <p className="text-xl text-zinc-500 mt-2">{data.desc}</p>
                        <p className="flex items-center gap-2 mt-4 text-zinc-400">
                            <GrLanguage className="text-xl" /> {data.language}
                        </p>
                        <p className="text-3xl font-semibold mt-4">
                            Price: ₹ {data.price}
                        </p>
                    </div>
                </>
            ) : (
                <div className="h-screen w-full flex items-center justify-center">
                    <Loader />
                </div>
            )}
        </div>
    );
};

export default ViewBookDetails;
