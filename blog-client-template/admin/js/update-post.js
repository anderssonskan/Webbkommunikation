document.addEventListener('DOMContentLoaded', function () {
    const updateSaveBtn = document.getElementById('updateSaveBtn');

    let queryString = location.search;
    let urlParams = new URLSearchParams(queryString);
    const postID = urlParams.get('id')
    fetchPost();

    updateSaveBtn.addEventListener('click', function (e) {
        e.preventDefault();

        const postId = document.getElementById('updatePostId').value;
        const title = document.getElementById('updateTitle').value;
        const author = document.getElementById('updateAuthor').value;
        const text = document.getElementById('updateText').value;
        const tags = document.getElementById('updateTags').value;

        updatePost(postId, { title, author, text, tags });
    });

    function fetchPost() {
        fetch(`https://blog-api-assignment.up.railway.app/posts/${postID}`)

        .then(response => response.json())
        .then(data => {
            document.getElementById('updateTitle').value = data.title;
            document.getElementById('updateAuthor').value = data.author;
            document.getElementById('updateText').value = data.content
            document.getElementById('updateTags').value = data.tags
        })
    }

    function updatePost(postData) {
        fetch(`https://blog-api-assignment.up.railway.app/posts/${postID}`, {
            method: 'PATCH', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Inlägget har uppdaterats:', data);
        })
        .catch(error => {
            console.error('Fel vid uppdatering av inlägg:', error);
        });
    }
});