let searchBar= document.querySelector("#search-bar")
let searchBtn= document.querySelector("#search-btn")

function performSearch() {
    let searchVal = searchBar.value;
    console.log(searchVal);
}

searchBtn.addEventListener("click", performSearch)

searchBar.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        performSearch();
    }
});