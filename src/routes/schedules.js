const { Hono } = require("hono");
const { html } = require("hono/html");
const layout = require("../layout");
const ensureAuthenticated = require("../middlewares/ensure-authenticated");

const app = new Hono();

app.use("/new", ensureAuthenticated());
app.get("/new", (c) => {
  return c.html(
    layout(
      "予定の作成",
      html`
        <form method="post" action="/schedules">
          <div>
            <h5>予定名</h5>
            <input type="text" name="scheduleName" />
          </div>
          <div>
            <h5>メモ</h5>
            <textarea name="memo"></textarea>
          </div>
          <div>
            <h5>候補日程 (改行して複数入力してください)</h5>
            <textarea name="candidates"></textarea>
          </div>
          <button type="submit">予定をつくる</button>
        </form>
      `
    ),
  );
});

app.use("/", ensureAuthenticated());
app.post("/", async (c) => {
  console.log(await c.req.parseBody()); // TODO 予定と候補を保存する実装をする
  return c.redirect("/");
});

module.exports = app;
