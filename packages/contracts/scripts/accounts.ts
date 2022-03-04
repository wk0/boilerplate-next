import {deployments, getNamedAccounts, getUnnamedAccounts} from 'hardhat';

async function main() {
  await deployments.all();

  const namedAccounts = await getNamedAccounts();
  const unnamedAccounts = await getUnnamedAccounts();

  // parse args
  console.log('namedAccounts', namedAccounts);
  console.log('unnamedAccounts', unnamedAccounts);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
