import React from 'react'
import '../Styles/GithubStats.css';

const GithubStats = () => {
    return (
        <div id='github-stats'>
            <h1 className="heading">Github <span>Stats</span></h1>
            <div className="stats">
                <a href="https://git.io/streak-stats" id="github-streak-stats" ><img src="https://github-readme-streak-stats.herokuapp.com?user=pratham1916&theme=dark&border_radius=10" alt="GitHub Streak" style={{width:"400px"}} /></a>
                <img id="github-stats-card" src="https://github-readme-stats.vercel.app/api?username=pratham1916&theme=vision-friendly-dark&show_icons=true)](https://github.com/pratham1916" alt="Pratham"  style={{width:"350px"}} />
                <img id="github-top-langs" src="https://github-readme-stats.vercel.app/api/top-langs/?username=pratham1916&layout=compact&theme=vision-friendly-dark" alt="top-languages" style={{width:"280px"}} />
            </div>
        </div>
    )
}

export default GithubStats
