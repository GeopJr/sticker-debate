const express = require("express"),
  app = express(),
  jsoning = require("jsoning"),
  stickers = new jsoning("db_stickers.json"),
  users = new jsoning("db_users.json");

app.use(express.json());

app.get("/clear", async function(request, response) {
  // Purge both dbses
  await users.clear();
  await stickers.clear();
  response.json("cleaned");
});

app.get("/users", async function(request, response) {
  const userAccounts = await users.all();
  response.json(userAccounts);
});

app.get("/votes", async function(request, response) {
  const votes = await stickers.all();
  response.json(votes);
});

async function addVote(id, type) {
  // If ID is not in db, then add a new entry
  if (!(await stickers.has(`${id}`))) {
    await stickers.set(`${id}`, 0);
  }
  // Only remove if not 0
  const current = await stickers.get(`${id}`);
  if (type !== "subtract" || current !== 0)
    await stickers.set(`${id}`, type === "add" ? current + 1 : current - 1);
}

app.post("/update", async function(request, response) {
  // Handle post request & return all votes
  if (await users.has(`${request.body.id}`)) {
    const arr = (await users.get(`${request.body.id}`)) || [];
    if (arr.includes(request.body.vote)) {
      const index = arr.indexOf(request.body.vote);
      arr.splice(index, 1);
      await users.set(`${request.body.id}`, arr);
      await addVote(`${request.body.vote}`, "subtract");
    } else {
      arr.push(request.body.vote);
      await users.set(`${request.body.id}`, arr);
      await addVote(`${request.body.vote}`, "add");
    }
  } else {
    await users.set(`${request.body.id}`, [request.body.vote]);
    await addVote(`${request.body.vote}`, "add");
  }
  const votes = await stickers.all();
  response.json(votes);
});

const listener = app.listen(process.env.PORT, function() {
  console.log(listener.address().port);
});
