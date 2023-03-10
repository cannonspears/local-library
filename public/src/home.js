// Returns number of total books in input array
function getTotalBooksCount(books) {
  return books.length;
}

// Returns number of total accounts in input array
function getTotalAccountsCount(accounts) {
  return accounts.length;
}

// Returns number of books currently checked out
function getBooksBorrowedCount(books) {
  let result = books.reduce((count, bookObj) => {
    if (bookObj.borrows[0].returned === false) {
      count++;
    }
    return count;
  }, 0);
  return result;
}

// Returns an array of up to 5 genre objects ordered by frequency
function getMostCommonGenres(books) {
  const trackerObj = {};
  books.forEach((bookObj) => {
    trackerObj[bookObj.genre] === undefined
      ? (trackerObj[bookObj.genre] = 1)
      : trackerObj[bookObj.genre]++;
  });
  const result = [];
  for (let genreKey in trackerObj) {
    let info = { name: genreKey, count: trackerObj[genreKey] };
    result.push(info);
  }
  result.sort((elementA, elementB) => {
    return elementB.count - elementA.count;
  });
  return result.slice(0, 5);
}

// Returns an array of up to 5 book objects representing the most popular books based on total borrows
function getMostPopularBooks(books) {
  books = books.sort((bookA, bookB) => {
    return bookB.borrows.length - bookA.borrows.length;
  });
  let sortedBooks = books.slice(0, 5);
  let result = sortedBooks.map((bookObj) => {
    return { name: bookObj.title, count: bookObj.borrows.length };
  });
  return result;
}

// Returns an array of top 5 author objects based on the total borrows of their books
function getMostPopularAuthors(books, authors) {
  let result = authors.map((authorObj) => {
    const name = nameHelper(authorObj);
    let count = 0;
    books.forEach((bookObj) => {
      if (bookObj.authorId === authorObj.id) {
        count += bookObj.borrows.length;
      }
    });
    return { name: name, count: count };
  });
  result.sort((authorA, authorB) => {
    return authorB.count - authorA.count;
  });
  return result.slice(0, 5);
}

// Helper function
function nameHelper(author) {
  return `${author.name.first} ${author.name.last}`;
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
