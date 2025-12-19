import React, { useState } from 'react';
import { FileText, Download, Loader2 } from 'lucide-react';
import api from '../api';

const PdfGenerator = () => {
    const [htmlContent, setHtmlContent] = useState('<html><body><h1>Hello Bookshop</h1></body></html>');
    const [loading, setLoading] = useState(false);

    const handleGenerate = async () => {
        setLoading(true);
        try {
            // Important: responseType 'blob' is required for binary file downloads
            const response = await api.post('/docs/generate-pdf', htmlContent, {
                headers: { 'Content-Type': 'text/plain' },
                responseType: 'blob',
            });

            // Create a link to download the blob
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'generated_doc.pdf');
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            alert("Failed to generate PDF");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
            <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-red-100 rounded-lg">
                    <FileText className="w-6 h-6 text-red-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">HTML to PDF</h2>
            </div>

            <textarea
                className="w-full h-32 p-3 border rounded-lg font-mono text-sm focus:ring-2 focus:ring-red-500 outline-none resize-none bg-gray-50"
                value={htmlContent}
                onChange={(e) => setHtmlContent(e.target.value)}
                placeholder="Enter HTML here..."
            />

            <button
                onClick={handleGenerate}
                disabled={loading}
                className="mt-4 w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-all"
            >
                {loading ? <Loader2 className="animate-spin w-4 h-4" /> : <Download className="w-4 h-4" />}
                Generate PDF
            </button>
        </div>
    );
};

export default PdfGenerator;