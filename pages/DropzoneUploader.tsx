import React, { useState } from 'react'
import 'react-dropzone-uploader/dist/styles.css'
import styles from '../styles/DropzoneUploader.module.css'
import Dropzone, { IInputProps, ILayoutProps } from 'react-dropzone-uploader'
import { Box, Image, Text, Input } from '@chakra-ui/react'

const LayoutComponent = ( { previews, input, submitButton, dropzoneProps, files }: ILayoutProps ) => {
    return (
        <Box {...dropzoneProps} className={styles.dropzoneContainer}>
            {input}

            {files.length > 0 && submitButton}

            {previews}
        </Box>
    )
}

const InputComponent = (props: IInputProps) => {
    const {
      className,
      getFilesFromEvent,
      accept,
      multiple,
      disabled,
      onFiles,
      files,
      extra: { maxSizeBytes, maxFiles }
    } = props

    const uploadContainer = (
        <>
        <Box {...props} className={styles.uploadContainer}>
            <Image src="/upload.svg" className={styles.uploadImg} alt="logo" />
            <Text as="p" className={styles.uploadTextDark}>Drop Files Here!</Text>
            <Text as="p" className={styles.uploadTextLight}>Maximum size for a file is {maxSizeBytes / 1000000} MB, format .jpg, .jpeg</Text>
            <Text as="p" className={files.length < maxFiles ? styles.uploadTextDark : styles.uploadTextRed}>{files.length}/{maxFiles}</Text>
        </Box>
        </>
    );

    return (
      <label>
        {uploadContainer}
        <Input
          className={className}
          type="file"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          onChange={async e => {
            const target = e.target
            const chosenFiles = await getFilesFromEvent(e)
            onFiles(chosenFiles)
            //@ts-ignore
            target.value = null
          }}
        />
      </label>

    )
  }

const DropzoneUploader = () => {
    const getUploadParams = () => {
      return { url: 'https://httpbin.org/post' }
    }
  
    const handleChangeStatus = ({ meta }, status) => {
      console.log(status, meta)
    }
  
    const handleSubmit = (files, allFiles) => {
      console.log(files.map(f => f.meta))
      allFiles.forEach(f => f.remove())
    }

    return (
      <Dropzone
        getUploadParams={getUploadParams}
        onChangeStatus={handleChangeStatus}
        onSubmit={handleSubmit}
        accept={'image/jpg,image/jpeg'}
        styles={{ dropzone: { minHeight: 200 } }}
        maxFiles={8}
        maxSizeBytes={5000000}
        InputComponent={InputComponent}
        LayoutComponent={LayoutComponent}
      />
    )
  }
  
export default DropzoneUploader;