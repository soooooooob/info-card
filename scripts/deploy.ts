require("dotenv").config();
import { ethers } from "hardhat";
import { SimpleCardNFTFactory } from "../typechain-types";

async function main() {
  const SimpleCardNFTFactoryFactory = await ethers.getContractFactory(
    "SimpleCardNFTFactory"
  );
  const simpleCardNFTFactory: SimpleCardNFTFactory =
    (await SimpleCardNFTFactoryFactory.deploy()) as SimpleCardNFTFactory;

  console.log(
    "SimpleCardNFTFactory deployed to:",
    await simpleCardNFTFactory.address
  );
}

main()
  .then(() => (process.exitCode = 0))
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });

// 정상적으로 sepolia network에 배포가 되었다면 아래와 같이 출력됨. 배포 주소는 다 다른 것이 정상.
// SimpleCardNFTFactory deployed to: 0x806E846858E752eb9f709e9EB3803b9217fbe4d0
