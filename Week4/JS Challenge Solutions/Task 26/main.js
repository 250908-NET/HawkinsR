async function fetchPostsAsyc(url) {
    try {
        console.log("Fetching data from:", url);
        let response = await fetch(url);
        console.log(response);
        let data = await response.json();
        console.log(data);
        output.innerHTML = `<h3>Post Title:</h3><br>${data.title} : ${data.body}`;
    } catch (error) {
        console.error("Error fetching data:", error);
        output.innerHTML = "<p>Error fetching data. Please try again later.</p>";
    }
}

let bbtn = document.getElementById("bbtn");
let gbtn = document.getElementById("gbtn");
let output = document.getElementById("output");

bbtn.addEventListener("click", () => fetchPostsAsyc(""));
gbtn.addEventListener("click", () => fetchPostsAsyc("https://jsonplaceholder.typicode.com/posts/1"));

