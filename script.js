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

// Call the functions to get Profile Data and Repos Data
async function getData(){
    let username= getUsername()
    let profileData= await getProfile(username)
    console.log(profileData) 
    let reposData= await getRepos(username)
    console.log(reposData)
}

