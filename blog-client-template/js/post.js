

        let urlParams = new URLSearchParams(window.location.search);
        let postId = urlParams.get('id');
        
        async function fetchPost() {
            try {
                console.log(postId); 
                let response = await fetch(`https://blog-api-assignment.up.railway.app/posts/${postId}`);
                let post = await response.json();
        
                console.log(post); 
        
                let postDate = new Date(post.date);
                let fullPostHTML = `
                    <h1>${post.title}</h1>
                    <p><strong>Av:</strong> ${post.author}</p>
                    <p><strong>Taggar:</strong> ${post.tags}</p>
                    <p>${post.content}</p>
                    <p><strong>Datum:</strong> ${postDate.toLocaleString()}</p>
                `;
        
                console.log(fullPostHTML);
                document.getElementById('blogPost').innerHTML = fullPostHTML;
            } catch (error) {
                console.error(error);
            }
        }
        
        fetchPost();