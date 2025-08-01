const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID ? crypto.randomUUID() : Date.now().toString();
}

function addBook(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    appendBookToTable(newBook);
}

function appendBookToTable(book) {
  const tbody = document.getElementById('book-body');
  const row = tbody.insertRow();
  row.dataset.id = book.id;

  row.insertCell(0).textContent = book.title;
  row.insertCell(1).textContent = book.author;
  row.insertCell(2).textContent = book.pages;

  
  const statusCell = row.insertCell(3);
  statusCell.textContent = book.read === 'read' ? 'Already read' : 'Not read yet';

  
  const actionsCell = row.insertCell(4);
  const deleteCell = row.insertCell(5);

  const toggleBtn = document.createElement('button');
  toggleBtn.textContent = book.read === 'Already read' ? 'Unread' : 'Read';
  toggleBtn.classList.add('status-button');
  toggleBtn.addEventListener('click', () => {
    
    book.read = book.read === 'Already read' ? 'Not read yet' : 'Already read';
    statusCell.textContent = book.read;
    toggleBtn.textContent = book.read === 'Already read' ? 'Unread' : 'Read';
  });
  actionsCell.appendChild(toggleBtn);




  const delBtn = document.createElement('button');
  delBtn.classList.add('delete-button');
  delBtn.textContent = 'Delete';
  delBtn.style.marginLeft = '8px';
  delBtn.addEventListener('click', () => {
    removeBookById(book.id);
  });
  deleteCell.appendChild(delBtn);
}


function removeBookById(id) {
  const index = myLibrary.findIndex(b => b.id === id);
  if (index !== -1) {
    myLibrary.splice(index, 1);
    refreshTable();
  }
}


function refreshTable() {
  const tbody = document.getElementById('book-body');
  tbody.innerHTML = '';
  myLibrary.forEach(book => appendBookToTable(book));
}


document.getElementById('book-form').addEventListener('submit', e => {
  e.preventDefault();
  const t = e.target.title.value;
  const a = e.target.author.value;
  const p = e.target.pages.value;
  const r = e.target.read.value;
  addBook(t, a, p, r);
  e.target.reset();
});
