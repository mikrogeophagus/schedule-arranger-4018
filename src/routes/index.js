const { Hono } = require("hono");
const { html } = require("hono/html");
const layout = require("../layout");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient({ log: ["query"] });

const app = new Hono();

app.get("/", async (c) => {
  const { user } = c.get("session");
  const schedules = user
    ? await prisma.schedule.findMany({
        where: { createdBy: user.id },
        orderBy: { updatedAt: "desc" },
      })
    : [];

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
