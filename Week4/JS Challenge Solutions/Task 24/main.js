function callAndDisplay() {
    fetch("https://jsonplaceholder.typicode.com/posts")
        .then((response) => response.json())
        .then((data) => {
            let posts = data.slice(0, 5).map(posts => posts);
            output.innerHTML = "<h3>Post Titles:</h3><ul>" + posts.map(post => `<li>${post.title} : ${post.body}</li>`).join('') + "</ul>";
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
            output.innerHTML = "<p>Error fetching data. Please try again later.</p>";
        });

}

let output = document.getElementById("output");
let btn = document.getElementById("btn");
btn.addEventListener("click", callAndDisplay);