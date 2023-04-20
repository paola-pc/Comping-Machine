import serverAuth from "../../../libs/serverAuth";

export default async function handleCurrentUser(req, res) {
  if (req.method !== 'GET') {
    return resizeBy.status(405).end();
  }

  try {
    const { currentUser } = await serverAuth(req);
    return res.status(200).json(currentUser)
  } catch (error) {
    console.log(error);
    return resizeBy.status(400).end()
  }
} 

// It checks if theres a user logged in and it returns it!