import Head from 'next/head';

import { getFeaturedEvents } from '../helpers/api-util';
import EventList from '../components/events/events-list';
import NewsletterRegistration from '../components/input/newsletter-registration';

function HomePage(props) {
  return (
    <div>
      <Head>
        <title>Next JS</title>
      </Head>
      <NewsletterRegistration />
      <EventList items={props.events} />
    </div>
  )
}

export async function getStaticProps() {
  const featureEvents = await getFeaturedEvents();

  return {
    props: {
      events: featureEvents
    },
    revalidate: 1800
  }
}

export default HomePage;