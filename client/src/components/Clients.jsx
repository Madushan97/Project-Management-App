import { useQuery } from '@apollo/client'
import ClientRow from './ClientRow'
import { GET_CLIENTS } from '../queries/clientQueries'
import Spinner from './Spinner'

export default function Clients() {

    // Apollo provider is a kind of state managemer
    const { loading, error, data } = useQuery(GET_CLIENTS)

    if (loading) return <p><Spinner /></p>
    if (error) return <p>Something Went Wrong</p>
    return (
        <>
            { !loading && !error && (
                <table className='table table-hover mt-3'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>E-Mail</th>
                            <th>Phone </th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.clients.map(client => (
                            <ClientRow key={client.id} client={client} />
                        ))}
                    </tbody>
                </table>
            )}
        </>
    )
}
