const STUDENT = [
  {
    id: 1,
    student_id: "645162010001",
    token_id: 1,
    firstname: "Albert",
    lastname: "Lee",
    wallet_account: "0x793303e187ED167745D45894D5AA3A5B6C501041",
    ipfs_url: "",
  },
  {
    id: 2,
    student_id: "645162010002",
    token_id: 2,
    firstname: "Kelvin",
    lastname: "Island",
    wallet_account: "0xf0b60768436Ec05dA6C959F5E5Cf78F1A5169f18",
    ipfs_url: "",
  },
  {
    id: 3,
    student_id: "645162010003",
    token_id: 3,
    firstname: "Michael",
    lastname: "Jackson",
    wallet_account: "0x821C2d64f6c9a9E15Cdd81f3D952884740BC013E",
    ipfs_url: "",
  },
  {
    id: 4,
    student_id: "645162010004",
    token_id: 4,
    firstname: "Jack",
    lastname: "Sparow",
    wallet_account: "0x0477885Fa34630650a77bd3A2647EAe3e54D782b",
    ipfs_url: "",
  },
];

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      const response = await fetch("http://localhost:8000/api/students");
      const data = await response.json();
      res.status(200).send(data);
    } else if (req.method === "POST") {
      const body = req.body;
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
