// Imported helper function
const { findAuthorById } = require("./books");

// Returns account object that has the matching input ID
function findAccountById(accounts, id) {
  return accounts.find(({ id: accountId }) => {
    return accountId === id;
  });
}

// Sorts input array of account objects alphabetically by last name
function sortAccountsByLastName(accounts) {
  return accounts.sort((lastNameA, lastNameB) => {
    return lastNameA.name.last > lastNameB.name.last ? 1 : -1;
  });
}

// Returns total number input account object has borrowed a book
function getTotalNumberOfBorrows({ id: accountId }, books) {
  let count = books.reduce((accumulator, bookObj) => {
    const { borrows } = bookObj;
    for (let borrowsObj of borrows) {
      if (borrowsObj.id === accountId) {
        accumulator++;
      }
    }
    return accumulator;
  }, 0);
  return count;
}

// Return array of book objects, including author's info, that the input account currently has checked out
function getBooksPossessedByAccount(account, books, authors) {
  let result = [];
  const { id: accountId } = account;
  books.forEach((bookObj) => {
    const { borrows } = bookObj;
    if (borrows[0].returned === false && borrows[0].id === accountId) {
      result.push(bookObj);
    }
    //helper function from books.js
    const author = findAuthorById(authors, bookObj.authorId);
    bookObj.author = author;
  });
  return result;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
