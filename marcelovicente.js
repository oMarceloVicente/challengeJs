function Bookshelf(ownerName) {
    this.ownerName = ownerName;
    this.favoriteBooks = [];
  }

  Bookshelf.prototype.addFavoriteBook = function (bookName) {
    if (!bookName.includes("Great")) {
      this.favoriteBooks.push(bookName);
    }
  }

  Bookshelf.prototype.printFavoriteBooks = function() {
    console.log(`${String(this.ownerName)}'s Favorite Books: ${String(this.favoriteBooks.length)}`);
    for (let bookName of this.favoriteBooks) {
      console.log(bookName);
    }
  }

  Bookshelf.prototype.sortFavoriteBooksByAlphabeticDescendingOrder = function() {
    this.favoriteBooks.sort().reverse();
  }


function loadBooks(bookshelf) {
  fakeAjax(BOOK_API, function onBooks(bookNames) {
    for (let bookName of bookNames) {
      bookshelf.addFavoriteBook(bookName);
    }
    bookshelf.sortFavoriteBooksByAlphabeticDescendingOrder();
    bookshelf.printFavoriteBooks();
  });
}

function CardBox(ownerName) {
  const cardBox = Object.create(Bookshelf.prototype);
  Bookshelf.call(cardBox, ownerName);
  return cardBox;
}

var BOOK_API = "https://some.url/api";
var myBooks = new Bookshelf("Jack");
var myCardBox = new CardBox("Marcelo");
loadBooks(myBooks);
loadBooks(myCardBox);

// ***********************

// NOTE: don't modify this function at all
function fakeAjax(url, cb) {
  setTimeout(function fakeLoadingDelay() {
    cb([
      "A Song of Ice and Fire",
      "The Great Gatsby",
      "Crime & Punishment",
      "Great Expectations",
      "You Don't Know JS",
    ]);
  }, 500);
}
