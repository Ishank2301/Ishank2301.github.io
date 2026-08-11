import React from 'react'
import { profile } from '../data/profile'

export default function LiveStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
      <div className="glass-card flex flex-col items-center">
        <h3 className="font-semibold mb-4 w-full text-left">🔥 GitHub Streak</h3>
        <img 
          src={`https://github-readme-streak-stats.herokuapp.com/?user=${profile.githubUsername}&theme=tokyonight&hide_border=true&background=0D111700&ring=10b981&fire=10b981&currStreakNum=ffffff`} 
          alt="GitHub Streak" 
          className="w-full max-w-sm"
        />
      </div>
      <div className="glass-card flex flex-col items-center">
        <h3 className="font-semibold mb-4 w-full text-left">⌨️ WakaTime Coding Activity</h3>
        <img 
          src={`https://github-readme-stats.vercel.app/api/wakatime?username=${profile.githubUsername}&theme=tokyonight&hide_border=true&bg_color=0D111700&title_color=10b981`} 
          alt="WakaTime Stats" 
          className="w-full max-w-sm"
          onError={(e) => { e.target.style.display = 'none'; }}
        />
      </div>
    </div>
  )
}
