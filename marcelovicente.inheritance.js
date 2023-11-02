function BookStorage(ownerName) {
    this.ownerName = ownerName;
    this.favoriteBooks = [];
  }

  BookStorage.prototype.addFavoriteBook = function (bookName) {
    if (!bookName.includes("Great")) {
      this.favoriteBooks.push(bookName);
    }
  }

  BookStorage.prototype.printFavoriteBooks = function() {
    console.log(`${String(this.ownerName)}'s Favorite Books: ${String(this.favoriteBooks.length)}`);
    for (let bookName of this.favoriteBooks) {
      console.log(bookName);
    }
  }

  BookStorage.prototype.sortFavoriteBooksByAlphabeticDescendingOrder = function() {
    this.favoriteBooks.sort().reverse();
  }

  function Bookshelf(ownerName) {
    BookStorage.call(this, ownerName);
  }

  Bookshelf.prototype = Object.create(BookStorage.prototype);
  Bookshelf.prototype.constructor = Bookshelf;

  function CardBox(ownerName) {
    BookStorage.call(this, ownerName);
  }
  
  CardBox.prototype = Object.create(BookStorage.prototype);
  CardBox.prototype.constructor = CardBox;  

function loadBooks(bookshelf) {
  fakeAjax(BOOK_API, function onBooks(bookNames) {
    for (let bookName of bookNames) {
      bookshelf.addFavoriteBook(bookName);
    }
    bookshelf.sortFavoriteBooksByAlphabeticDescendingOrder();
    bookshelf.printFavoriteBooks();
  });
}

var BOOK_API = "https://some.url/api";
var myBooks = new BookStorage("Jack");
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
