import { Fragment } from 'react';
import { useRouter } from 'next/router';

import { getAllEvents } from '../../helpers/api-util';
import EventList from '../../components/events/events-list';
import EventSearch from '../../components/events/events-search';

function AllEventPages(props) {
    const router = useRouter();
    const {events} = props;

    function findEventHandler(year, month) {
        const fullPath = `/events/${year}/${month}`;
        router.push(fullPath);
    }
  
    return (
      <Fragment>
        <EventSearch onSearch={findEventHandler} />
        <EventList items={events} />
      </Fragment>
    );
}

export async function getStaticProps() {
  const events = await getAllEvents();

  return{
    props: {
      events: events
    },
    revalidate: 60
  }
}

export default AllEventPages;