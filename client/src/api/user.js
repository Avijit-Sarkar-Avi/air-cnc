export const hostRequest = async hostData => {

    const url = `${process.env.REACT_APP_API_URL}/user/${hostData?.email}`

    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(hostData),
    })

    const data = await response.json()

    return data
}