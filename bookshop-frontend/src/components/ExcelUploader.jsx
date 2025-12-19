import React, { useState } from 'react';
import { Sheet, Upload, CheckCircle, AlertCircle } from 'lucide-react';
import api from '../api';

const ExcelUploader = () => {
    const [status, setStatus] = useState(null);

    const handleUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await api.post('/docs/upload-excel', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setStatus({ type: 'success', msg: response.data });
        } catch (error) {
            setStatus({ type: 'error', msg: 'Upload Failed' });
        }
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
            <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-green-100 rounded-lg">
                    <Sheet className="w-6 h-6 text-green-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">Excel Processor</h2>
            </div>

            <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-6 hover:bg-gray-50 transition-colors text-center cursor-pointer group">
                <input
                    type="file"
                    accept=".xlsx, .xls"
                    onChange={handleUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <Upload className="w-8 h-8 mx-auto text-gray-400 group-hover:text-green-500 mb-2" />
                <p className="text-sm text-gray-500">Click to upload Excel File</p>
            </div>

            {status && (
                <div className={`mt-4 p-3 rounded-lg flex items-center gap-2 text-sm ${status.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                    {status.type === 'success' ? <CheckCircle className="w-4 h-4"/> : <AlertCircle className="w-4 h-4"/>}
                    {status.msg}
                </div>
            )}
        </div>
    );
};

export default ExcelUploader;