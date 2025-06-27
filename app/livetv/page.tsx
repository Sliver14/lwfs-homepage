"use client";
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Image from 'next/image';
import VideoPlayer from './VideoPlayer'; // Assuming this component is correctly implemented

const LiveTv: React.FC = () => {
    const [content, setContent] = useState<string>('');
    const [comments, setComments] = useState<{
        id: number;
        content: string;
        user?: { firstName: string };
        createdAt: string;
    }[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [groupParticipation, setGroupParticipation] = useState<number | "">("");
    const [successMessage, setSuccessMessage] = useState<string>('');
    const scrollRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const storedValue = localStorage.getItem("groupParticipation");
        if (storedValue) {
            setGroupParticipation(Number(storedValue) || "");
        }
    }, []);

    // Fetch Comment
    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get("/api/livetv/fetchcomment", {
                    withCredentials: true,
                });
                setComments(response.data);
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        };

        fetchComments();
        const intervalId = setInterval(fetchComments, 5000);

        return () => clearInterval(intervalId);
    }, []);

    //Auto-scroll to latest comment
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [comments]);

    //Post comment
    const postComment = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        if (!content.trim()) {
            alert('Comment cannot be empty');
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post("/api/livetv/comment", { content }, {
                withCredentials: true,
            });
            setComments(prevComments => [...prevComments, response.data]);
            setContent('');
        } catch (error) {
            console.error('Error posting comment:', error);
            alert('Failed to post comment. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Live-tv Attendance
    // useEffect(() => {
    //     const recordAttendance = async () => {
    //         try {
    //             await axios.post(
    //                 "/api/livetv/attendance",
    //                 { page: "live_tv" },
    //                 {
    //                     withCredentials: true,
    //                 }
    //             );
    //         } catch (error) {
    //             console.error("Error recording attendance:", error);
    //         }
    //     };
    //     recordAttendance();
    // }, []);

    // update groupAttendance
    const updateAttendance = async (): Promise<void> => {
        if (groupParticipation === "" || groupParticipation < 1) {
            alert("Group participation must be a positive number.");
            return;
        }
        localStorage.setItem("groupParticipation", String(groupParticipation));
        setLoading(true);
        try {
            await axios.post("/api/livetv/update", { groupParticipation }, { withCredentials: true });
            setSuccessMessage("Attendance successfully updated!");

            setTimeout(() => {
                setSuccessMessage("");
            }, 3000);
        } catch (error) {
            console.error("Error updating attendance:", error);
            alert("Failed to update attendance. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='flex flex-col min-h-screen bg-gradient-to-br from-gray-900 via-zinc-800 to-gray-950 text-white font-sans antialiased'>

            {/* Header/Title Section */}
            <header className='flex items-center justify-between p-4 md:px-8 bg-gray-900 border-b border-gray-700 shadow-lg z-10'>
                <h1 className='text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600'>
                    LWFS-TV Live
                </h1>
                <nav className='hidden sm:flex space-x-6'>
                    <a href="https://lwfoundationschool.org/testimonybank/" target='_blank' rel="noopener noreferrer" className='text-sm font-medium text-gray-300 hover:text-yellow-400 transition-colors duration-200'>Share Testimony</a>
                    <button className='text-sm font-medium text-gray-300 hover:text-green-400 transition-colors duration-200'>Receive Salvation</button>
                </nav>
            </header>

            {/* Main Content Area */}
            <main className='flex flex-col flex-grow md:flex-row md:p-6 lg:p-8 gap-6 md:gap-8'>

                {/* Video Player Section */}
                <section className='flex flex-col w-full md:w-3/4 lg:w-2/3 xl:w-3/4 bg-gray-800 rounded-lg shadow-xl overflow-hidden'>
                    <div className='w-full h-auto aspect-video'>
                        <VideoPlayer src="https://2nbyjxnbl53k-hls-live.5centscdn.com/RTV/59a49be6dc0f146c57cd9ee54da323b1.sdp/chunks.m3u8" />
                    </div>

                    {/* Interaction Buttons & Attendance (below video for smaller screens, and flexible for larger) */}
                    <div className='flex flex-wrap justify-center items-center gap-4 p-4 md:p-6 bg-gray-800 border-t border-gray-700'>
                        {/* Only show on mobile/tablet, hidden on desktop if nav is present */}
                        <a href="https://lwfoundationschool.org/testimonybank/" target='_blank' rel="noopener noreferrer" className='sm:hidden'>
                            <button className='px-4 py-2 bg-yellow-500 text-gray-900 rounded-full text-sm font-semibold hover:bg-yellow-600 transition-colors shadow'>
                                Share Testimony
                            </button>
                        </a>
                        <button className='sm:hidden px-4 py-2 bg-green-600 text-white rounded-full text-sm font-semibold hover:bg-green-700 transition-colors shadow'>
                            Receive Salvation
                        </button>

                        {/* Attendance Input */}
                        <div className='flex items-center gap-2 relative bg-gray-700 rounded-full px-3 py-1 shadow-inner'>
                            <label htmlFor="group-participation" className="text-gray-300 text-sm sr-only">Group Participation</label>
                            <input
                                id="group-participation"
                                className='w-16 text-center bg-transparent text-white text-base focus:outline-none focus:ring-0 placeholder:text-gray-400'
                                onChange={(e) => setGroupParticipation(e.target.value ? Number(e.target.value) : "")}
                                type='number'
                                min="1"
                                value={groupParticipation}
                                placeholder='1'
                                aria-label="Group participation count"
                            />
                            <button
                                onClick={updateAttendance}
                                className={`px-4 py-1 text-white rounded-full text-sm font-semibold transition-colors ${loading ? "bg-red-700 cursor-not-allowed" : "bg-red-600 hover:bg-red-700 shadow"}`}
                                disabled={loading}
                            >
                                {loading ? "Updating..." : "Update Attendance"}
                            </button>

                            {successMessage && (
                                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1 bg-green-500 text-white text-xs rounded-md shadow-lg z-50 animate-fade-in-out">
                                    {successMessage}
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                {/* Live Chat & Programme Line-Up Section */}
                <aside className='flex flex-col w-full md:w-1/4 lg:w-1/3 xl:w-1/4 bg-gray-800 rounded-lg shadow-xl p-4'>
                    {/* Banner Image */}
                    <div className='w-full mb-4 rounded-md overflow-hidden shadow'>
                        <Image
                            src="/images/year.jpeg"
                            alt="Year of the Redemptive Work"
                            width={800} height={250}
                            className='object-cover w-full h-auto'
                        />
                    </div>

                    {/* Chat/Programme Buttons */}
                    <div className='flex w-full mb-4 text-sm font-medium bg-gray-700 rounded-md overflow-hidden shadow-inner'>
                        <button className='flex-1 py-3 text-white bg-blue-700 hover:bg-blue-800 transition-colors rounded-l-md'>
                            Live Chat
                        </button>
                        <button className='flex-1 py-3 text-gray-200 bg-gray-600 hover:bg-gray-500 transition-colors rounded-r-md'>
                            Programme Line-UP
                        </button>
                    </div>

                    {/* Comment Display Area */}
                    <div className='flex flex-col flex-grow bg-gray-900 border border-gray-700 rounded-md overflow-hidden p-3 mb-4 shadow-inner'>
                        {loading && comments.length === 0 ? (
                            <div className='flex w-full justify-center items-center h-full text-gray-400'>
                                <p>Loading comments...</p>
                            </div>
                        ) : (
                            <div ref={scrollRef} className='flex flex-col overflow-y-auto custom-scrollbar flex-grow pr-2'>
                                {comments.slice().reverse().map((comment) => (
                                    <div key={comment.id} className='flex flex-col px-3 py-2 mb-3 bg-gray-700 rounded-lg shadow-sm border border-gray-600'>
                                        <p className='text-sm text-gray-100 break-words'>{comment.content}</p>
                                        <div className='flex flex-wrap gap-x-4 text-xs text-gray-400 mt-1'>
                                            {comment.user?.firstName && (
                                                <p className='font-medium text-blue-300'>{comment.user.firstName}</p>
                                            )}
                                            <p>{new Date(comment.createdAt).toLocaleString()}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Comment Input Form */}
                    <form onSubmit={postComment} className='flex flex-col gap-3'>
                        <textarea
                            value={content}
                            onChange={(event) => setContent(event.target.value)}
                            className='p-3 w-full rounded-md border border-gray-600 bg-gray-700 text-white min-h-24 resize-y focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400'
                            placeholder='Type your comment here...'
                            aria-label="Your comment"
                        />
                        <button
                            type="submit"
                            className={`flex items-center justify-center w-full py-3 rounded-md text-base font-semibold transition-colors duration-200 shadow-lg ${loading ? "bg-gray-600 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"}`}
                            disabled={loading}
                        >
                            {loading ? "Posting Comment..." : "Post Comment"}
                        </button>
                    </form>
                </aside>
            </main>
        </div>
    );
}

export default LiveTv;