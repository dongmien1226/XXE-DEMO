import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="text-center py-20 animate-fade-in">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Welcome to Bookshop</h1>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8 text-lg">
                Select a tool from the navigation bar above to begin processing documents,
                managing orders, or scanning files.
            </p>

            <div className="flex justify-center gap-4">
                <Link to="/pdf" className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center gap-2 font-semibold shadow-lg hover:shadow-xl transition-all">
                    Get Started <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </div>
    );
};

export default Home;