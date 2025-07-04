"use client";
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Image from 'next/image';
import VideoPlayer from './VideoPlayer';
import { useSocket } from '@/context/SocketContext';
import { joinProgram, leaveProgram, sendMessage, subscribeToMessages } from '../../../lib/socket';

interface Comment {
    id: string;
    content: string;
    user: { 
        firstName: string; 
        lastName: string; 
    };
    createdAt: string;
}

interface Program {
    id: string;
    title: string;
    description: string;
    videoUrl: string;
    isLive: boolean;
}

interface SocketMessage {
    id: string;
    text: string;
    userId: string;
    programId: string;
    username: string;
    createdAt: Date;
}

const LiveTv: React.FC = () => {
    const [content, setContent] = useState<string>('');
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [groupParticipation, setGroupParticipation] = useState<number | "">("");
    const [successMessage, setSuccessMessage] = useState<string>('');
    const [currentProgram, setCurrentProgram] = useState<Program | null>(null);
    const [user, setUser] = useState<{ firstName: string; lastName: string } | null>(null);
    const scrollRef = useRef<HTMLDivElement | null>(null);
    const { isConnected } = useSocket();

    // Get current user info
    useEffect(() => {
        const getUserInfo = async () => {
            try {
                const response = await axios.get('/api/auth/me', { withCredentials: true });
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user info:', error);
            }
        };
        getUserInfo();
    }, []);

    // Get current live program
    useEffect(() => {
        const getCurrentProgram = async () => {
            try {
                const response = await axios.get('/api/livetv');
                setCurrentProgram(response.data);
            } catch (error) {
                console.error('Error fetching current program:', error);
            }
        };
        getCurrentProgram();
    }, []);

    // Fetch Comments
    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get("/api/livetv/comments", {
                    withCredentials: true,
                });
                setComments(response.data);
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        };

        fetchComments();
    }, []);

    // Socket.IO integration for real-time messaging
    useEffect(() => {
        if (isConnected && currentProgram) {
            // Join the program room
            joinProgram(currentProgram.id);

            // Subscribe to new messages
            const unsubscribe = subscribeToMessages(currentProgram.id, (message: SocketMessage) => {
                setComments(prev => [...prev, {
                    id: message.id,
                    content: message.text,
                    user: { firstName: message.username, lastName: '' },
                    createdAt: message.createdAt.toISOString()
                }]);
            });

            // Cleanup: leave room and unsubscribe
            return () => {
                unsubscribe();
                leaveProgram(currentProgram.id);
            };
        }
    }, [isConnected, currentProgram]);

    // Auto-scroll to latest comment
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [comments]);

    // Post comment
    const postComment = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        if (!content.trim()) {
            alert('Comment cannot be empty');
            setLoading(false);
            return;
        }

        if (!currentProgram) {
            alert('No live program available');
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post("/api/livetv/comments", { content }, {
                withCredentials: true,
            });
            
            // Add the new comment to the list
            setComments(prevComments => [...prevComments, response.data]);
            setContent('');
        } catch (error) {
            console.error('Error posting comment:', error);
            alert('Failed to post comment. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Update group attendance
    const updateAttendance = async (): Promise<void> => {
        if (groupParticipation === "" || groupParticipation < 1) {
            alert("Group participation must be a positive number.");
            return;
        }
        localStorage.setItem("groupParticipation", String(groupParticipation));
        setLoading(true);
        try {
            await axios.post("/api/livetv/participate", { groupParticipation }, { withCredentials: true });
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
        <div className='flex flex-col min-h-screen bg-gradient-to-br from-gray-900 via-zinc-800 to-gray-950 text-white font-sans antialiased p-4 lg:p-6'>

            {/* Page Header */}
            <div className='mb-6'>
                <h1 className='text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-2'>
                    LWFS-TV Live
                </h1>
                <div className='flex flex-wrap gap-4 text-sm'>
                    <a href="https://lwfoundationschool.org/testimonybank/" target='_blank' rel="noopener noreferrer" className='text-gray-300 hover:text-yellow-400 transition-colors duration-200'>
                        Share Testimony
                    </a>
                    <button className='text-gray-300 hover:text-green-400 transition-colors duration-200'>
                        Receive Salvation
                    </button>
                </div>
            </div>

            {/* Main Content Area */}
            <div className='flex flex-col lg:flex-row gap-6 flex-grow'>

                {/* Video Player Section */}
                <section className='flex flex-col w-full lg:w-2/3 bg-gray-800 rounded-lg shadow-xl overflow-hidden'>
                    <div className='w-full h-auto aspect-video'>
                        <VideoPlayer src={currentProgram?.videoUrl || "https://2nbyjxnbl53k-hls-live.5centscdn.com/RTV/59a49be6dc0f146c57cd9ee54da323b1.sdp/chunks.m3u8"} />
                    </div>

                    {/* Program Info */}
                    {currentProgram && (
                        <div className='p-4 bg-gray-800 border-t border-gray-700'>
                            <h2 className='text-lg font-semibold text-white mb-2'>{currentProgram.title}</h2>
                            <p className='text-gray-300 text-sm'>{currentProgram.description}</p>
                        </div>
                    )}

                    {/* Attendance Section */}
                    <div className='flex flex-wrap justify-center items-center gap-4 p-4 md:p-6 bg-gray-800 border-t border-gray-700'>
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

                {/* Live Chat Section */}
                <aside className='flex flex-col w-full lg:w-1/3 bg-gray-800 rounded-lg shadow-xl p-4'>
                    {/* Banner Image */}
                    <div className='w-full mb-4 rounded-md overflow-hidden shadow'>
                        <Image
                            src="/images/year.jpeg"
                            alt="Year of the Redemptive Work"
                            width={800} height={250}
                            className='object-cover w-full h-auto'
                        />
                    </div>

                    {/* Connection Status */}
                    <div className='flex items-center gap-2 mb-4 p-2 bg-gray-700 rounded-md'>
                        <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
                        <span className='text-sm text-gray-300'>
                            {isConnected ? 'Connected' : 'Connecting...'}
                        </span>
                    </div>

                    {/* Comment Display Area */}
                    <div className='flex flex-col flex-grow bg-gray-900 border border-gray-700 rounded-md overflow-hidden p-3 mb-4 shadow-inner'>
                        {loading && comments.length === 0 ? (
                            <div className='flex w-full justify-center items-center h-full text-gray-400'>
                                <p>Loading comments...</p>
                            </div>
                        ) : (
                            <div ref={scrollRef} className='flex flex-col overflow-y-auto custom-scrollbar flex-grow pr-2'>
                                {comments.map((comment) => (
                                    <div key={comment.id} className='flex flex-col px-3 py-2 mb-3 bg-gray-700 rounded-lg shadow-sm border border-gray-600'>
                                        <p className='text-sm text-gray-100 break-words'>{comment.content}</p>
                                        <div className='flex flex-wrap gap-x-4 text-xs text-gray-400 mt-1'>
                                            <p className='font-medium text-blue-300'>
                                                {comment.user.firstName} {comment.user.lastName}
                                            </p>
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
                            disabled={!isConnected}
                        />
                        <button
                            type="submit"
                            className={`flex items-center justify-center w-full py-3 rounded-md text-base font-semibold transition-colors duration-200 shadow-lg ${loading || !isConnected ? "bg-gray-600 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"}`}
                            disabled={loading || !isConnected}
                        >
                            {loading ? "Posting Comment..." : !isConnected ? "Connecting..." : "Post Comment"}
                        </button>
                    </form>
                </aside>
            </div>
        </div>
    );
}

export default LiveTv;