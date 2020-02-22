import reddit from './redditapi';


const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');


//form eventListener
searchForm.addEventListener('submit', e =>{
    //get search term
    const searchTerm = searchInput.value;
    //Get sort
    const sortBy = document.querySelector('input[name="sortBy"]:checked').value;
    //get limit
    const searchLimit = document.getElementById('limit').value;

    //check input
    if(searchTerm === '') {
    //show message
    showMessage('Please add a search term', 'alert-danger');

    }

    //clear input
    searchInput.value = '';

    //search Reddit
    reddit.search(searchTerm, searchLimit, sortBy)
    .then(results => {
        console.log(results);
        let output = '<div class="card-columns">';
        results.forEach(post => {
        const image = post.preview ? post.preview.images[0].source.url : 'https://cdn.vox-cdn.com/thumbor/DpYZ-Y1PiPx-wt2pniFv-gJr01s=/0x0:640x427/1200x800/filters:focal(0x0:640x427)/cdn.vox-cdn.com/uploads/chorus_image/image/45613552/reddit_logo_640.0.jpg';


         output += `
         <div class="card">
            <img class="card-img-top" src="${image}" alt="Card image cap">
            <div class="card-body">
                <h5 class="card-title">${post.title}</h5>
                <p class="card-text">${truncateText(post.selftext, 100)}</p>
                <a href="${post.url}" target="_blank" class="btn btn-primary">Read more</a>
                <hr>
                <span class="badge badge-secondary">Subreddit: ${post.subreddit}</span>
                <span class="badge badge-dark">Score: ${post.score}</span> 
 
            </div>
         </div>
         `;
        });

        output+= '</div>';
        document.getElementById('results').innerHTML = output;
    });

    e.preventDefault();
})

//show Message
function showMessage(message, className){
    //create div
    const div = document.createElement('div');
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(message));
    const searchContainer = document.getElementById('search-container');
    const search = document.getElementById('search');
    searchContainer.insertBefore(div, search);
    setTimeout(() => document.querySelector('.alert').remove(), 3000);
}

// Truncate text
function truncateText(text, limit){
 const shortened = text.indexOf(' ', limit);
 if(shortened == -1) return text;
 return text.substring(0, shortened);

}