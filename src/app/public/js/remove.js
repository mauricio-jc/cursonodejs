const table = document.querySelector('#books');
table.addEventListener('click', (event) => {
  const element = event.target;

  if(element.dataset.type == 'remove') {
    const bookId = element.dataset.ref;

    fetch(`http://localhost:3000/books/delete/${bookId}`, { method: 'DELETE' })
    .then(response => {
      const tr = element.closest(`#book_${bookId}`);
      tr.remove();
    })
    .catch(error => {
        console.log(error);
    });
  }
});