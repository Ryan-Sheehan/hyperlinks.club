import db from '../../utils/db';

export default async (req, res) => {
  console.log(req)
  try {
    const users = await db.collection('users').orderBy('created').get();

    const usersData = users.docs.map(entry => ({
      id: entry.id,
      ...entry.data()
    }));
    res.status(200).json({ usersData });
  } catch (e) {
    res.status(400).end();
  }
}