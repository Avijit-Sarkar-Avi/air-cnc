import React, { useContext } from 'react';
import BecomeHostForm from '../../Components/Form/BecomeHostForm';
import { getImageUrl } from '../../api/imageUpload';
import { AuthContext } from '../../contexts/AuthProvider';

const BecomeAHost = () => {

    const { user } = useContext(AuthContext)

    const handleSubmit = event => {
        event.preventDefault()
        const location = event.target.location.value
        const image = event.target.image.files[0]
        getImageUrl(image)
            .then(data => {
                const hostData = {
                    location: location,
                    documentImg: data,
                    role: 'requested',
                    email: user?.email
                }
                console.log(hostData)
            })
    }

    return <BecomeHostForm handleSubmit={handleSubmit} />

};

export default BecomeAHost;