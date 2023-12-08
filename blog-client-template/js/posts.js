fetchAllPosts();

async function fetchAllPosts() {
    try {
        const response = await fetch('https://blog-api-assignment.up.railway.app/posts');
        const posts = await response.json();
        
        let postsListHTML = "";
        for (let post of posts) {
            let postDate = new Date(post.date)
            
            const postContent = (post.content.length > 100)  
                ? post.content.substring(0, 100) + '...' + ` <a href = "post.html?id=${post._id}" data-content = "${post.content}" class = "readMoreLink">read more</a>`
                : post.content; 
            
                
            postsListHTML += `
            <li class="list-group-item">
                
                <h2>${post.title}</h2>
                <p class="post-content">
                    ${postContent} 
                </p>
                <div class = "info">
                    <strong>Av:</strong> ${post.author} 
                    <strong>Taggar:</strong> ${post.tags} <br> 
                    <span class="date"> 
                        ${postDate.toLocaleDateString()}
                        ${postDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit"})}
                    </span> 
                </div>

                <div class = "linkStyle">
                    <a href="admin/update-post.html?id=${post._id}">Update</a>
                    <a href="#" data-id="${post._id}" class="delete-links">Delete</a> 
                </div>
            </li> `;
            
        }
        document.getElementById('postList').innerHTML = postsListHTML;
        }catch(error) {
        console.log(error)
    }
}