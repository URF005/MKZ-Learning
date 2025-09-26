// U:\LMS-MKZ\server\utils\videoUrl.js
import { v2 as cloudinary } from "cloudinary";

/**
 * Build a signed, expiring Cloudinary VIDEO URL with a text watermark.
 * The watermark contains viewer identity (e.g., name / email).
 *
 * @param {string} publicId - Cloudinary public_id of the uploaded video
 * @param {string} identityText - Text to watermark (user name/email)
 * @param {number} ttlSeconds - Link validity in seconds (default 1 hour)
 * @returns {string} signed, expiring, watermarked playback URL
 */
export function buildWatermarkedVideoUrl(publicId, identityText, ttlSeconds = 3600) {
  if (!publicId) return "";

  // Safer text (avoid characters Cloudinary might escape oddly in URLs)
  const safeText = String(identityText || "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 80); // keep watermark short & readable

  const expiresAt = Math.floor(Date.now() / 1000) + ttlSeconds;

  return cloudinary.url(publicId, {
    resource_type: "video",
    secure: true,
    sign_url: true,
    expires_at: expiresAt,          // URL auto-expires
    transformation: [
      // Slight blur/scale to make cropping harder (optional, comment out if undesired)
      // { effect: "sharpen:0" },

      // Visible watermark (bottom-right)
      {
        overlay: {
          font_family: "Arial",
          font_weight: "bold",
          font_size: 22,
          text: safeText,
        },
        gravity: "south_east",
        y: 20,
        x: 20,
        color: "#ffffff",
        opacity: 65,
      },

      // A faint, oversized, diagonal watermark (center) — extra deterrent
      {
        overlay: {
          font_family: "Arial",
          font_weight: "bold",
          font_size: 90,
          text: "• " + safeText + " •",
        },
        gravity: "center",
        angle: 320,
        opacity: 12,
        color: "#ffffff",
      },
    ],
  });
}
