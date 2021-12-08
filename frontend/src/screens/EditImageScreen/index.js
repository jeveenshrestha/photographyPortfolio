import React, { useState, useEffect } from "react";
import axios from "axios";

import { useDispatch, useSelector } from 'react-redux';

import { updateImage, getImageDetails } from "../../store/actions/imageActions";
import { UPDATE_IMAGE_RESET } from "../../store/constants/imageConstants";

import FormField from "../../components/FormField";

import classes from "./EditImageScreen.module.css";

const EditImageScreen = (props) => {
    const { match, history } = props;

    const imageId = match.params.id;
    const dispatch = useDispatch();

    // Redux State

    const imageDetails = useSelector((state) => state.imageDetails);
    const { loading: loadingImageDetails, image: currentImage } = imageDetails;

    const imageUpdate = useSelector((state) => state.imageUpdate);
    const { success: successUpdate, } = imageUpdate;

    // Image State

    const [images, setImages] = useState([]);
    const [uploading, setUploading] = useState(false);

    // Form State

    const [formState, setFormState] = useState({
        alt: "",
    });

    const formConfig = {
        alt: {
            type: 'input',
            config: { type: "text", placeholder: 'Alternative text' },
        },
    };

    const formElements = [];
    for (let key in formState) {
        formElements.push({ id: key, setup: formConfig[key], values: formState[key] });
    };

    const inputChangedHandler = (event, inputIdentifier) => {
        formElements.forEach((formElement) => {
            if (inputIdentifier === formElement.id) {
                setFormState({
                    ...formState,
                    [inputIdentifier]: event.target.value,
                })
            }
        })
    };

    const imagesArray = [];

    for (let key in images) {
        imagesArray.push(images[key])
    };

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("image", file);
        setUploading(true);
        try {
            const config = {
                headers: { "Content-Type": "multipart/form-data" },
            };

            const { data } = await axios.post("http://localhost:5000/api/upload", formData, config);

            imagesArray.push(data);
            setImages(imagesArray);
            setUploading(false);

        } catch (error) {
            console.error(error);
            setUploading(false);
        }
    };

    const imageDeleteHandler = (id) => {
        const imageIndex = images.indexOf(id);
        images.splice(imageIndex, 1);
    };

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateImage({
            _id: imageId,
            src: images,
            alt: formState.alt
        }))
    };

    const goBackHandler = () => {
        history.push("/login");
    }

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: UPDATE_IMAGE_RESET });
            history.push("/admin");
        } else {
            if (!currentImage || imageId !== currentImage._id) {
                dispatch(getImageDetails(imageId));
            } else {
                setFormState({ alt: currentImage.alt });
                setImages(currentImage.src);
            }
        }
    }, [dispatch, currentImage, history, imageId, successUpdate]);

    return (
        <div className={classes.screen_container}>
            <button onClick={goBackHandler}>Go Back</button>
            {loadingImageDetails ? <div>...loading...</div> :
                <form onSubmit={submitHandler} className={classes.form}>
                    {formElements.map(formElement => (
                        <FormField
                            key={formElement.id}
                            type={formElement.setup.type}
                            config={formElement.setup.config}
                            value={formElement.value}
                            changed={(event) => inputChangedHandler(event, formElement.id)}
                        />
                    ))}
                    {images &&
                        images.map((item, index) => (
                            <div className={classes.imageBox_container} key={index}>
                                <img src={item} style={{ width: '100px' }} alt={item} />
                                <button onClick={() => imageDeleteHandler(item)}>Delete</button>
                            </div>
                        ))}
                    <input type='file' onChange={uploadFileHandler} name={images} />
                    {uploading && <div>...loading...</div>}
                    <button type="submit">Submit</button>
                </form>
            }

        </div>
    )
};

export default EditImageScreen;