"use client";

import { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import { Play, Pause, Volume2, VolumeX, Loader2, Maximize, Minimize } from 'lucide-react'; // Using lucide-react for icons

interface VideoPlayerProps {
    src: string;
}

export default function VideoPlayer({ src }: VideoPlayerProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    // Corrected: containerRef is now properly defined here
    const containerRef = useRef<HTMLDivElement>(null); // Ref for the main player container

    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [volume, setVolume] = useState(1);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [showControls, setShowControls] = useState(false);
    const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    async function handleParticipation() {
    try {
        await fetch('/api/livetv/participate', {
        method: 'POST',
        credentials: 'include', // make sure cookies are sent!
        });
    } catch (err) {
        console.error('Participation failed:', err);
    }
    }

    useEffect(() => {
        if (!videoRef.current) return;

        const video = videoRef.current;
        let hls: Hls | null = null;

        const handleCanPlay = () => {
            setIsLoading(false);
            if (video.autoplay) {
                video.play().catch(error => console.log("Autoplay prevented:", error));
            }
        };

        const handlePlay = async () => {
            setIsPlaying(true);
            handleParticipation();
        }
        const handlePause = () => setIsPlaying(false);
        const handleTimeUpdate = () => setCurrentTime(video.currentTime);
        const handleDurationChange = () => setDuration(video.duration);
        const handleVolumeChange = () => {
            setVolume(video.volume);
            setIsMuted(video.muted || video.volume === 0);
        };
        const handleWaiting = () => setIsLoading(true);
        const handlePlaying = () => setIsLoading(false);

        video.addEventListener('canplay', handleCanPlay);
        video.addEventListener('play', handlePlay);
        video.addEventListener('pause', handlePause);
        video.addEventListener('timeupdate', handleTimeUpdate);
        video.addEventListener('durationchange', handleDurationChange);
        video.addEventListener('volumechange', handleVolumeChange);
        video.addEventListener('waiting', handleWaiting);
        video.addEventListener('playing', handlePlaying);

        if (Hls.isSupported()) {
            hls = new Hls();
            hls.loadSource(src);
            hls.attachMedia(video);
            hls.on(Hls.Events.ERROR, (event, data) => {
                if (data.fatal) {
                    switch (data.type) {
                        case Hls.ErrorTypes.NETWORK_ERROR:
                            console.error("Fatal network error encountered, trying to recover...");
                            hls?.recoverMediaError();
                            break;
                        case Hls.ErrorTypes.MEDIA_ERROR:
                            console.error("Fatal media error encountered, trying to recover...");
                            hls?.recoverMediaError();
                            break;
                        default:
                            hls?.destroy();
                            break;
                    }
                }
            });
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            // For Safari (Native HLS Support)
            video.src = src;
        } else {
            console.error("HLS is not supported in this browser.");
            // Fallback for browsers that don't support HLS or native HLS
            // You might want to display a message or alternative content
        }

        return () => {
            video.removeEventListener('canplay', handleCanPlay);
            video.removeEventListener('play', handlePlay);
            video.removeEventListener('pause', handlePause);
            video.removeEventListener('timeupdate', handleTimeUpdate);
            video.removeEventListener('durationchange', handleDurationChange);
            video.removeEventListener('volumechange', handleVolumeChange);
            video.removeEventListener('waiting', handleWaiting);
            video.removeEventListener('playing', handlePlaying);

            if (hls) {
                hls.destroy();
            }
        };
    }, [src]);

    useEffect(() => {
        const handleFullScreenChange = () => {
            setIsFullScreen(!!document.fullscreenElement);
        };

        document.addEventListener('fullscreenchange', handleFullScreenChange);
        return () => document.removeEventListener('fullscreenchange', handleFullScreenChange);
    }, []);

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play().catch(error => console.log("Autoplay prevented:", error));
            }
        }
    };

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !videoRef.current.muted;
            setIsMuted(videoRef.current.muted);
            if (videoRef.current.muted) {
                // Store current volume to restore it later if unmuted manually
                if (videoRef.current.volume > 0) {
                    videoRef.current.dataset.lastVolume = String(videoRef.current.volume);
                }
                videoRef.current.volume = 0;
            } else {
                // Restore last volume or default to 0.5 if not previously set
                videoRef.current.volume = Number(videoRef.current.dataset.lastVolume || 0.5);
            }
        }
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (videoRef.current) {
            const newVolume = parseFloat(e.target.value);
            videoRef.current.volume = newVolume;
            videoRef.current.muted = newVolume === 0;
            setVolume(newVolume);
            if (newVolume > 0) {
                videoRef.current.dataset.lastVolume = String(newVolume);
            }
        }
    };

    const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (videoRef.current) {
            videoRef.current.currentTime = parseFloat(e.target.value);
            setCurrentTime(parseFloat(e.target.value));
        }
    };

    const toggleFullScreen = () => {
        if (containerRef.current) {
            if (!document.fullscreenElement) {
                containerRef.current.requestFullscreen().catch(err => {
                    console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
                });
            } else {
                document.exitFullscreen();
            }
        }
    };

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    const handleMouseMove = () => {
        setShowControls(true);
        if (controlsTimeoutRef.current) {
            clearTimeout(controlsTimeoutRef.current);
        }
        controlsTimeoutRef.current = setTimeout(() => {
            if (isPlaying) { // Only hide if video is playing
                setShowControls(false);
            }
        }, 3000); // Hide controls after 3 seconds of inactivity
    };

    const handleMouseLeave = () => {
        if (controlsTimeoutRef.current) {
            clearTimeout(controlsTimeoutRef.current);
        }
        if (isPlaying) {
            setShowControls(false);
        }
    };

    const handleControlsClick = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent clicks on controls from toggling play/pause
    };

    return (
        <div
            ref={containerRef}
            className={`relative w-full h-full bg-black flex items-center justify-center group focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-900 ${isFullScreen ? 'fixed inset-0 z-50' : 'aspect-video'}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={togglePlay} // Toggle play/pause on video click
        >
            <video
                ref={videoRef}
                className="w-full h-full object-contain cursor-pointer"
                autoPlay // Keep autoplay
                playsInline // Important for mobile devices
            />

            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 z-10">
                    <Loader2 className="animate-spin text-white w-12 h-12" />
                </div>
            )}

            {/* Custom Controls */}
            <div
                className={`absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent transition-opacity duration-300 ${showControls || !isPlaying || isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'} z-20`}
                onClick={handleControlsClick}
            >
                {/* Progress Bar */}
                <input
                    type="range"
                    min="0"
                    max={duration || 0}
                    value={currentTime}
                    onChange={handleProgressChange}
                    className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-blue-500 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:appearance-none [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:bg-blue-500 [&::-moz-range-thumb]:rounded-full"
                />

                <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center space-x-3">
                        {/* Play/Pause Button */}
                        <button
                            onClick={togglePlay}
                            className="text-white hover:text-blue-400 transition-colors"
                            aria-label={isPlaying ? "Pause" : "Play"}
                        >
                            {isPlaying ? <Pause size={28} /> : <Play size={28} />}
                        </button>

                        {/* Volume Control */}
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={toggleMute}
                                className="text-white hover:text-blue-400 transition-colors"
                                aria-label={isMuted ? "Unmute" : "Mute"}
                            >
                                {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
                            </button>
                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.05"
                                value={volume}
                                onChange={handleVolumeChange}
                                className="w-20 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:w-2 [&::-webkit-slider-thumb]:h-2 [&::-webkit-slider-thumb]:bg-blue-500 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:appearance-none [&::-moz-range-thumb]:w-2 [&::-moz-range-thumb]:h-2 [&::-moz-range-thumb]:bg-blue-500 [&::-moz-range-thumb]:rounded-full"
                                aria-label="Volume"
                            />
                        </div>

                        {/* Current Time / Duration */}
                        <span className="text-gray-300 text-sm font-mono">
                            {formatTime(currentTime)} / {formatTime(duration)}
                        </span>
                    </div>

                    {/* Fullscreen Button */}
                    <button
                        onClick={toggleFullScreen}
                        className="text-white hover:text-blue-400 transition-colors"
                        aria-label={isFullScreen ? "Exit fullscreen" : "Enter fullscreen"}
                    >
                        {isFullScreen ? <Minimize size={28} /> : <Maximize size={28} />}
                    </button>
                </div>
            </div>
        </div>
    );
}