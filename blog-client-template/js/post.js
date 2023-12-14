

        //Hämta id:t från URLen
        let urlParams = new URLSearchParams(window.location.search);
        let postId = urlParams.get('id');

        //Funktion för att hämta det specifika blogginlägget
        async function fetchPost() {
            try {
                console.log(postId); 
                let response = await fetch(`https://blog-api-assignment.up.railway.app/posts/${postId}`);
                let post = await response.json();
        
                console.log(post); 
        
                //Html för all text
                let postDate = new Date(post.date);
                let fullPostHTML = `
                    <h1>${post.title}</h1>
                    <p><strong>Av:</strong> ${post.author}</p>
                    <p><strong>Taggar:</strong> ${post.tags}</p>
                    <p>${post.content}</p>
                    <p><strong>Datum:</strong> ${postDate.toLocaleString()}</p>
                `;
        
                
                document.getElementById('blogPost').innerHTML = fullPostHTML;

                //felmeddelande
            } catch (error) {
                console.error(error);
            }
        }
        
        fetchPost();