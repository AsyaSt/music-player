export const PreViewImage = (image) => {
    if (image && typeof (image) !== "string") {
        return (
        <div className="d-flex justify-content-center">
            <label htmlFor="fileImage" className='me-4 playlist-img-box rounded-5 cursor-pointer' 
                style={{backgroundImage: `url(${URL.createObjectURL(image)})`, backgroundSize: "cover", 
                backgroundRepeat: "no-repeat", backgroundPosition: "center"}}>
            </label>
        </div>
        )
    }
    }
