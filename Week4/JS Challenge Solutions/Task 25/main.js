const btn = document.getElementById("btn");

btn.addEventListener("click", () => {
    const input = document.getElementById("input").value;
    const output = document.getElementById("output");

    console.log(input);
    fetch(`https://jsonplaceholder.typicode.com/posts/${input}`)
        .then((response) => response.json())
        .then((data) =>{
            output.innerHTML = `<h3>Post Title:</h3><br>${data.title} : ${data.body}`;
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
            output.innerHTML = "<p>Error fetching data. Please try again later.</p>";
        });
});