fetchAllPosts();

async function fetchAllPosts() {
    try {
        const response = await fetch('https://blog-api-assignment.up.railway.app/posts');
        const posts = await response.json();
        
        let postsListHTML = "";
        for (let post of posts) {
            let postDate = new Date(post.date)
            
            const postContent = (post.content.length > 100)  
                ? post.content.substring(0, 100) + '...' + ` <a href = "js/post.js" data-content = "${post.content}" class = "readMoreLink">Visa mer</a>`
                : post.content; 
            
                
            // ${postDate.getFullYear()}-${postDate.getMonth()+1}-${postDate.getDate()} 
            postsListHTML += `
            <li class="list-group-item">
                <p class="post-content">
                    ${post.title} <br>
                    ${postContent} <br> 
                    Av: ${post.author} 
                    Taggar: ${post.tags} <br> 
                    <span class="date"> 
                        ${postDate.toLocaleDateString()}
                        ${postDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit"})}
                    </span> 
                </p>

                <div>
                    <a href="update-post.html?id=${post._id}">Update</a> 
                    <a href="#" data-id="${post._id}" class="delete-links">Delete</a> 
                </div>
            </li> `;
            
        }
        document.getElementById('postList').innerHTML = postsListHTML;
        }catch(error) {
        console.log(error)
    }
}