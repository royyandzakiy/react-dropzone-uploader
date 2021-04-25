import React from 'react'
import 'react-dropzone-uploader/dist/styles.css'
import Dropzone, { IInputProps, ILayoutProps } from 'react-dropzone-uploader'
import { Box, Image, Text, Input, FormLabel, VStack } from '@chakra-ui/react'

const LayoutComponent = ( { previews, input, submitButton, dropzoneProps, files }: ILayoutProps ) => {
    return (
        <Box {...dropzoneProps}
          className={'dropzoneContainer'}
          textAlign='center'
          >
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
        <Box {...props}
          className={'uploadContainer'}
          padding='60px'
          alignItems='center'
          alignSelf='center'
          textAlign='center'
          border='3px dashed rgba(0,0,0,.1)'
          borderRadius='5px'
          _hover={{
            backgroundColor: 'rgba(0,0,0,.03)',
            cursor: 'pointer',
          }}
        >
            <VStack>
                <Image src="/upload.svg" opacity={'0.2'} alt="logo" />
                <Text as="p" color={'rgba(0,0,0,.7)'}>Drop Files Here!</Text>
                <Text as="p" color={'rgba(0,0,0,.3)'}>Maximum size for a file is {maxSizeBytes / 1000000} MB, format .jpg, .jpeg</Text>
                <Text as="p" color={files.length < maxFiles ? 'rgba(0,0,0,.7)' : 'rgba(255,0,0,.7)'}>{files.length}/{maxFiles}</Text>
            </VStack>
        </Box>
    );

    return (
      <FormLabel>
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
      </FormLabel>

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