import MeetupList from '../components/meetups/MeetupList';
import { MongoClient } from 'mongodb';
import { Fragment } from 'react';
import Head from 'next/head';
function HomePage(props) {
    return <Fragment>
        <Head>
            <title>Meetups Page</title>
            <meta name='description' content='Browser a huge list of active React Meetups' />
        </Head>
        <MeetupList meetups={props.meetups} />
    </Fragment>;
}

export async function getStaticProps() {
    const client = await MongoClient.connect('mongodb+srv://taskapp:9eMModWrE0BIUTDA@cluster0.cw98b.mongodb.net/meetups?retryWrites=true&w=majority');
    const db = client.db();
    const MeetupsCollection = db.collection('meetups');

    const meetups = await MeetupsCollection.find().toArray();

    client.close();
    return {
        props: {
            meetups: meetups.map(meetup => ({
                title: meetup.title,
                address: meetup.address,
                description: meetup.description,
                image: meetup.image,
                id: meetup._id.toString()
            }))
        }
    };
}

export default HomePage;