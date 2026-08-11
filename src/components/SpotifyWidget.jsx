import React, { useEffect, useState } from 'react'

export default function SpotifyWidget() {
  const [track, setTrack] = useState({ isPlaying: false, title: 'Not Playing', artist: 'Spotify Offline' });

  // In a real app, you would hit your own serverless endpoint here to hide your refresh token
  // For the UI demo, we show a mock if env vars aren't present
  useEffect(() => {
    // Demo mode: 
    setTrack({ isPlaying: true, title: 'Lo-Fi Coding Beats', artist: 'Chillhop Music' });
  }, []);

  return (
    <div className="glass-card flex items-center gap-4 max-w-sm mt-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-green-500/5 blur-xl"></div>
      <div className="w-12 h-12 bg-slate-800 rounded-md flex-shrink-0 animate-pulse flex items-center justify-center text-xs">
        🎵
      </div>
      <div className="z-10">
        <div className="text-xs text-green-400 font-semibold mb-1">
          {track.isPlaying ? '▶ Now Playing' : 'Paused'}
        </div>
        <div className="font-bold text-sm truncate w-48">{track.title}</div>
        <div className="text-xs text-slate-400 truncate w-48">{track.artist}</div>
      </div>
    </div>
  )
}
