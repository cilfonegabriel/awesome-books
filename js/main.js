var books = [];

function showBook(book) {
  let element;
  const div = document.createElement('div');
  div.setAttribute('id', 'book' + book.id);
  element = document.createElement('p');
  element.appendChild(document.createTextNode(book.title));
  div.appendChild(element);
  element = document.createElement('p');
  element.appendChild(document.createTextNode(book.author));
  div.appendChild(element);
  element = document.createElement('button');
  element.setAttribute('type', 'button');
  element.appendChild(document.createTextNode('Remove'));
  element.addEventListener('click', () => {
    // remove the book from the screen
    div.remove(book.id);
    // remove the book from the local storage
    const newArray = books.filter(function (book2, index, arr) {
      return book2.id != book.id;
    });

    localStorage.setItem('books', JSON.stringify(newArray));

  })
  div.appendChild(element);
  element = document.createElement('hr');
  div.appendChild(element);
  document.getElementById('book-cont').appendChild(div);
}

window.addEventListener('load', () => {
  books = JSON.parse(localStorage.getItem('books'));
  if (books === null) {
    books = [];
  }

  books.forEach(element => {
    showBook(element);
  });
})

document.getElementById('form').addEventListener('submit', (e) => {
  e.preventDefault();
  let random_id = Math.floor(Math.random() * 100);
  books.push(
    {
      id: random_id,
      title: document.getElementById('title').value,
      author: document.getElementById('author').value,
    },
  );

  localStorage.setItem('books', JSON.stringify(books));

  document.getElementById('title').value = '';
  document.getElementById('author').value = ''

  books.forEach(element => {
    showBook(element);
  });
})