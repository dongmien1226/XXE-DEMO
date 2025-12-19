import React, { useState } from 'react';
import { Scan, Search, Loader2 } from 'lucide-react';
import api from '../api';

const TikaScanner = () => {
    const [result, setResult] = useState('');
    const [loading, setLoading] = useState(false);

    const handleScan = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setLoading(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await api.post('/docs/tika-scan', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setResult(response.data);
        } catch (error) {
            setResult("Error scanning file.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-purple-100 rounded-lg">
                    <Scan className="w-6 h-6 text-purple-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">Universal Tika Scanner</h2>
            </div>

            <div className="flex items-center gap-4 mb-4">
                <label className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg cursor-pointer transition-colors text-gray-700 font-medium text-sm">
                    <Search className="w-4 h-4" />
                    Select File to Scan
                    <input type="file" onChange={handleScan} className="hidden" />
                </label>
                {loading && <span className="text-sm text-purple-600 flex items-center gap-1"><Loader2 className="animate-spin w-4 h-4" /> Processing...</span>}
            </div>

            <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-xs h-40 overflow-y-auto shadow-inner">
                {result || "// Tika extraction output will appear here..."}
            </div>
        </div>
    );
};

export default TikaScanner;