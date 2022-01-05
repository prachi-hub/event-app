import { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { getFilteredEvents } from '../../helpers/api-util';
import EventList from '../../components/events/events-list';
import ResultsTitle from '../../components/events/results-title';
import Button from '../../components/ui/button';
import ErrorAlert from '../../components/ui/error-alert';

function FilteredEventPage(props) {
    const [loadedEvents, setloadedEvents] = useState();

    const router = useRouter();

    const filterData = router.query.slug;

    const { data, error } = useSWR('https://nextjs-course-bef9c-default-rtdb.firebaseio.com/events.json');

    useEffect(() => {
        if (data) {
            const events = [];

            for (const key in data) {
                events.push({
                    id: key,
                    ...data[key]
                });
            }

            setloadedEvents(events);
        }
    }, [data]);

    if (!loadedEvents) {
        return (
            <p className='center'>Loading...</p>
        )
    }

    const filterYear = filterData[0];
    const filterMonth = filterData[1];

    const numYear = +filterYear;
    const numMonth = +filterMonth;

    if (isNaN(numYear) || isNaN(numMonth) || numYear > 2030 || numYear < 2021 || numMonth < 1 || numMonth > 12 || error) {
        return (
            <Fragment>
                <ErrorAlert>
                    <p>Invalid Filtered. Please adjust your values!</p>
                </ErrorAlert>
                <div className='center'>
                    <Button link="/events">Show all events</Button>
                </div>
            </Fragment>

        );
    }

    let filteredEvents = loadedEvents.filter((event) => {
        const eventDate = new Date(event.date);
        return eventDate.getFullYear() === numYear && eventDate.getMonth() === numMonth - 1;
    });


    if (!filteredEvents || filteredEvents.length === 0) {
        return (
            <Fragment>
                <ErrorAlert>
                    <p>No events found for the chosen filter!</p>
                </ErrorAlert>
                <div className='center'>
                    <Button link="/events">Show all events</Button>
                </div>
            </Fragment>
        );
    }

    const date = new Date(numYear, numMonth - 1);

    return (
        <Fragment>
            <ResultsTitle date={date} />
            <EventList items={filteredEvents} />
        </Fragment>
    )
}

// export async function getServerSideProps(context) {
//     const { params } = context;

//     const filterData = params.slug;

//     const filterYear = filterData[0];
//     const filterMonth = filterData[1];

//     const numYear = +filterYear;
//     const numMonth = +filterMonth;

//     if (isNaN(numYear) || isNaN(numMonth) || numYear > 2030 || numYear < 2021 || numMonth < 1 || numMonth > 12) {
//         return {
//             props: { hasError: true }
//             // notFound: true,
//             // redirect: {
//             //     desitination: '/error'
//             // }
//         }
//     }

//     const filteredEvents = await getFilteredEvents({
//         year: numYear,
//         month: numMonth
//     });

//     return {
//         props: {
//             events: filteredEvents,
//             date: {
//                 year: numYear,
//                 month: numMonth
//             }
//         }
//     }
// }

export default FilteredEventPage;