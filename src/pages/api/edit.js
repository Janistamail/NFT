export default async function handler(req, res) {
  try {
    if (req.method === "PUT") {
      const body = req.body;
      const response = await fetch("http://localhost:8000/api/edit", {
        method: "PUT",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      res.status(200).send(data);
    }
  } catch (e) {
    res.status(400).send(e);
  }
}
