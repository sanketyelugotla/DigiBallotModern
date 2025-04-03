import React, { useContext } from 'react'
import { loadingContext } from '../Hooks/ContextProvider/ContextProvider'

export default function Loading() {
    const { loading } = useContext(loadingContext);

    return loading && (
        <div className="loading-overlay">
            <p>Loading...</p>
        </div>
    )
}
