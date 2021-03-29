import db from '../../../utils/db';

export default async (req, res) => {
  console.log(req.body)
  try {
    const { username } = req.body;
    const users = await db.collection('users').get();
    const usersData = users.docs.map(user => user.data());

    if (usersData.some(user => user.username === username)) {
      res.status(400).end();
    } else {
      
      await db.collection('users').doc(username).set({
        ...req.body,
        created: new Date().toISOString(),
      });
      res.status(200).json({ username });
    }
  } catch (e) {
    res.status(400).end();
  }
}