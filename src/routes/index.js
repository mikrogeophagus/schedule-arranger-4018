const { Hono } = require("hono");
const { html } = require("hono/html");
const layout = require("../layout");

const app = new Hono();

app.get("/", (c) => {
  const { user } = c.get("session");

  return c.html(
    layout(
      "Home",
      html`
        <h1>Hello, Hono!</h1>
        ${user
          ? html`
              <div>
                <a href="/logout">${user.login} をログアウト</a>
              </div>
            `
          : html`
              <div>
                <a href="/login">ログイン</a>
              </div>
            `}
      `,
    ),
  );
});

module.exports = app;
