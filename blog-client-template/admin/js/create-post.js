"use strict";

//Snappa upp formuläret och lägg till eventlistener till lägg till-knappen
document.getElementById('createPostForm').addEventListener('submit', createPost);

//Funktion för att skapa nytt blogginlägg
async function createPost(e) {
    e.preventDefault();

    let postForm = e.target;

    try {

        //Se till att flera alternativ kan väljas och synas i tabellen
        let selectedOptions = [...document.getElementById('genre').options]
            .filter(option => option.selected)
            .map(option => option.value);
            
        //Objekt för att snappa upp alla värden som användaren skriver in i de olika fälten
        let data = {
            "title": document.getElementById('titleInput').value,
            "author": document.getElementById('authorInput').value,
            "content": document.getElementById('contentTextArea').value,
            "tags": selectedOptions
        };

        //POST-metoden för att skapa nytt samt till JSON
        await fetch('https://blog-api-assignment.up.railway.app/posts', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data) 
        });

        //Skicka användaren till admin/index.html
        location.replace('index.html');

    } catch (error) {
        console.log(error);
    }
}