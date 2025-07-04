"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import Image from 'next/image'; // Removed Next.js Image
// import Link from 'next/link';   // Removed Next.js Link

interface Event {
    id: string;
    title: string;
    date: string;
    minister: string;
    platform: string;
    time: string;
    imageUrl?: string;
    link?: string;
    isActive: boolean;
}

export default function HomePage() {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch upcoming events from API
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                setLoading(true);
                const response = await axios.get('/api/events?active=true');
                setEvents(response.data);
                setError(null);
            } catch (err) {
                console.error('Error fetching events:', err);
                setError('Failed to load upcoming events');
                setEvents([]);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    // Format date for display
    const formatEventDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    // Placeholder data for quick access sections
    const quickAccessItems = [
        {
            id: 1,
            title: "Watch Live TV",
            description: "Experience anointed ministrations live.",
            imageUrl: "https://placehold.co/400x250/0f172a/f8fafc?text=Live+TV",
            link: "/livetv"
        },
        {
            id: 2,
            title: "Share a Testimony",
            description: "Let your story inspire others and glorify God.",
            imageUrl: "https://placehold.co/400x250/1e293b/f8fafc?text=Testimony",
            link: "https://lwfoundationschool.org/testimonybank/"
        },
        {
            id: 3,
            title: "Visit Our Store",
            description: "Discover resources to aid your spiritual growth.",
            imageUrl: "https://placehold.co/400x250/334155/f8fafc?text=Store",
            link: "/store"
        },
    ];

    return (
        <div className='flex flex-col w-full min-h-screen bg-gray-50 font-sans antialiased text-gray-800'>

           
            {/* Content Sections Wrapper */}
            <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16'>

                {/* Upcoming Events Section */}
                <section className='bg-white p-6 rounded-xl shadow-xl'>
                    <h2 className='text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center'>Upcoming Events</h2>
                    
                    {loading ? (
                        <div className='flex items-center justify-center py-12'>
                            <div className='flex flex-col items-center space-y-4'>
                                <div className='w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin'></div>
                                <p className='text-gray-600'>Loading upcoming events...</p>
                            </div>
                        </div>
                    ) : error ? (
                        <div className='text-center py-12'>
                            <p className='text-red-600 mb-4'>{error}</p>
                            <button 
                                onClick={() => window.location.reload()} 
                                className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors'
                            >
                                Try Again
                            </button>
                        </div>
                    ) : events.length === 0 ? (
                        <div className='text-center py-12'>
                            <p className='text-gray-600 mb-4'>No upcoming events at the moment.</p>
                            <p className='text-sm text-gray-500'>Check back soon for new events!</p>
                        </div>
                    ) : (
                        <div className='relative overflow-x-auto custom-scrollbar pb-4'>
                            <div className='flex space-x-6'>
                                {events.map(event => (
                                    <div key={event.id} className='flex-none w-[280px] sm:w-[320px] md:w-[360px] bg-gray-100 rounded-xl shadow-md overflow-hidden transform hover:scale-[1.02] transition-transform duration-300 group'>
                                        <div className='relative w-full h-40'>
                                            <img
                                                src={event.imageUrl || "https://placehold.co/400x250/374151/d1d5db?text=Event"}
                                                alt={event.title}
                                                className='object-cover w-full h-full group-hover:opacity-90 transition-opacity duration-300'
                                            />
                                            <div className='absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors'></div>
                                        </div>
                                        <div className='p-4'>
                                            <h3 className='text-lg font-semibold text-gray-900 group-hover:text-blue-700 transition-colors mb-2'>
                                                {event.title}
                                            </h3>
                                            <p className='text-sm text-gray-600 mb-1'>
                                                📅 {formatEventDate(event.date)}
                                            </p>
                                            <p className='text-sm text-gray-600 mb-1'>
                                                ⏰ {event.time}
                                            </p>
                                            <p className='text-sm text-gray-700 mb-2'>
                                                👨‍💼 {event.minister}
                                            </p>
                                            <div className='bg-blue-50 rounded-lg p-2'>
                                                <p className='text-xs text-blue-700 text-center'>
                                                    📺 {event.platform}
                                                </p>
                                            </div>
                                            {event.link && (
                                                <a 
                                                    href={event.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className='inline-block mt-3 text-blue-600 hover:text-blue-800 text-sm font-medium'
                                                >
                                                    Learn More →
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </section>

                {/* Quick Access / Featured Sections */}
                <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                    {quickAccessItems.map(item => (
                        <a href={item.link} key={item.id} className='block bg-white rounded-xl shadow-xl overflow-hidden transform hover:scale-[1.03] transition-transform duration-300 group'
                           {...(item.link.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                            <div className='relative w-full h-48'>
                                <img
                                    src={item.imageUrl}
                                    alt={item.title}
                                    className='object-cover w-full h-full group-hover:opacity-90 transition-opacity duration-300'
                                />
                                <div className='absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors flex items-center justify-center'>
                                    <h3 className='text-2xl font-bold text-white text-center drop-shadow-md group-hover:scale-105 transition-transform'>{item.title}</h3>
                                </div>
                            </div>
                            <div className='p-5'>
                                <p className='text-base text-gray-700 leading-relaxed'>{item.description}</p>
                            </div>
                        </a>
                    ))}
                </section>

                {/* About Us / Mission Statement */}
                <section className='bg-blue-700 text-white p-8 rounded-xl shadow-xl text-center'>
                    <h2 className='text-2xl md:text-3xl font-bold mb-4'>Our Vision</h2>
                    <p className='text-lg leading-relaxed max-w-3xl mx-auto'>
                        To raise a generation of leaders filled with the knowledge of God&apos;s Word, equipped to impact their world for Christ, and passionate about spreading the divine life to every nation.
                    </p>
                </section>

                {/* Call to Action - Join Our Community */}
                <section className='flex flex-col items-center justify-center p-8 bg-gray-100 rounded-xl shadow-xl text-center'>
                    <h2 className='text-2xl md:text-3xl font-bold text-gray-900 mb-4'>Join Our Vibrant Community!</h2>
                    <p className='text-lg text-gray-700 mb-6 max-w-2xl'>
                        Connect with like-minded believers, grow in faith, and make a lasting difference in the world.
                    </p>
                    <a href="/signup" className='inline-block bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-10 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2'>
                        Get Started
                    </a>
                </section>

            </div> {/* End of Content Sections Wrapper */}
        </div>
    );
}
