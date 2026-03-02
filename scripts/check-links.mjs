import { getLocalizedPaths } from './routes.mjs';

async function run() {
  const paths = await getLocalizedPaths();
  const duplicates = paths.filter((path, index) => paths.indexOf(path) !== index);

  if (duplicates.length) {
    throw new Error(`Duplicate routes detected: ${duplicates.join(', ')}`);
  }

  console.log(`Route link check passed (${paths.length} unique localized paths).`);
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
