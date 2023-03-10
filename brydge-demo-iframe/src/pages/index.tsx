import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { encodeUrl } from '@brydge-network/utils'

export default function Home() {
  // LP_DEPOSIT | PURCHASE | SWAP
  const widgetMode = ''

  // QuickSwap USDC-MATIC LP on Polygon
  const lpInfo = {
    lpChainId: 137,
    routerAddress: '0xa5e0829caced8ffdd4de3c43696c57f7d7a678ff',
    currencyAAddress: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174',
    currencyBAddress: 'NATIVE',
    tokenPairName: 'USDC-MATIC LP',
  }

  // USDC on Polygon
  const outputTokenAddress = '0x2791bca1f2de4661ed88a30c99a7a9449aa84174'

  // Polygon Network
  const destinationChainId = 137

  // Sample price
  const price = 1

  // Dummy calls
  const iCalls = [
    {
      _to: '0x0000000000000000000000000000000000000003',
      _value: 0,
      _calldata: '0x0000000000000000000000000000000000000001',
    },
  ]

  // Sample title
  const title = 'Brydge Demo'

  const url = 'https://brydge.network/widget/' + encodeUrl({})
  return (
    <>
      <Head>
        <title>brydge demo</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.description}>
          <p>
            Integrate with &nbsp;
            <code className={styles.code}>Brydge</code>
          </p>
        </div>
        <iframe height={500} width={500} src={url} />
      </main>
    </>
  )
}
