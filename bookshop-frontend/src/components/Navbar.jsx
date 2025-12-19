import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FileText, Sheet, Scan, Code, Home, BookOpen } from 'lucide-react';

const Navbar = () => {
    const location = useLocation();

    // Helper to check active state for styling
    const isActive = (path) => location.pathname === path
        ? "bg-indigo-700 text-white shadow-md"
        : "text-indigo-100 hover:bg-indigo-600 hover:text-white";

    return (
        <nav className="bg-indigo-800 p-4 text-white shadow-lg mb-8">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">

                {/* Logo Area */}
                <Link to="/" className="flex items-center gap-2 font-bold text-xl hover:text-indigo-200 transition-colors">
                    <BookOpen className="w-6 h-6" />
                    <span>Bookshop</span>
                </Link>

                {/* Navigation Links */}
                <div className="flex flex-wrap justify-center gap-2">

                    <Link to="/" className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all text-sm font-medium ${isActive('/')}`}>
                        <Home className="w-4 h-4" /> Dashboard
                    </Link>

                    <Link to="/pdf" className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all text-sm font-medium ${isActive('/pdf')}`}>
                        <FileText className="w-4 h-4" /> PDF Gen
                    </Link>

                    <Link to="/excel" className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all text-sm font-medium ${isActive('/excel')}`}>
                        <Sheet className="w-4 h-4" /> Excel
                    </Link>

                    <Link to="/tika" className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all text-sm font-medium ${isActive('/tika')}`}>
                        <Scan className="w-4 h-4" /> Tika Scan
                    </Link>

                    <Link to="/xml" className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all text-sm font-medium ${isActive('/xml')}`}>
                        <Code className="w-4 h-4" /> XML Order
                    </Link>

                    <Link to="/xml-blind" className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all text-sm font-medium ${isActive('/xml-blind')}`}>
                        <Code className="w-4 h-4" /> XML Order Blind
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;