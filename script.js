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
                <p class="handle">${profileData.username}</p>
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

// render function for repo cards
let repoContainer= document.querySelector(".repo-container")
function renderRepos(reposData){
    let reposHTML= `<h2 class="section-title">Top 5 Recently Updated Repositories</h2>`
    reposData.forEach((elem)=>{
        reposHTML+=`<a href="${elem.repoLink}">
                <div class="repo-list">
                    
                    <div class="repo-card">
                        <div class="repo-info">
                            <h3 class="repo-name">${elem.name}</h3>
                            <p class="repo-desc">${elem.description===null?"No Description is available for this repo":elem.description}</p>
                            <div class="repo-meta">
                                <span class="lang-dot" style="background-color: #e34c26;"></span>
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
    repoContainer.innerHTML=reposHTML
}