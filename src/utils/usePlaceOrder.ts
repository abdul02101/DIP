import {
  FusionSDK,
  NetworkEnum,
  QuoteParams,
  BlockchainProviderConnector,
  EIP712TypedData,
  PrivateKeyProviderConnector,
} from "@1inch/fusion-sdk";
import { ethers } from "ethers";
import { createPublicClient, http } from "viem";
import { mainnet, optimism, polygon } from "viem/chains";
import { publicProvider } from "wagmi/providers/public";
import { signTypedData } from "@wagmi/core";
import { publicClient } from "../viemconfig";
import { getAccount } from "@wagmi/core";
import axios from "axios";

class FusionProviderConnector implements BlockchainProviderConnector {
  async signTypedData(
    walletAddress: string,
    typedData: EIP712TypedData
  ): Promise<string> {
    delete typedData.types.EIP712Domain;
    const preSignature = await signTypedData({
      domain: typedData.domain,
      message: typedData.message,
      primaryType: typedData.primaryType,
      types: typedData.types,
    });

    return preSignature;
  }

  async ethCall(contractAddress: string, callData: string): Promise<string> {
    const account = getAccount();
    const dataTransaction: any = {
      account: account.address,
      to: contractAddress,
      data: callData,
    };
    const data = await publicClient.call(dataTransaction);
    return String(data);
  }
}

const fusionProvider = new FusionProviderConnector();

export const usePlaceOrder = async (
  fromTokenAddress: string,
  toTokenAddress: string,
  amount: number,
  decimals: number
) => {
  const sdk = new FusionSDK({
    url: "https://fusion.1inch.io",
    network: 1,
    blockchainProvider: fusionProvider,
  });

  const amountToken = String(amount * 10 ** decimals);

  await sdk
    .placeOrder({
      fromTokenAddress, // WETH
      toTokenAddress, // USDC
      amount: amountToken, // 0.05 ETH
      walletAddress: "0xC18498b69A4585Df63Be55Cf418CCaaaf081333D",
    })
    .then((res) => console.log(res));
};
