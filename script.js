let searchBar= document.querySelector("#search-bar")
let searchBtn= document.querySelector("#search-btn")

// get username from searchbar
function getUsername() {
    let searchVal = searchBar.value.trim();
    console.log(searchVal);
    return searchVal
}

searchBtn.addEventListener("click", getData)

searchBar.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        getData();
    }
});

//fuction to get profile data using username
async function getProfile(username){
    let rawProfile= await fetch(`https://api.github.com/users/${username}`)
    let profile= await rawProfile.json()
    let profileData= {avatar_url:profile.avatar_url, name:profile.name, username: profile.login, bio:profile.bio, followerCount:profile.followers, followingCount:profile.following, repoCount:profile.public_repos, url:profile.html_url}
    return profileData
}

// function to get top 5 repos using username
async function getRepos(username){
    let rawRepos= await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=5`)
    let repos= await rawRepos.json()
    let reposData= repos.map((repo)=>{
        return {name: repo.name, description: repo.description, language: repo.language, starCount:repo.stargazers_count, forkCount: repo.forks_count, repoLink: repo.html_url}
    })
    return reposData
}

// Call the functions to get Profile Data and Repos Data and call render function
async function getData(){
    let username= getUsername()

    let profileData= await getProfile(username)
    renderProfile(profileData)
    console.log(profileData) 

    let reposData= await getRepos(username)
    renderRepos(reposData)
    console.log(reposData)
}


// render functions

// render function for profile card
let card = document.querySelector(".card")
function renderProfile(profileData){
    if (profileData.bio===null){
        profileData.bio=""
    }
    card.innerHTML= `<div class="card-header"></div>
            
            <div class="card-body">
                <div class="avatar-wrapper">
                    <img src="${profileData.avatar_url}" alt="${profileData.name}" class="avatar">
                </div>

                <h1 class="name">${profileData.name}</h1>
                <p class="handle">@${profileData.username}</p>
                <p class="bio">${profileData.bio}</p>

                <hr class="divider">

                <div class="stats">
                    <div class="stat-item">
                        <i class="fa-solid fa-people-line stat-icon"></i>
                        <span class="stat-value">${profileData.followerCount}</span>
                        <span class="stat-label">Followers</span>
                    </div>
                    <div class="stat-item">
                        <i class="fa-solid fa-user stat-icon"></i>
                        <span class="stat-value">${profileData.followingCount}</span>
                        <span class="stat-label">Following</span>
                    </div>
                    <div class="stat-item">
                        <i class="fa-solid fa-folder-open stat-icon"></i>
                        <span class="stat-value">${profileData.repoCount}</span>
                        <span class="stat-label">Public Repos</span>
                    </div>
                </div>

                <a href="${profileData.url}" target="_blank" class="btn-profile">View on GitHub</a>
            </div>`
}

// a dictionary of colour associated to popular coding languages.
const langColors = {
  "JavaScript": "#f1e05a",
  "HTML": "#e34c26",
  "CSS": "#563d7c",
  "Python": "#3572A5",
  "Java": "#b07219",
  "TypeScript": "#3178c6",
  "C": "#555555",
  "C++": "#f34b7d",
  "C#": "#178600",
  "PHP": "#4F5D95",
  "Ruby": "#701516",
  "Go": "#00ADD8",
  "Rust": "#dea584",
  "Dart": "#00B4AB",
  "Swift": "#F05138",
  "Kotlin": "#A97BFF",
  "Shell": "#89e051",
  "Vue": "#41b883",
  "SCSS": "#c6538c",
  "Objective-C": "#438eff",
  "Scala": "#c22d40",
  "Elixir": "#6e4a7e",
  "Haskell": "#5e5086",
  "Lua": "#000080",
  "Clojure": "#db5855",
  "Perl": "#0298c3",
  "R": "#198CE7",
  "Jupyter Notebook": "#DA5B0B",
  "Assembly": "#6E4C13",
  "Svelte": "#ff3e00",
  "Dockerfile": "#384d54",
  "Fallback": "#cccccc"
};

// render function for repo cards
let repoContainer= document.querySelector(".repo-container")
function renderRepos(reposData){
    let reposHTML= `<h2 class="section-title">Top 5 Recently Updated Repositories</h2>
                    <div class="repo-list">`
    reposData.forEach((elem)=>{
        reposHTML+=`<a href="${elem.repoLink}" target="_blank">
                    <div class="repo-card">
                        <div class="repo-info">
                            <h3 class="repo-name">${elem.name}</h3>
                            <p class="repo-desc" ${elem.description===null?style="color: #8d9094":style=""}>${elem.description===null?"No Description is available for this repo":elem.description}</p>
                            <div class="repo-meta">
                                <span class="lang-dot" style="background-color: ${langColors[elem.language]===undefined?langColors["Fallback"]:langColors[elem.language]};"></span>
                                <span class="lang-name">${elem.language===null?"No Primary Language":elem.language}</span>
                            </div>
                        </div>
                        <div class="repo-stats">
                            <div class="stat-col">
                                <i class="fa-solid fa-star stat-icon"></i>
                                <span class="stat-value">${elem.starCount}</span>
                            </div>
                            <div class="stat-col">
                                <i class="fa-solid fa-code-fork stat-icon"></i>
                                <span class="stat-value">${elem.forkCount}</span>
                            </div>
                        </div>
                    </div>
            </a>`
    })
    renderRepos+="</div>"
    repoContainer.innerHTML=reposHTML
}