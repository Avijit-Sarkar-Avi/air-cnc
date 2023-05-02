import React from 'react';
import BecomeHostForm from '../../Components/Form/BecomeHostForm';
import { getImageUrl } from '../../api/imageUpload';

const BecomeAHost = () => {

    const handleSubmit = event => {
        event.preventDefault()
        const location = event.target.location.value
        const image = event.target.image.files[0]
        getImageUrl(image)
            .then(data => {
                const hostData = {
                    location: location,
                    image: data,
                    role: 'requested'
                }
                console.log(hostData)
            })
    }

    return <BecomeHostForm handleSubmit={handleSubmit} />

};

export default BecomeAHost;