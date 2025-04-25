"use client";

export default function DataUploadPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-cyan-900 to-purple-900 p-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100vh-32px)]">
                <div className="flex flex-col justify-center items-center">
                    <h1 className="text-white text-3xl font-bold mb-4">Upload Your Data</h1>
                    <p className="text-white text-lg mb-8">Drag and drop your data file here or click the button below.</p>
                    <button className="bg-white text-black px-4 py-2 rounded-lg shadow-lg hover:bg-gray-200 transition duration-300">
                        Upload File
                    </button>
                </div>
            </div>
        </div>
    )
}