import { useCallback, useEffect, useState } from 'react'
import { ConnectionOptions } from '../interfaces/http'
import { Items } from '../interfaces/Items'

const sendHttpRequest = async (url: string, config: ConnectionOptions) => {
    const response = await fetch(url, config)
    const resData = await response.json()

    if (!response.ok) {
        throw new Error(
            resData.message || 'Something went wrong, failed to send request.'
        )
    }

    return resData
}

const useHttp = (
    url: string,
    config: ConnectionOptions,
    initialData?: Items
) => {
    const [data, setData] = useState(initialData)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    function clearData() {
        if (initialData) {
            setData(initialData)
        }
    }

    const sendRequest = useCallback(
        async (data?: {}) => {
            setIsLoading(true)

            try {
                const resData = await sendHttpRequest(url, {
                    ...config,
                    body: JSON.stringify(data),
                })

                setData(resData)
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message || 'Something went wrong!')
                }
            }

            setIsLoading(false)
        },
        [url, config]
    )

    useEffect(() => {
        if (
            (config && (config.method === 'GET' || !config.method)) ||
            !config
        ) {
            sendRequest()
        }
    }, [sendRequest, config])

    return {
        data,
        isLoading,
        error,
        sendRequest,
        clearData,
    }
}

export default useHttp
