import React from "react";

const Avatar = ({ value, onChange }) => {
  const [preview, setPreview] = React.useState(value || null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
      onChange && onChange(objectUrl);
    }
  };

  return (
    <div
      style={{
        width: 100,
        height: 100,
        borderRadius: "50%",
        backgroundColor: "#ddd",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <input
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        id="avatar-upload"
        onChange={handleFileChange}
      />
      <label
        htmlFor="avatar-upload"
        style={{
          width: "100%",
          height: "100%",
          cursor: "pointer",
          display: "block",
        }}
      >
        {preview ? (
          <img
            src={preview}
            alt="Avatar"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <span
            style={{
              position: "absolute",
              top: "40%",
              left: "25%",
              color: "#888",
            }}
          >
            Add Photo
          </span>
        )}
      </label>
    </div>
  );
};

export default Avatar;
