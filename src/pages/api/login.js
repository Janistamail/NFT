export default async function handler(req, res) {
  try {
    if (req.method === "POST") {
      const body = req.body;
      const response = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      let newData;
      if (data.role === "admin") {
        newData = true;
      } else if (data.role === "student") {
        newData = false;
      }
      res.status(200).send(data.role);
    }
  } catch (e) {
    res.status(400).send(e);
  }
}
