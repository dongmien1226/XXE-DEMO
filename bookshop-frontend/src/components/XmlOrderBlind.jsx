import React, { useState } from 'react';
import axios from 'axios';

const XmlOrderBlind = () => {
    const [xmlData, setXmlData] = useState('');
    const [status, setStatus] = useState({ type: '', message: '' });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ type: '', message: '' });

        try {
            // Note: Sending as 'application/xml' as required by the @PostMapping
            const response = await axios.post('http://localhost:8080/api/order/process-blind', xmlData, {
                headers: {
                    'Content-Type': 'application/xml'
                }
            });

            setStatus({
                type: 'success',
                message: `Server Response: ${response.data}`
            });
        } catch (err) {
            setStatus({
                type: 'error',
                message: err.response?.data || 'Error connecting to the backend'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Blind XXE Order Processing</h2>
            <p className="text-gray-600 mb-6">
                This tool processes XML orders. Unlike standard processing, this endpoint does not echo back
                extracted data, making it a target for <strong>Blind XXE</strong> testing using OOB (Out-of-Band) techniques.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        XML Payload
                    </label>
                    <textarea
                        className="w-full h-64 p-4 font-mono text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter XML here..."
                        value={xmlData}
                        onChange={(e) => setXmlData(e.target.value)}
                        required
                    />
                </div>

                <div className="flex gap-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className={`px-6 py-2 rounded-md text-white font-medium ${
                            loading ? 'bg-gray-400' : 'bg-orange-400 hover:bg-orange-600'
                        } transition-colors`}
                    >
                        {loading ? 'Processing...' : 'Send Blind Order'}
                    </button>
                </div>
            </form>

            {status.message && (
                <div className={`mt-6 p-4 rounded-md border ${
                    status.type === 'success' ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'
                }`}>
                    <p className="font-semibold">{status.type === 'success' ? 'Success:' : 'Error:'}</p>
                    <p className="font-mono text-sm mt-1">{status.message}</p>
                    {status.type === 'success' && (
                        <p className="text-xs mt-2 italic text-gray-500">
                            * Note: If this was a successful Blind XXE, you would check your external listener (e.g., Burp Collaborator) for incoming data.
                        </p>
                    )}
                </div>
            )}
        </div>
    );
};

export default XmlOrderBlind;