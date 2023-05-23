const APIURL = 'https://api.github.com/users/';

const search = document.querySelector('#search');
const form = document.querySelector('form');
const main = document.querySelector('main');
const repos = document.querySelector('repos');

// function to fetch data from the Api
async function getUser(username){
    try {
        //APIURL https://api.github.com/users/username
        const {data} = await axios(APIURL + username)
        console.log(data);
        createUserCard(data)






    }catch(err){
        log(err);
        if(err.response.status === 404){
            log('User not found')
        }
    }
}
getUser("pgworks001")

function createUserCard(user){
    const userId = user.name || user.login
    const userBio = user.Bio ? `<p>${user.Bio}</p>` : ''
    const cardHTML = `
    <div class="card">
    <div>
        <img src="${user.avatar_url}" alt="${user.name}" class="avatar"/>
    </div>
    <div class="user-info">
        <h2>${userId}</h2>
        ${userBio}
        <ul>
            <li>${user.followers} <strong>Followers<strong></li>
            <li>${user.following} <strong>Following<strong></li>
            <li>${user.public_repo} <strong>Repos<strong></li>
        </ul>
        <p><strong>Location:</strong> ${user.location}</p>
        <div id="repos></div>
    </div>
    </div>
    `
    main.innerHTML = cardHTML
}

// Adding event handlers
form.addEventListener('submit', handleSubmit)
function handleSubmit(e) {
    e.preventDefault();
    // console.log(search.value);
    const user = search.value;
    if(user){
        getUser(user)
        search.value = ''
    }
    
}