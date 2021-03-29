import db from '../../../utils/db';

export default async (req, res) => {
  const { id } = req.query;

  try {
    if (req.method === 'PUT') {

      await db.collection('users').doc(id).update({
        ...req.body,
        updated: new Date().toISOString(),
      });
    } else if (req.method === 'GET') {
      
      const doc = await db.collection('users').where("username", "==", id).get()
      const user = doc.docs.map(user => user.data());
      console.log(user.length)

      if (user.length < 0) {

        res.status(404).end();
      } else {
        res.status(200).json(user);
      }
    } else if (req.method === 'DELETE') {
      await db.collection('users').doc(id).delete();
    }
    res.status(200).end();
  } catch (e) {
    
    res.status(400).end();
  }
}