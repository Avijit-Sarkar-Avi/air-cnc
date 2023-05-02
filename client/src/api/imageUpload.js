export const getImageUrl = async image => {


    const formData = new FormData()
    formData.append('image', image)

    const url = `https://api.imgbb.com/1/upload?key=e70f17fca4bd2e87f62f438f8e3a5c68`

    const response = await fetch(url, {
        method: 'POST',
        body: formData,
    })

    const data = await response.json()
    return data.data.display_url
}