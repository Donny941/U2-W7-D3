// https://striveschool-api.herokuapp.com/books fetch

const bookList = () => {
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
      console.log(booksObj);

      const row = document.querySelector(".row");
      // console.log(row);

      booksObj.forEach((book) => {
        console.log(book);
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
        divButton.classList.add("d-flex", "gap-2");
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
      });
    })

    .catch((error) => {
      console.log(error);
    });
};

bookList();
