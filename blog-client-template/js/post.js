let urlParams = new URLSearchParams(location.search);
let postId = urlParams.get('id');

async function fetchPost() {
    try {
        
        if (!postId) {
            throw new Error('Felmeddelande');
        }

        let response = await fetch(`https://blog-api-assignment.up.railway.app/posts/${postId}`);
        
        if (!response.ok) {
            throw new Error('Felmeddelande');
        }

        let post = await response.json();
        console.log(post);
        
        document.getElementById('postTitle').innerHTML = `<h1>${post.title}</h1>`;
        document.getElementById('postAuthor').innerHTML = `<strong>Av:</strong> ${post.author}`;
        document.getElementById('postTags').innerHTML = `<strong>Taggar:</strong> ${post.tags}`;
        document.getElementById('postContent').innerHTML = `<p>${post.content}</p>`;
        document.getElementById('postDate').innerHTML = `<strong>Datum:</strong> ${new Date(post.date).toLocaleString()}`;

    } catch (error) {
        console.error(error);
    }
}

fetchPost();