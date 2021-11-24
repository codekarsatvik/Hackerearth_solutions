import React from "react";
import ReactDOM from "react-dom";
import profile from './profile.svg'
import login from './login.module.css'


const ImageUpload = () => {
  const uploadedImage = React.useRef(null);
  const imageUploader = React.useRef(null);

  const handleImageUpload = e => {
    const [file] = e.target.files;
    if (file) {
      const reader = new FileReader();
      const { current } = uploadedImage;
      current.file = file;
      reader.onload = e => {
        current.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        ref={imageUploader}
        style={{display: "none"}}
      />
      <div style={{height: "100px", width: "100px", borderRadius: "50px",borderColor: "transparent", backgroundColor: "#B8DFD8"}}
        onClick={() => imageUploader.current.click()}>
        <img
          ref={uploadedImage}
          style={{width: "100%",height: "100%",}}
        />
      </div> 
      <p style={{marginLeft:"10px", backgroundColor:"#4C4C6D", color:"#ffffff"}}>Upload</p>
    </div>
  );
}

export default ImageUpload