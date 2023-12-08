"use strict";


//Hämtar alla poster 

fetchAllPosts();

async function fetchAllPosts() {
    try {
        let response = await fetch('https://blog-api-assignment.up.railway.app/posts');
        let posts = await response.json();

        let tableContent = document.querySelector('#postsTable tbody');

        // Loopa igenom varje post och lägg till på nya rader i tabellen
        for (let post of posts) {
            let tableRow = document.createElement('tr');

            //En array med tabellens komponenter
            let tableData = [
                post.title,
                post.author,
                post.tags,
                post.date
            ];

            // for of loop för arrayen med tabellens innehåll
            for (let postContent of tableData) {
                let blogPost = document.createElement('td');
                blogPost.textContent = postContent;
                tableRow.appendChild(blogPost);
            }

            //Skapar kolumn för "hantera" och lägger till uppdatera-knapp
            let actionColumn = document.createElement('td');
            let updateButton = document.createElement('button');
            updateButton.textContent = "Uppdatera";
            updateButton.addEventListener('click', () => {

                updatePost(post.id)
            });

            actionColumn.appendChild(updateButton);

         //skapar radera-knapp och lägger till
            let deleteButton = document.createElement('button');
            deleteButton.textContent = "Radera";
            deleteButton.dataset.id = post.id; 

            deleteButton.addEventListener('click', async function(e) {
                e.preventDefault();
                let postId = e.target.dataset.id;

                try {
                    let response = await fetch(`https://blog-api-assignment.up.railway.app/posts/${postId}`, {
                        method: 'DELETE'
                    });

                    if(response.ok) {
                        e.target.parentNode.parentNode.remove();
                        
                    } else {
                        throw new Error('Gick ej att radera inlägg');
                    }
                } catch (error) {
                    console.error('Felmeddelande: ', error);
                }
            });


            actionColumn.appendChild(deleteButton);

            //Lägger hantera-kolumnen
            tableRow.appendChild(actionColumn);

            // lägger till de skapade raderna i tabellern
            tableContent.appendChild(tableRow);
        }

        //Felmeddelande
    } catch (error) {
        console.error('Felmeddelande: ', error);
    }
}



