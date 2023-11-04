type ImageContainerProps = {
    image: string;
}

const ImageContainer = ({image}: ImageContainerProps) => {
    return (
        <div className="img-container">
            <img src={image}/>
        </div>
    )
}

export default ImageContainer