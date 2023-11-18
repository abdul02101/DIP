import { useAccount } from "wagmi";
import "./App.css";
import React from "react";
import { Connect } from "./components/Connect";
import { usePlaceOrder } from "./utils/usePlaceOrder";
import { Card, Select, Input, Spin } from "antd";

const tokens = [
  {
    key: "1",
    tokenAddress: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
    tokenSymbol: "ETH",
    decimals: "18",
    logo: "https://www.datocms-assets.com/86369/1669619533-ethereum.png",
  },

  {
    key: "2",
    tokenAddress: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    tokenSymbol: "WETH",
    decimals: "18",
    logo: "https://logos.covalenthq.com/tokens/1/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2.png",
  },
  {
    key: "3",
    tokenAddress: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    tokenSymbol: "USDC",
    decimals: "6",
    logo: "https://logos.covalenthq.com/tokens/1/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48.png",
  },
  {
    key: "4",
    tokenAddress: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
    tokenSymbol: "DAI",
    decimals: "18",
    logo: "https://logos.covalenthq.com/tokens/1/0x6b175474e89094c44da98b954eedeac495271d0f.png",
  },
  {
    key: "5",
    tokenAddress: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    tokenSymbol: "USDT",
    decimals: "6",
    logo: "https://logos.covalenthq.com/tokens/1/0xdac17f958d2ee523a2206206994597c13d831ec7.png",
  },
];

export function App() {
  const { isConnected } = useAccount();
  const [amountTokenFrom, setAmountTokenFrom] = React.useState(1);
  const [tokenFromDecimals, setTokenFromDecimals] = React.useState<number>(18);
  const [tokenFrom, setTokenFrom] = React.useState(
    "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"
  );
  const [tokenTo, setTokenTo] = React.useState(
    "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"
  );

  React.useEffect(() => {
    console.log(tokenFromDecimals);
  }, [tokenFromDecimals]);

  const handleChangeTokenFrom = async (value: string) => {
    setTokenFrom(value);
    const decimalsToken: any = tokens.filter(
      (token) => token.tokenAddress === value
    );
    setTokenFromDecimals(decimalsToken[0].decimals);
  };

  const handleChangeTokenTo = async (value: string) => {
    setTokenTo(value);
  };

  return (
    <>
      <Connect />

      <h1>Decentralized Intent</h1>

      {isConnected && (
        <>
          <div className="card">
            <Card
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                padding: 0,
              }}
              title="Swap"
              bordered={false}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  width: 495,
                  maxWidth: 495,
                  backgroundColor: "#f3f5fa",
                  borderRadius: 15,
                  padding: 15,
                  marginBottom: 10,
                }}
              >
                <p style={{ color: "#6c86ad" }}>You sell</p>
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "space-between",
                  }}
                >
                  {/* <strong
                    style={{
                      fontSize: 15,
                    }}
                  >
                    tokenSymbol
                  </strong> */}
                  <Select
                    defaultValue="ETH"
                    style={{ width: 120 }}
                    onChange={handleChangeTokenFrom}
                    options={[
                      {
                        value: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
                        label: "ETH",
                      },
                      {
                        value: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
                        label: "WETH",
                      },
                      {
                        value: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
                        label: "USDC",
                      },
                      {
                        value: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
                        label: "DAI",
                      },
                      {
                        value: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
                        label: "USDT",
                      },
                    ]}
                  />
                  <Input
                    placeholder="1"
                    value={amountTokenFrom}
                    onChange={(e: any) =>
                      setAmountTokenFrom(Number(e.target.value))
                    }
                    style={{
                      backgroundColor: "transparent",
                      maxWidth: 100,
                      border: "none",
                    }}
                  />
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  width: 495,
                  maxWidth: 495,
                  backgroundColor: "#ffffff",
                  borderRadius: 15,
                  padding: 15,
                  border: "1px solid #e3e7ee",
                }}
              >
                <p style={{ color: "#6c86ad" }}>You buy</p>
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "space-between",
                  }}
                >
                  <Select
                    defaultValue="USDC"
                    style={{ width: 120 }}
                    onChange={handleChangeTokenTo}
                    options={[
                      {
                        value: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
                        label: "ETH",
                      },
                      {
                        value: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
                        label: "WETH",
                      },
                      {
                        value: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
                        label: "USDC",
                      },
                      {
                        value: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
                        label: "DAI",
                      },
                      {
                        value: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
                        label: "USDT",
                      },
                    ]}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                ></div>
              </div>
            </Card>

            <button
              style={{ marginTop: 30 }}
              onClick={() =>
                usePlaceOrder(
                  tokenFrom,
                  tokenTo,
                  amountTokenFrom,
                  tokenFromDecimals
                )
              }
            >
              swap
            </button>
          </div>
        </>
      )}
    </>
  );
}
