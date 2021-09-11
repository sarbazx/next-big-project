import Head from 'next/head';
import { MongoClient, ObjectId } from 'mongodb';
import MeetupDetail from '../../components/meetups/MeetupDetail';

const Meetup = ({ meetupData }) => (
  <>
    <Head>
      <title>{meetupData.title}</title>
      <meta name='description' content={meetupData.description} />
    </Head>
    <MeetupDetail {...meetupData} />
  </>
);

export async function getStaticPaths() {
  const connectionUrl =
    'mongodb+srv://tasqyn:v3Qwf0YdVluc6X7y@udemynext.ey0dz.mongodb.net/meetups?retryWrites=true&w=majority';
  const client = await MongoClient.connect(connectionUrl);
  const db = client.db();
  const meetupsCollection = db.collection('meetups');
  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();
  client.close();
  return {
    fallback: 'blocking',
    paths: meetups.map((meetup) => ({
      params: {
        meetupId: meetup._id.toString(),
      },
    })),
  };
}

export async function getStaticProps({ params }) {
  const connectionUrl =
    'mongodb+srv://tasqyn:v3Qwf0YdVluc6X7y@udemynext.ey0dz.mongodb.net/meetups?retryWrites=true&w=majority';
  const client = await MongoClient.connect(connectionUrl);
  const db = client.db();
  const meetupsCollection = db.collection('meetups');
  const selectedMeetup = await meetupsCollection.findOne({
    _id: ObjectId(params.meetupId),
  });
  client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        description: selectedMeetup.description,
        image: selectedMeetup.image,
      },
    },
  };
}

export default Meetup;
