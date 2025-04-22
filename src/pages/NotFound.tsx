import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen text-center px-4">
            <h1 className="text-4xl font-bold mb-2">404</h1>
            <p className="text-lg text-gray-600 mb-4">Page not found</p>
            <Link to="/" className="text-blue-500 hover:underline">Go back home</Link>
        </div>
    );
};

export default NotFoundPage;
