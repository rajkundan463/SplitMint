import { useState } from "react";
import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "./authApi";
import { useNavigate, Link } from "react-router-dom";
import AuthLayout from "./AuthLayout";

export default function Register() {

    const navigate = useNavigate();

    useEffect(() => {

        const token = localStorage.getItem("token");

        if (token) {
            navigate("/");
        }

    }, [navigate]);

    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const mutation = useMutation({
        mutationFn: registerUser,
        onSuccess: () => {
            navigate("/login");
        }
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        mutation.mutate(form);
    };

    return (

        <AuthLayout>

            <form
                onSubmit={handleSubmit}
                className="bg-white p-10 rounded-2xl shadow-lg w-[380px]"
            >

                <h2 className="text-3xl font-bold mb-2">
                    Create Account 🚀
                </h2>

                <p className="text-gray-500 mb-6">
                    Start managing shared expenses effortlessly.
                </p>

                <input
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    className="w-full border border-gray-200 focus:border-black outline-none p-3 rounded-lg mb-4"
                />

                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    onChange={handleChange}
                    className="w-full border border-gray-200 focus:border-black outline-none p-3 rounded-lg mb-6"
                />

                <button
                    className="w-full bg-black text-white py-3 rounded-lg hover:opacity-90 transition"
                >
                    {mutation.isPending ? "Creating..." : "Register"}
                </button>

                <p className="text-sm text-gray-500 mt-6 text-center">
                    Already have an account?{" "}
                    <Link to="/login" className="text-black font-semibold">
                        Login
                    </Link>
                </p>

            </form>

        </AuthLayout>
    );
}
