fetchAllPosts();

async function fetchAllPosts() {
    try {
        const response = await fetch('https://blog-api-assignment.up.railway.app/posts');
        const posts = await response.json();
        
        let postsListHTML = "";
        for (let post of posts) {
            let postDate = new Date(post.date)
            
            postsListHTML += `
            <li class="list-group-item">
            <p>${post.title} <br>${post.content} <br> Av: ${post.author} Taggar: ${post.tags} <br> <span class="date"> ${postDate.getFullYear()}-${postDate.getMonth()+1}-${postDate.getDate()} ${postDate.toLocaleTimeString()}</span> </p>
            
            <div>
            <a href="update-post.html?id=${post._id}">Update</a> |
            <a href="#" data-id="${post._id}" class="delete-links">Delete</a> 
            </div>
            </li>
            `
        }
        document.getElementById('postList').innerHTML = postsListHTML;
    }catch(error) {
        console.log(error)
    }
}




/* if (post.content.length > 100){
    <a href="js/post.js">read more...</a>
} */