import manifest from '../assets/manifest.json';

export function getImage(id) {
  const entry = manifest[id];
  if (!entry) {
    throw new Error(`No manifest entry for image id "${id}"`);
  }
  return entry;
}
