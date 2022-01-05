import { Fragment } from 'react';
import { getEventById, getFeaturedEvents } from '../../helpers/api-util';
import EventSummery from '../../components/event-detail/event-summary';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventContent from '../../components/event-detail/event-content';
import ErrorAlert from '../../components/ui/error-alert';

function EventDetailsPage(props) {

    const event = props.selectedEvent;

    if (!event) {
        return (
            <ErrorAlert>
                <p>No Event Found!</p>
            </ErrorAlert>
        )
    }

    return (
        <Fragment>
            <EventSummery title={event.title} />
            <EventLogistics date={event.date} location={event.location} image={event.image} imageAlt={event.title} />
            <EventContent>
                <p>{event.description}</p>
            </EventContent>
        </Fragment>
    )
}

export async function getStaticProps(context) {
    const eventId = await context.params.eventId;

    const event = await getEventById(eventId);

    return {
        props: {
            selectedEvent: event
        },
        revalidate: 30
    }
}

export async function getStaticPaths() {
    const events = await getFeaturedEvents();

    const paths = events.map(event => ({ params: { eventId: event.id } }));

    return {
        paths: paths,
        fallback: 'blocking'
    };
}

export default EventDetailsPage;