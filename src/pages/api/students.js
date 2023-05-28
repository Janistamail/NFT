export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      const response = await fetch("http://localhost:8000/api/students");
      const data = await response.json();
      res.status(200).send(data);
    } else if (req.method === "POST") {
      const body = req.body;
      console.log(body);

      const response = await fetch("http://localhost:8000/api/students", {
        method: "POST",
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
