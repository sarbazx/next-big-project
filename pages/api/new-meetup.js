import { MongoClient } from 'mongodb';

async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;
    const connectionUrl =
      'mongodb+srv://tasqyn:v3Qwf0YdVluc6X7y@udemynext.ey0dz.mongodb.net/meetups?retryWrites=true&w=majority';
    const client = await MongoClient.connect(connectionUrl);
    const db = client.db();
    const meetupsCollection = db.collection('meetups');
    const result = await meetupsCollection.insertOne(data);
    console.log({ result });
    client.close();

    res.status(201).json({ message: 'Meetup inserted!' });
  }
}

export default handler;
