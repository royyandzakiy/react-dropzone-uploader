import Head from 'next/head'
import DropzoneUploader from './DropzoneUploader'
import { Heading, VStack } from '@chakra-ui/react'

export default function Home() {
  return (
    <>
      <Head>
        <title>Dropzone Uploader</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <VStack as='main' w='100vw' pt='100px' justifyContent='flex-start'>
        <Heading as='h1' textAlign='center' fontSize='4xl' mb='7'>
          Welcome to The Dropzone
        </Heading>

        <DropzoneUploader />

      </VStack>
    </>
  )
}
