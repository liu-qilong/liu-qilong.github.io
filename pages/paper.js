import { Inter } from 'next/font/google'
import Layout from '../components/layout'

const inter = Inter({ subsets: ['latin'] })

export default function Paper() {
  return (
    <Layout>
      <span class="float-left text-6xl font-serif mr-2">R</span>
      <p class="font-serif">ecent papers that I contributed to...</p>
    </Layout>
  )
}
