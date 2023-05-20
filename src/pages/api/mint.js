export default async function handler(req, res) {
  //sendrequest in hooks = tell detail, in api = real call BN
  try {
    if (req.method === "POST") {
      const body = req.body;
      const response = await fetch("http://localhost:8000/api/mint", {
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
