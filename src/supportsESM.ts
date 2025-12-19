/**
 * Check if current Node supports ESM at all (Node 12+).
 */
export default function supportsESM(): boolean {
  const major = +process.versions.node.split('.')[0];
  return major >= 12;
}
