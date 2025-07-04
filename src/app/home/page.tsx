"use client";

import React from 'react';
// import Image from 'next/image'; // Removed Next.js Image
// import Link from 'next/link';   // Removed Next.js Link

export default function HomePage() {
    // Placeholder data for upcoming events
    const upcomingEvents = [
        {
            id: 1,
            title: "Global Prayer & Fasting Week",
            date: "July 1 - July 7, 2025",
            description: "Join us for a powerful week of prayer and fasting for global impact.",
            imageUrl: "https://placehold.co/800x450/374151/d1d5db?text=Prayer+Week",
            link: "#" // Replace with actual event page link
        },
        {
            id: 2,
            title: "Supernatural Leadership Conference",
            date: "August 15 - August 17, 2025",
            description: "Equipping leaders with divine strategies for supernatural results.",
            imageUrl: "https://placehold.co/800x450/4b5563/e5e7eb?text=Leadership+Conf",
            link: "#" // Replace with actual event page link
        },
        {
            id: 3,
            title: "Youth Empowerment Summit",
            date: "September 5, 2025",
            description: "Inspiring the next generation to live purposefully.",
            imageUrl: "https://placehold.co/800x450/6b7280/f3f4f6?text=Youth+Summit",
            link: "#" // Replace with actual event page link
        },
        {
            id: 4,
            title: "Foundations School Graduation",
            date: "October 10, 2025",
            description: "Celebrating our graduating class of equipped ministers.",
            imageUrl: "https://placehold.co/800x450/9ca3af/ffffff?text=Graduation",
            link: "#" // Replace with actual event page link
        },
    ];

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
            link: "https://lwfoundationschool.org/testimonybank/" // External link from previous code
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

            {/* Hero Section */}
            <section className='relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] flex items-center justify-center text-center overflow-hidden shadow-lg'>
                <img
                    src="https://placehold.co/1200x600/1e293b/cbd5e1?text=Preparing+Saints+for+Ministry"
                    alt='Hero Background: Preparing the Saints for Ministry'
                    className='object-cover w-full h-full transform scale-105 transition-transform duration-700 ease-in-out'
                />
                {/* Overlay for text readability */}
                <div className='absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-center justify-center p-4'>
                    <div className='z-10 max-w-2xl mx-auto'>
                        <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4 drop-shadow-md'>
                            Equipping for God&apos;s Global Mandate
                        </h1>
                        <p className='text-base sm:text-lg md:text-xl text-gray-200 mb-6 drop-shadow'>
                            Transforming lives, building faith, and raising leaders for ministry.
                        </p>
                        <a href="/training" className='inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'>
                            Learn More
                        </a>
                    </div>
                </div>
            </section>

            {/* Content Sections Wrapper */}
            <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16'>

                {/* Upcoming Events Carousel */}
                <section className='bg-white p-6 rounded-xl shadow-xl'>
                    <h2 className='text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center'>Upcoming Events</h2>
                    <div className='relative overflow-x-auto custom-scrollbar pb-4'>
                        <div className='flex space-x-6'>
                            {upcomingEvents.map(event => (
                                <a href={event.link} key={event.id} className='flex-none w-[280px] sm:w-[320px] md:w-[360px] bg-gray-100 rounded-xl shadow-md overflow-hidden transform hover:scale-[1.02] transition-transform duration-300 group'
                                   {...(event.link.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                                    <div className='relative w-full h-40'>
                                        <img
                                            src={event.imageUrl}
                                            alt={event.title}
                                            className='object-cover w-full h-full group-hover:opacity-90 transition-opacity duration-300'
                                        />
                                        <div className='absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors'></div>
                                    </div>
                                    <div className='p-4'>
                                        <h3 className='text-lg font-semibold text-gray-900 group-hover:text-blue-700 transition-colors mb-1'>{event.title}</h3>
                                        <p className='text-sm text-gray-600 mb-2'>{event.date}</p>
                                        <p className='text-sm text-gray-700 leading-snug'>{event.description}</p>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
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
