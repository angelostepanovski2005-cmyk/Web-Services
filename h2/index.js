const express = require("express");
const fs = require("fs");

const app = express();
app.use(express.json());

const readData = (source) => {
  return new Promise((success, fail) => {
    fs.readFile(`${source}.json`, "utf-8", (err, data) => {
      if (err) return fail(err);
      const out = JSON.parse(data);
      return success(out);
    });
  });
};

const writeData = (data, destination) => {
  return new Promise((success, fail) => {
    const out = JSON.stringify(data, null, 2);
    fs.writeFile(`${destination}.json`, out, (err) => {
      if (err) return fail(err);
      return success();
    });
  });
};

app.get("/books", async (req, res) => {
  try {
    const books = await readData("./books");
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/books/:id", async (req, res) => {
  try {
    const books = await readData("./books");
    const book = books.find((b) => b.id === Number(req.params.id));
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.status(200).json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/books", async (req, res) => {
  try {
    const books = await readData("./books");
    const newBook = {
      id: Date.now(),
      ...req.body,
    };
    books.push(newBook);
    await writeData(books, "./books");
    res.status(201).json(newBook);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/books/:id", async (req, res) => {
  try {
    let books = await readData("./books");
    const id = Number(req.params.id);
    const index = books.findIndex((b) => b.id === id);

    if (index === -1)
      return res.status(404).json({ message: "Book not found" });

    books[index] = {
      ...books[index],
      ...req.body,
    };

    await writeData(books, "./books");
    res.status(200).json(books[index]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/books/:id", async (req, res) => {
  try {
    const books = await readData("./books");
    const id = Number(req.params.id);
    const filteredBooks = books.filter((b) => b.id !== id);

    if (books.length === filteredBooks.length) {
      return res.status(404).json({ message: "Book not found" });
    }

    await writeData(filteredBooks, "./books");
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
