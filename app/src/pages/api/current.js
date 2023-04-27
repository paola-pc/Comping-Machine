import serverAuth from "../../../libs/serverAuth";


export default async function handleCurrentUser(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  try {
    const { currentUser } = await serverAuth(req, res);
    if (currentUser) return res.send(currentUser)
  } catch (error) {
    console.log(error);
    return res.status(400).end()
  }
} 

// It checks if theres a user logged in and it returns it!
// Not enough time to implement this fully