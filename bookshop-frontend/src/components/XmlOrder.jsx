import React, { useState } from 'react';
import { Code, Send } from 'lucide-react';
import api from '../api';

const XmlOrder = () => {
    const [xml, setXml] = useState(
        `<order>\n  <bookTitle>The Great Gatsby</bookTitle>\n  <quantity>1</quantity>\n  <customerName>John Doe</customerName>\n</order>`
    );
    const [response, setResponse] = useState('');

    const handleSubmit = async () => {
        try {
            // Sending raw string body as the controller expects @RequestBody String
            const res = await api.post('/order/process', xml, {
                headers: { 'Content-Type': 'application/xml' },
            });
            setResponse(res.data);
        } catch (error) {
            setResponse('Error processing XML order');
        }
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                    <Code className="w-6 h-6 text-blue-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">XML Order Processor</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">XML Payload</label>
                    <textarea
                        className="w-full h-32 p-3 border rounded-lg font-mono text-sm bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none"
                        value={xml}
                        onChange={(e) => setXml(e.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Server Response</label>
                    <div className="w-full h-32 p-3 border rounded-lg bg-gray-100 text-gray-700 font-mono text-sm flex items-center justify-center text-center">
                        {response || "Waiting for submission..."}
                    </div>
                </div>
            </div>

            <button
                onClick={handleSubmit}
                className="mt-4 w-full md:w-auto px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center gap-2 transition-all ml-auto"
            >
                <Send className="w-4 h-4" />
                Process Order
            </button>
        </div>
    );
};

export default XmlOrder;