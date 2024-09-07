import { Hono } from "hono";
import { mangas } from "./utils/mangas";
import { TManga } from "./utils/types";

const app = new Hono();

// GET MANGA BY ID
app.get("/mangas/:id?", async (c) => {
  const mangaId = c.req.param("id");

  if (mangaId) {
    const manga = mangas.find((manga: TManga) => {
      return manga.id === Number(mangaId);
    });

    if (!manga) {
      return c.json({ message: "Mangá não encontrado" });
    }

    return c.json({ manga });
  }

  // RETORNA MANGAS
  return c.json({ data: mangas });
});

// CREATE MANGA
app.post("/mangas", async (c) => {
  const newId = mangas.length + 1;
  const body = await c.req.json();

  if (!body) {
    return c.json({ message: "Dados invalidos" });
  }

  mangas.push({ ...body, id: newId });

  return c.json({ mangas });
});

//DELETE MANGA
app.delete("/mangas/:id", async (c) => {
  const mangaId = c.req.param("id");

  const index = mangas.findIndex((item) => {
    return item.id === Number(mangaId);
  });

  if (index !== -1) {
    mangas.splice(index, 1);
  }

  return c.json({ data: mangas });
});

// UPDATE MANGA
app.patch("/mangas/:id", async (c) => {
  const body = await c.req.json();
  const mangaId = c.req.param("id");

  if (!body || !mangaId) {
    return c.json({ message: "Dados invalidos ou ID Inválido" });
  }

  const index = mangas.findIndex((item) => {
    return item.id === Number(mangaId);
  });

  if (index !== -1) {
    mangas[index] = {
      ...mangas[index],
      ...body,
    };
  }

  return c.json({ data: mangas[index] });
});

export default app;
