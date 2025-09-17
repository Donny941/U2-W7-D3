// https://striveschool-api.herokuapp.com/books fetch

const bookList = () => {
  const cartUl = document.querySelector(".dropdown-menu");

  let inCart = JSON.parse(localStorage.getItem("books")) || [];

  const createCartItem = (book) => {
    if (inCart.findIndex((item) => item.title === book.title) !== -1) {
      alert("This book is already in the Cart!");
      return;
    }

    const liDiv = document.createElement("div");
    liDiv.classList.add("listed", "d-flex", "justify-content-between");
    const cartLi = document.createElement("li");
    const deleteItem = document.createElement("button");
    deleteItem.classList.add("btn", "btn-danger");
    deleteItem.innerHTML = `  <i class="bi bi-trash"></i>`;
    cartLi.innerText = book.title;
    liDiv.append(cartLi, deleteItem);
    inCart.push(book);
    cartUl.appendChild(liDiv);
    console.log(inCart);
    localStorage.setItem("books", JSON.stringify(inCart));

    deleteItem.addEventListener("click", (event) => {
      event.target.closest(".listed").remove();
      const bookIndex = inCart.findIndex(
        (book) => book.title === cartLi.innerText
      );
      console.log(inCart);

      if (bookIndex !== -1) {
        inCart.splice(bookIndex, 1);
        if (inCart.length === 0) {
          localStorage.removeItem("books");
        } else {
          localStorage.setItem("books", JSON.stringify(inCart));
        }
      }
    });
  };
  fetch("https://striveschool-api.herokuapp.com/books")
    .then((response) => {
      // console.log(response);
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("nessun libro trovato");
      }
    })
    .then((booksObj) => {
      // console.log(booksObj);

      const row = document.querySelector(".row");
      // console.log(row);

      booksObj.forEach((book) => {
        // console.log(book);
        const col = document.createElement("div");
        col.className = "col";
        const card = document.createElement("div");
        card.classList.add("card", "mb-3");
        const rowIn = document.createElement("div");
        rowIn.classList.add("row", "g-0");

        const colIn = document.createElement("div");
        colIn.className = "col-md-4";
        const img = document.createElement("img");
        img.classList.add("img-fluid", "rounded-start");
        img.src = book.img;

        colIn.appendChild(img);

        const colInRight = document.createElement("div");
        colInRight.classList.add(
          "col-md-8",
          "d-flex",
          "flex-column",
          "justify-content-between",
          "p-2"
        );
        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");
        const cardTitle = document.createElement("h5");
        cardTitle.className = "card-title";
        cardTitle.innerText = book.title;
        const cardCategory = document.createElement("p");
        cardCategory.className = "card-text";
        cardCategory.innerText = book.category;

        const divButton = document.createElement("div");
        divButton.classList.add("d-flex", "gap-2", "justify-content-between");
        const cardButtonCart = document.createElement("button");
        cardButtonCart.classList.add("btn", "btn-primary");
        cardButtonCart.innerHTML = "Add to Cart";
        const cardButtonDelete = document.createElement("button");
        cardButtonDelete.classList.add("btn", "btn-danger");
        cardButtonDelete.innerHTML = "Delete";
        divButton.append(cardButtonCart, cardButtonDelete);
        cardBody.append(cardTitle, cardCategory);
        colInRight.append(cardBody, divButton);

        rowIn.append(colIn, colInRight);
        card.append(rowIn);
        col.append(card);

        row.append(col);

        // DeleteCard
        cardButtonDelete.addEventListener("click", () => {
          col.remove();
        });

        cardButtonCart.addEventListener("click", () => {
          createCartItem(book);
        });
      });
    })

    .catch((error) => {
      console.log(error);
    });
};

bookList();
