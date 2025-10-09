const makebook = (title, author) => {
    return { title, author };
}

const book1 = makebook("The Great Gatsby", "F. Scott Fitzgerald");
const book2 = makebook("To Kill a Mockingbird", "Harper Lee");

console.log(book1);
console.log(book2);