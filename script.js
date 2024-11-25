const APIURL = "https://api.github.com/users/";
const main = document.querySelector("#main");
const forms = document.querySelector("#form");
const searchBox = document.getElementById("search");




const getGitData = async (username) => {
    const data = await fetch (APIURL + username);
    const result = await data.json();
    // console.log(data);
    // console.log(result);

    const card = `
     <div class="card">
            <div>
                <img class="avatar" src="${result.avatar_url}" alt="Florin Pop">
            </div>
            <div class="user-info">
                <h2>${result.name}</h2>
                <p>${result.bio}</p>

                <ul class="info">
                    <li>${result.followers}<strong>Followers</strong></li>
                    <li>${result.following}<strong>Following</strong></li>
                    <li>${result.public_repos}<strong>Repos</strong></li>
                </ul>

                <div id="repos">

                </div>
            </div>
        </div>`;
        main.innerHTML = card;
        getRepositories(username);

}

getGitData("niraj1147");

const getRepositories = async (username) =>{
    const data = await fetch(APIURL + username + "/repos");
    const result = await data.json();
    const repos = document.querySelector("#repos");

    result.forEach( (item) => {
        const aTag = document.createElement("a");
        aTag.classList.add("repo");
        aTag.target = "_blank";
        aTag.innerText = item.name;
        aTag.href = item.html_url;
        repos.appendChild(aTag);
        
        // console.log(aTag);
        // console.log(item.html_url)
    })
    
    // console.log(result);
    // const result = await
} 
 
const formSubmit = () => {
    if(searchBox.value != ""){
        getGitData(searchBox.value);
        searchBox.value = "";
    }
    return false;
}

forms.addEventListener("submit", (event) => {
    event.preventDefault();
     formSubmit();
 })

searchBox.addEventListener('focusout', () => {
    formSubmit();
})


