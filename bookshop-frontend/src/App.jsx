import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import Components
import Navbar from './components/Navbar';
import Home from './components/Home';
import PdfGenerator from './components/PdfGenerator';
import ExcelUploader from './components/ExcelUploader';
import TikaScanner from './components/TikaScanner';
import XmlOrder from './components/XmlOrder';
import XmlOrderBlind from './components/XmlOrderBlind';

function App() {
    return (
        <Router>
            <div className="min-h-screen bg-gray-50 flex flex-col">
                {/* The Navbar stays persistent across all pages */}
                <Navbar />

                <main className="flex-grow max-w-4xl mx-auto w-full px-6 pb-12">
                    {/* The Routes switch the content based on the URL */}
                    <Routes>
                        <Route path="/" element={<Home />} />

                        {/* Individual Tool Routes */}
                        <Route path="/pdf" element={
                            <div className="max-w-2xl mx-auto">
                                <PdfGenerator />
                            </div>
                        } />

                        <Route path="/excel" element={
                            <div className="max-w-2xl mx-auto">
                                <ExcelUploader />
                            </div>
                        } />

                        <Route path="/tika" element={
                            <div className="max-w-3xl mx-auto">
                                <TikaScanner />
                            </div>
                        } />

                        <Route path="/xml" element={
                            <div className="max-w-3xl mx-auto">
                                <XmlOrder />
                            </div>
                        } />

                        <Route path="/xml-blind" element={
                            <div className="max-w-3xl mx-auto">
                                <XmlOrderBlind />
                            </div>
                        } />
                    </Routes>
                </main>

                <footer className="text-center py-6 text-gray-400 text-sm border-t border-gray-200 mt-auto">
                    &copy; 2025 Bookshop Internal Tools
                </footer>
            </div>
        </Router>
    );
}

export default App;