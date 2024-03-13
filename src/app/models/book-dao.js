class BookDao {
  constructor(db) {
    this._db = db;
  }

  all() {
    return new Promise((resolve, reject) => {
      this._db.query("SELECT * FROM books", (error, result, fields) => {
        if(error) {
          return reject('Problemas ao listar os livros');
        }

        return resolve(result);
      });
    });
  }

  find(id) {
    return new Promise((resolve, reject) => {
        this._db.query('SELECT * FROM books WHERE id = ? LIMIT 1', [id], (error, result) => {
            if(error) {
                return reject('Problemas ao buscar o livro');
            }

            return resolve(result[0]);
        });
    });
  }

  create(book) {
    return new Promise((resolve, reject) => {
      const sql = "INSERT INTO books (title, price, description) VALUES ?";
      const values = [
        [book.title, book.price, book.description]
      ];

      this._db.query(sql, [values], (error, result) => {
        if(error) {
          return reject('Problemas ao adicionar livro');
        }

        return resolve(result.affectedRows);
      });
    });
  }

  update(book) {
    return new Promise((resolve, reject) => {
      const sql = "UPDATE books SET title = ?, price = ?, description = ? WHERE id = ?";

      const values = [book.title, book.price, book.description, book.id];

      this._db.query(sql, values, (error, result) => {
        if(error) {
          return reject('Problemas ao editar o livro: ' + error);
        }

        return resolve(result.affectedRows);
      });
    });
  }

  delete(id) {
    return new Promise((resolve, reject) => {
      const sql = 'DELETE FROM books WHERE id = ?';
      this._db.query(sql, [id], (error, result) => {
        if(error) {
          return reject('Problemas ao excluir o livro');
        }

        return resolve();
      });
    });
  }
}

module.exports = BookDao;