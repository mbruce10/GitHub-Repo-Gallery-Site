// Global Variables

const overviewElement = document.querySelector(".overview");
const username = "mbruce10";
const reposList = document.querySelector(".repo-list");

const getData = async function () {
    const res = await fetch(`https://api.github.com/users/${username}`);
    const data = await res.json();
    // console.log(data);
    displayUserInfo(data);
};
 
getData();

const displayUserInfo = function (data) {
    const userInfoDiv = document.createElement("div");
    userInfoDiv.classList.add("user-info");
    userInfoDiv.innerHTML =
        `<figure>
        <img alt="user avatar" src=${data.avatar_url} />
        </figure>
        <div>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Bio:</strong> ${data.bio}</p>
        <p><strong>Location:</strong> ${data.location}</p>
        <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
        </div> `;
    overviewElement.append(userInfoDiv);
    getRepos();
};
 
const getRepos = async function () {
    const reposRes = await fetch(`https://api.github.com/users/${username}/repos?/per_page=100&sort=updated`);
    const reposData = await reposRes.json();
    // console.log(reposData);
    displayRepoInfo(reposData);
};

const displayRepoInfo = function (repos) { 
    for (const liRepo of repos) {
        const repoItem = document.createElement("li");
        repoItem.classList.add("repo");
        repoItem.innerHTML = `<h3>${liRepo.name}</h3>`;
        reposList.append(repoItem);
}
};