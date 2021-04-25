import Head from 'next/head'
import styles from '../styles/Home.module.css'
import DropzoneUploader from './DropzoneUploader'
import { Heading, VStack } from '@chakra-ui/react'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Dropzone Uploader</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <VStack as='main' className={styles.main} w='80vw' justifyContent='flex-start'>
        <Heading as='h1' textAlign='center' fontSize='4xl' mb='7'>
          Welcome to The Dropzone
        </Heading>

        <DropzoneUploader />

      </VStack>
    </div>
  )
}
