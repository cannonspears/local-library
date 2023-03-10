// Returns author object that has the matching input ID
function findAuthorById(authors, id) {
  return authors.find(({ id: authorId }) => {
    return authorId === id;
  });
}

// Returns book object that has the matching input ID
function findBookById(books, id) {
  return books.find(({ id: bookId }) => {
    return bookId === id;
  });
}

// Returns an array with two sub-arrays: checked-out book objects and returned book objects.
function partitionBooksByBorrowedStatus(books) {
  let result = [];
  let checkedOut = books.filter((bookObj) => {
    return bookObj.borrows[0].returned === false;
  });
  let returnedBooks = books.filter((bookObj) => {
    return bookObj.borrows[0].returned === true;
  });
  return (result = [checkedOut, returnedBooks]);
}

// Returns up to 10 account objects of borrowers of the input book with check-out status
function getBorrowersForBook({ borrows }, accounts) {
  const result = [];
  borrows.forEach((borrowObj) => {
    const { id: bookId, returned } = borrowObj;
    accounts.forEach((accountObj) => {
      const { id: accountId } = accountObj;
      if (accountId === bookId) {
        accountObj.returned = returned;
        result.push(accountObj);
      }
    });
  });
  return result.slice(0, 10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
