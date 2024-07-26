import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [longUrl, setLongUrl] = useState('');
    const [shortUrl, setShortUrl] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/shorten/', { original_url: longUrl });
            setShortUrl(response.data.short_url);
            setLongUrl(''); // Clear input after successful submission
        } catch (error) {
            setError('Error shortening URL. Please try again.'); // Handle error
        }
    };
    const backendUrl = "http://localhost:8000/";
    return (
        <>
             <div className='w-full'>
      <nav
        className="fixed top-0 left-0 w-full z-10 block px-4 py-2 text-dark bg-white border rounded-none shadow-md h-max border-white/80 bg-opacity-80 backdrop-blur-2xl backdrop-saturate-200 lg:px-8 lg:py-4"
      >
                    <div className="flex items-center justify-between text-blue-gray-900">
                        <a href="#" className="mr-4 block cursor-pointer py-1.5 font-sans text-base font-medium leading-relaxed text-inherit antialiased">
                            URL Shortener
                        </a>
                        {/* Navigation links */}
                        
                        {/* Login and Sign-in buttons */}
                        
                        {/* Mobile menu button */}
                        
                    </div>
                </nav>

                {/* Main content */}
                <div className="mt-20 h-96 rounded w-full" style={{
                    backgroundImage: 'url(https://images.unsplash.com/photo-1426604966848-d7adac402bff?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}>
                    <div className="pt-20 w-full  flex items-center justify-center">
                        <div className="bg-white shadow-md rounded  px-8 pt-6 pb-8 mb-4 mx-48 w-full">
                            <h1 className="text-center text-2xl font-bold mb-6">URL Shortener</h1>
                            {/* Form */}
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label className="block text-gray-700 font-bold mb-2" htmlFor="url">
                                        Paste your URL
                                    </label>
                                    <input
                                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="url"
                                        type="url"
                                        value={longUrl}
                                        onChange={(e) => setLongUrl(e.target.value)}
                                        placeholder="Enter URL"
                                        required
                                    />
                                </div>
                                {/* Submit button */}
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                                    type="submit"
                                >
                                    Create
                                </button>
                                {/* Display short URL */}
                                {shortUrl && (
                                    <div className="mt-4">
                                        <p className="text-center text-sm">
                                            Short URL:
                                            <a
                                                href={`${backendUrl}/${shortUrl}`}
                                                className="ml-2 text-blue-500 hover:underline"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                {`${backendUrl}${shortUrl}`}
                                            </a>
                                        </p>
                                    </div>
                                )}
                                {/* Error message */}
                                {error && (
                                    <div className="mt-4">
                                        <p className="text-red-500 text-sm">{error}</p>
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;
