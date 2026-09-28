import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";

const Register = () => {

    const navigate = useNavigate();

    const { register } = useUserAuth();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        setMessage("");
        setLoading(true);

        const data = await register(name, email, password);

        setLoading(false);

        if (data.success) {
            setMessage("Registration successful. You can now login.");

            setName("");
            setEmail("");
            setPassword("");

            setTimeout(() => {
                navigate("/login");
            }, 1000);

        } else {
            setMessage(data.message);
        }
    };

    return (
        <div className="min-h-[70vh] flex items-center justify-center px-4">

            <div className="w-full max-w-md">

                <h1 className="text-3xl font-semibold text-center mb-2">
                    Create an Account
                </h1>

                <p className="text-gray-500 text-center mb-8">
                    Join QuickBlog and start exploring blogs.
                </p>

                <form
                    onSubmit={handleSubmit}
                    className="bg-white border rounded-xl p-6 shadow-sm"
                >

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">
                            Name
                        </label>

                        <input
                            type="text"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            placeholder="Enter your name"
                            className="w-full border rounded-lg px-4 py-2.5 outline-none"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">
                            Email
                        </label>

                        <input
                            type="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            placeholder="Enter your email"
                            className="w-full border rounded-lg px-4 py-2.5 outline-none"
                            required
                        />
                    </div>

                    <div className="mb-5">
                        <label className="block text-sm font-medium mb-2">
                            Password
                        </label>

                        <input
                            type="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            placeholder="Create a password"
                            className="w-full border rounded-lg px-4 py-2.5 outline-none"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-primary text-white rounded-lg py-2.5 cursor-pointer disabled:opacity-60"
                    >
                        {loading ? "Creating Account..." : "Register"}
                    </button>

                    {message && (
                        <p
                            className={`text-center text-sm mt-4 ${message.includes("successful")
                                    ? "text-green-600"
                                    : "text-red-500"
                                }`}
                        >
                            {message}
                        </p>
                    )}

                    <p className="text-center text-sm text-gray-500 mt-5">
                        Already have an account?{" "}
                        <button
                            type="button"
                            onClick={() => navigate("/login")}
                            className="text-primary cursor-pointer"
                        >
                            Login
                        </button>
                    </p>

                </form>

            </div>

        </div>
    );
};

export default Register; 