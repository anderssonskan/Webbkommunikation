document.addEventListener('DOMContentLoaded', function () {
    const updateSaveBtn = document.getElementById('updateSaveBtn');

    let queryString = location.search;
    let urlParams = new URLSearchParams(queryString);
    const postID = urlParams.get('id')
    fetchPost();

        updateSaveBtn.addEventListener('click', function (e) {
            e.preventDefault();

            const selectedTags = [...document.getElementById('genre').options].filter(o => o.selected).map(o => o.value);

            const title = document.getElementById('updateTitle').value;
            const author = document.getElementById('updateAuthor').value;
            const text = document.getElementById('updateText').value;

            updatePost({ title, author, content: text, tags: selectedTags });

        }); 
        
        function fetchPost() {
            fetch(`https://blog-api-assignment.up.railway.app/posts/${postID}`)
            
            .then(response => response.json())
            .then(data => {
                document.getElementById('updateTitle').value = data.title;
                document.getElementById('updateAuthor').value = data.author;
                document.getElementById('updateText').value = data.content;

                const tags = document.getElementById('genre').options;
                for (i = 0; i < tags.length; i++) {
                    if (data.tags.includes(tags[i].value)) {
                        tags[i].selected = true;
                    }
                }
            })
        }
        
        function updatePost(postData) {

            if (postData.title == "" || postData.author == "" || postData.text == "") {
                alert ("Du får inte lämna några fält tomma!");
                return;
            }

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
                location.replace('index.html');
            })
            .catch(error => {
                console.error('Fel vid uppdatering av inlägg:', error);
            });
    }
});