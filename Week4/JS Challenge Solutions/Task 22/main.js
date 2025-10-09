function callAndDisplay() {
    fetch('https://jsonplaceholder.typicode.com/posts/1')
        .then(response => response.json())
        .then(data => {
            document.getElementById('output').innerHTML = `Title: ${data.title}<br>Body: ${data.body}`;
        })
        .catch(error => console.error('Error fetching data:', error));
}

let btn = document.getElementById("btn");
btn.addEventListener("click", callAndDisplay);