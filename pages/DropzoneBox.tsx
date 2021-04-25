import React, { ReactNode, useEffect, useState } from 'react';
import { FileWithPath, useDropzone } from 'react-dropzone';
import styles from '../styles/DropzoneBox.module.css';
import axios from 'axios'

export interface IFile extends FileWithPath {
  preview: URL

}

function DropzoneBox(props) {

  // ============= image files
  const [files, setFiles] = useState([]);
  const {getRootProps, getInputProps} = useDropzone({
    accept: 'image/jpg, image/jpeg',
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
    },
    maxSize: 5000000,
    maxFiles: 8
  });

  function handleRemove(name: string) {
      const newFiles = files.filter((file) => file.name !== name);

      setFiles(newFiles);
  }
  
  // ============= thumbs: image previews
  const thumbs = (files: IFile[]): ReactNode => (
    files.map(file => (
    <div className={styles.thumb} 
      key={file.name}
    >
      <div className={styles.thumbInner}>
        <img
          src={String(file.preview)}
          className={styles.img}
        />
        <p className={styles.thumbName}>{file.name}</p>
        <p className={styles.thumbRemove} onClick={() => handleRemove(file.name)}>✖</p>
      </div>
    </div>
  )));

  useEffect(() => () => {
    // Make sure to revoke the data uris to avoid memory leaks
    files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);

  // ============= submit: upload files
  function submitHandle() {    
    const ROOT_URL = "localhost:5000"
    const config = { headers: { 'Content-Type': 'multipart/form-data' } };
    // const config = { headers: { "X-Requested-With": "XMLHttpRequest" };
    
    const uploaders = (files: FileWithPath[]): ReactNode => (
      files.map(file => {

      const formData: FormData = new FormData();
      formData.append("file",String(files));

      console.log(formData);

      // return axios.post(`${ROOT_URL}/upload`, formData, config)
      //   .then((response) => {
      //     callback(response);
      //     console.log("success");
      //   })
      //   .catch(error => {
      //       // errorResponse(error);
      //       console.log(error);
      //   })
    }));
    
    // Once all the files are uploaded 
    // axios.all(uploaders).then(() => {
    //   // ... perform after upload is successful operation
    // });
  }

  // ============= MAIN

  return (
    <section className={styles.container}>
      <div {...getRootProps({className:'dropzone'})}>
        <input {...getInputProps()} />
        <div className={styles.uploadContainer}>
            <img src="/upload.svg" className={styles.uploadImg} alt="logo" />
            <p className={styles.uploadTextLight}>Maximum size for a file is 5 MB, format.jpg, .jpeg</p>
            <p className={styles.uploadTextCount}>{files.length}/8</p>
        </div>
      </div>
      <button className={styles.uploadButton} type="submit" onClick={submitHandle}>submit</button>
      <aside className={styles.thumbsContainer}>
        {thumbs}
      </aside>
    </section>
  );
}

export default DropzoneBox