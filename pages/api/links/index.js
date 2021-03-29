import db from '../../../utils/db';

export default async (req, res) => {
  try {
    const { username } = req.body;
    const user = await db.collection('users').doc(username).get();
     

    if (!user.exists) {
      res.status(400).end();
    } else {
      const {title, link} = req.body;
      await db.collection('users').doc(username).collection('links').add({
        title,
        link
      });
      res.status(200).json({ success: true });
    }
  } catch (e) {
    res.status(400).end();
  }
}