import { NetworkStatus, useQuery, useLazyQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react'
import { EXCHANGE_RATES, SEARCH_RATES } from "../../GraphQl/Queries"
const DataTable = () => {
    const [search, setSearch] = useState("")
    const { loading, error, data, refetch, networkStatus } = useQuery(EXCHANGE_RATES
        , {
            // pollInterval: 500
            // notifyOnNetworkStatusChange: true
        }
    );
    const [fetchSearch, { data: searchData, loading: searchLoading }] = useLazyQuery(SEARCH_RATES)
    useEffect(() => {
        // console.log("result => ", data, "loading => ", loading, "error => ", error);
        // console.count()
    }, [data, searchData])
    return (
        <div>
            <input type="text" onChange={(e) => setSearch((e.target.value).toUpperCase())} />
            <button onClick={() => fetchSearch({
                variables: {
                    currency: search
                }
            })}>CAD</button>
            <table border={1} >
                <thead>
                    <tr>
                        <th>Currency</th>
                        <th>Rate</th>
                        {/* <th>Name</th> */}
                    </tr>
                </thead>
                <tbody>
                    {
                        networkStatus === NetworkStatus.refetch && <div>reFetching...</div>
                    }
                    {
                        loading && <div>loading... </div>
                    }
                    {
                        searchLoading && <div>Search Loading ...</div>
                    }
                    {
                        error && <div>Error...</div>
                    }
                    {
                        (searchData?.rates.length > 0 ? searchData?.rates : data?.rates)?.map((val, id) => <tr key={id}>
                            <td>{val.currency}</td>
                            <td>{val.rate}</td>
                            {/* <td>{val?.name}</td> */}
                        </tr>)
                    }
                    <tr><td><hr /></td><td><hr /></td></tr>
                </tbody>
            </table>
        </div>
    )
}

export default DataTable