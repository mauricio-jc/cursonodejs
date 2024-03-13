const db = require('../config/database');
const BookDao = require('./models/book-dao');

module.exports = (app) => {
  app.get('/', (request, response) => response.marko(require('./views/home.marko')));
  
  app.get('/books', (request, response) => {
    const bookDao = new BookDao(db);

    bookDao.all().then(result => {
      response.marko(
        require('./views/books/list.marko'), {
          books: result
        }
      );
    })
    .catch(error => console.log(error));
  });

  app.get('/books/create', (request, response) => response.marko(require('./views/books/create.marko')));

  app.post('/books/save', (request, response) => {
    const bookDao = new BookDao(db);
    
    bookDao.create(request.body).then(response.redirect('/books'))
    .catch(error => console.log(error));
  });

  app.get('/books/edit/:id', (request, response) => {
    const id = request.params.id;
    const bookDao = new BookDao(db);

    bookDao.find(id)
    .then(result => {
        response.marko(
            require('./views/books/edit.marko'), {
                book: result
            }
        );
    })
    .catch(error => console.log(error));
  });

  app.put('/books/update', (request, response) => {
    const bookDao = new BookDao(db);
    
    bookDao.update(request.body).then(response.redirect('/books'))
    .catch(error => console.log(error));
  });

  app.delete('/books/delete/:id', (request, response) => {
    const id = request.params.id;

    const bookDao = new BookDao(db);
    bookDao.delete(id)
    .then(() => response.status(200).end())
    .catch(error => console.log(error));
  });
}
