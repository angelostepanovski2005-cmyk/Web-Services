const fs = require("fs");

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

const addBook = async (id, title, author) => {
  try {
    const book = {
      id: id,
      title: title,
      author: author,
    };
    let data = await readData("./books");
    data.push(book);
    await writeData(data, "./books");
    console.log("Book added successfully!");
  } catch (err) {
    throw err;
  }
};

const updateBook = async (id, newBookData) => {
  try {
    let data = await readData("./books");
    const book = data.find((b) => b.id === id);
    const newBook = {
      ...book,
      ...newBookData,
    };
    data = data.filter((b) => b.id !== id);
    data.push(newBook);
    await writeData(data, "./books");
    console.log("Book updated successfully!");
  } catch (err) {
    throw err;
  }
};

const removeBook = async (id) => {
  try {
    const data = await readData("./books");
    const out = data.filter((b) => b.id !== id);
    await writeData(out, "./books");
    console.log("Book removed successfully!");
  } catch (err) {
    throw err;
  }
};

const execute = async () => {
  await addBook(2, "Tvrdjava", "Mesa Selimovic");
  await updateBook(2, { title: "Dervis i smrt" });
  await removeBook(1);
};

execute();
