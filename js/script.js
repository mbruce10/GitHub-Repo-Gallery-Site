// Global Variables

const overviewElement = document.querySelector(".overview");
const username = "mbruce10";
const repoList = document.querySelector(".repo-list");
const repoInfoList = document.querySelector(".repos");
const repoData = document.querySelector(".repo-data");
const backToRepo = document.querySelector(".view-repos");
const filterInput = document.querySelector(".filter-repos");

// Fetch user info from github
const getData = async function () {
  const res = await fetch(`https://api.github.com/users/${username}`);
  const data = await res.json();
  // console.log(data);
  displayUserInfo(data);
};

getData();

// Display the user info on site
const displayUserInfo = function (data) {
  const userInfoDiv = document.createElement("div");
  userInfoDiv.classList.add("user-info");
  userInfoDiv.innerHTML = `<figure>
        <img alt="user avatar" src=${data.avatar_url} />
        </figure>
        <div>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Bio:</strong> ${data.bio}</p>
        <p><strong>Location:</strong> ${data.location}</p>
        <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
        </div> `;
  overviewElement.append(userInfoDiv);
  getRepos(username);
};

// Fetch repo info from github - sort by last updated and show 100 repos
const getRepos = async function (username) {
  const reposRes = await fetch(
    `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`
  );
  const repoData = await reposRes.json();
  // console.log(reposData);
  displayRepoInfo(repoData);
};

// Display all Repos
const displayRepoInfo = function (repos) {
  // Search box
  filterInput.classList.remove("hide");

  for (const repo of repos) {
    const repoItem = document.createElement("li");
    repoItem.classList.add("repo");
    repoItem.innerHTML = `<h3>${repo.name}</h3>`;
    repoList.append(repoItem);
  }
};

// Check if element clicked matches the name of repo
repoList.addEventListener("click", function (e) {
  if (e.target.matches("h3")) {
    const repoName = e.target.innerText;
    getRepoInfo(repoName);
  }
});

// console.log(repoList);

// Fetch repo info
const getRepoInfo = async function (repoName) {
  const repoInfoRes = await fetch(
    `https://api.github.com/repos/${username}/${repoName}`
  );
  const repoInfo = await repoInfoRes.json();
  // console.log(repoInfo);

  // Fetch languages
  const fetchLanguages = await fetch(repoInfo.languages_url);
  const languageData = await fetchLanguages.json();
  // console.log(languageData);

  // Make a list of languages
  const languages = [];
  for (const language in languageData) {
    languages.push(language);
  }
  // console.log(languages);

  showInfo(repoInfo, languages);
};

// Display individual repos
const showInfo = function (repoInfo, languages) {
  backToRepo.classList.remove("hide");
  repoData.innerHTML = "";
  repoData.classList.remove("hide");
  repoInfoList.classList.add("hide");
  const div = document.createElement("div");
  div.innerHTML = `<h3>Name: ${repoInfo.name}</h3>
        <p>Description: ${repoInfo.description}</p>
        <p>Default Branch: ${repoInfo.default_branch}</p>
        <p>Languages: ${languages.join(", ")}</p>
        <a class="visit" href="${
          repoInfo.html_url
        }" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`;
  repoData.append(div);
};

// Back to repo button
backToRepo.addEventListener("click", function () {
  repoInfoList.classList.remove("hide");
  repoData.classList.add("hide");
  backToRepo.classList.add("hide");
});

// Dynamic search
filterInput.addEventListener("input", function (e) {
  const searchText = e.target.value;
  // console.log(searchText);
  const repos = document.querySelectorAll(".repo");
  const searchTextLowerCase = searchText.toLowerCase();

  for (const repo of repos) {
    const repoLowerText = repo.innerText.toLowerCase();
    if (repoLowerText.includes(searchTextLowerCase)) {
      repo.classList.remove("hide");
    } else {
      repo.classList.add("hide");
    }
  }
});
