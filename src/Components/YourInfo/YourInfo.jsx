import React, { useContext, useEffect, useState } from "react";
import style from "./YourInfo.module.css";
import { Link } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";

export default function YourInfo() {
    const { user } = useContext(UserContext);
    const [localUser, setLocalUser] = useState({ name: "", email: "", role: "" });

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('User'));
        if (userData) {
            setLocalUser(userData);
        }
    }, []);

    return (
        <div className="shadow text-xl w-full p-4 rounded">
            <div className="row pt-3 g-5">
                <div className="flex">
                    <div className="me-1 pb-4">
                        <i className="fa-solid fa-user py-1 px-3 bg-slate-50 rounded-full" />
                    </div>
                    <div>
                        <h4 className="font-bold lg:text-xl text-[20px]">
                            Your Info
                        </h4>
                        <p className="my-2 lg:text-xl text-[15px]">
                            <span className="bg-slate-50 lg:text-xl opacity-75">
                                Name:
                            </span>
                            {user.name || localUser.name}
                        </p>
                        <p className="my-2 lg:text-xl text-[15px]">
                            <span className="bg-slate-50 lg:text-xl opacity-75">
                                Email:
                            </span>
                            {user.email || localUser.email}
                        </p>
                        <p className="my-2 lg:text-xl text-[15px]">
                            <span className="bg-slate-50 lg:text-xl opacity-75">
                                Role:
                            </span>
                            {user.role || localUser.role}
                        </p>
                    </div>
                </div>
            </div>
            <div className="update">
                <div className="p-3 transition-colors duration-300 hover:text-[#3bb77e] rounded my-4 bg-slate-100">
                    <Link to='/ResetPassword' className="lg:text-xl text-[20px]">
                        <i className="fa-solid fa-wrench me-2" />
                        <span>Update Your Password</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
