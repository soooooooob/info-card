import { ethers } from "ethers";
import { SimpleCardNFTFactory } from "../typechain-types";
import { readFileSync } from "fs";
import { join } from "path";
const hre = require("hardhat");

// ABI 파일의 경로를 지정합니다.
const abiPath = join(
  __dirname,
  "../artifacts/contracts/SimpleCardNFTFactory.sol/SimpleCardNFTFactory.json"
);

// 파일을 읽어서 JSON으로 파싱합니다.
const abiJson = JSON.parse(readFileSync(abiPath, "utf8"));

// ABI 정보만 추출합니다.
const abi = abiJson.abi;

const contractAddress = "0x806E846858E752eb9f709e9EB3803b9217fbe4d0";

async function main() {
  // Initialize provider and signer
  const provider = hre.ethers.provider; // Hardhat's built-in provider
  const privateKey = process.env.METAMASK_PRIVATE_KEY;

  if (!privateKey) {
    console.error("Please set the METAMASK_PRIVATE_KEY environment variable");
    process.exit(1);
  }

  const wallet = new hre.ethers.Wallet(privateKey, provider); // 연결된 프로바이더 추가
  const currentGasPrice = await provider.getGasPrice();

  const contract = new ethers.Contract(contractAddress, abi, provider).connect(
    wallet
  ) as SimpleCardNFTFactory;

  await contract.registerSimpleCardInfo(
    "SuBeen",
    "sophie02039@gmail.com",
    "ENTP",
    "NO_Company",
    "Sookmyung Women's University",
    "Consumer Economics",
    "010-9xxx-xxxx",
    "https://github.com/soooooooob"
  );
  console.log("Simple Card Info Registered");

  // Mint a new SimpleCardNFT
  await contract.mintSimpleCardNFT({
    gasPrice: currentGasPrice.add(ethers.utils.parseUnits("1", "gwei")),
    value: ethers.utils.parseEther("0.01"),
  });
  console.log("New SimpleCardNFT Minted");

  // Transfer the SimpleCardNFT to another address
  const recipientAddress = "0x3F233a18310c563270C3f8C6E9759b5f32FF4E08"; //여기서는 제 또 다른 개발용 메타마스크 주소를 넣었습니다. 명함을 주고싶은 사람 주소를 넣으면 됩니당.
  await contract.transferSimpleCardNFT(recipientAddress);
  console.log(`SimpleCardNFT Transferred to ${recipientAddress}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

//정상적으로 sepolia network에 배포가 되었다면 아래와 같이 출력됨.
// Simple Card Info Registered
// New SimpleCardNFT Minted
// SimpleCardNFT Transferred to 0x3F233a18310c563270C3f8C6E9759b5f32FF4E08
