/**
 * Feature 3 — Cloudinary Image CDN Optimization
 *
 * Injects Cloudinary transformation parameters into a Cloudinary image URL.
 * Non-Cloudinary URLs are returned unchanged, making this safe to use on any
 * image field that may come from local storage or an external source.
 *
 * Usage:
 *   getCloudinaryUrl(post.image, 'w_1200,f_auto,q_auto')
 *   getCloudinaryUrl(post.image, 'w_400,f_auto,q_auto,c_fill,h_300')
 *
 * Cloudinary URL structure:
 *   https://res.cloudinary.com/<cloud>/<type>/upload/<transformations>/<version>/<public_id>
 *   The transformation string is inserted after "/upload/".
 */
export function getCloudinaryUrl(rawUrl, transformations = 'f_auto,q_auto') {
  if (!rawUrl || typeof rawUrl !== 'string') return rawUrl;

  // Only mutate Cloudinary-hosted URLs
  if (!rawUrl.includes('res.cloudinary.com')) return rawUrl;

  // If transformations are already present (contains a comma or known param),
  // avoid double-injecting. Check for the segment after /upload/.
  const uploadMarker = '/upload/';
  const uploadIndex = rawUrl.indexOf(uploadMarker);
  if (uploadIndex === -1) return rawUrl;

  const afterUpload = rawUrl.slice(uploadIndex + uploadMarker.length);

  // If the segment after /upload/ already starts with a transformation token
  // (e.g. "w_", "f_", "q_", "c_", "h_", "v1234"), skip injection to be idempotent.
  // A version segment looks like "v1234567890".
  const alreadyTransformed = /^(w_|h_|f_|q_|c_|e_|g_|r_|b_|l_|fl_)/.test(afterUpload);
  if (alreadyTransformed) return rawUrl;

  // Insert the transformation string right after "/upload/"
  const before = rawUrl.slice(0, uploadIndex + uploadMarker.length);
  const after = afterUpload;
  return `${before}${transformations}/${after}`;
}
