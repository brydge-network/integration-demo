import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { BrydgeWidget } from '@brydge-network/widget'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'
import { Ethereum } from '@wagmi/core'

function useEthereumProvider() {
  const [provider, setProvider] = useState<Ethereum>()

  const { connector, isConnected } = useAccount()

  useEffect(() => {
    if (isConnected) {
      connector.getProvider().then((p) => {
        setProvider(p)
      })
    } else {
      setProvider(undefined)
    }
  }, [connector, isConnected])

  return provider
}

const jsonRpcEndpoints = {
  1: `https://mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_KEY}`,
  10: `https://optimism-mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_KEY}`,
  137: `https://polygon-mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_KEY}`,
  42161: `https://arbitrum-mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_KEY}`,
  43114: `https://avalanche-mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_KEY}`,
}

export default function Home() {
  const router = useRouter()
  const provider = useEthereumProvider()
  const { openConnectModal } = useConnectModal()
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    if (router.isReady) {
      setIsReady(true)
    }
  }, [router.isReady])

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

  const content = isReady ? (
    <BrydgeWidget
      jsonRpcEndpoints={jsonRpcEndpoints}
      provider={provider}
      onConnectWallet={openConnectModal}
    />
  ) : (
    <div className={styles.center}>Loading Brydge Widget...</div>
  )
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
        <div>{content}</div>
      </main>
    </>
  )
}
