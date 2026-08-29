export const MAX_REFERENCE_FILE_SIZE = 15 * 1024 * 1024; // 15 MB
export const MAX_CONTACT_REQUEST_SIZE = MAX_REFERENCE_FILE_SIZE + 512 * 1024;

export const ALLOWED_REFERENCE_FILE_EXTENSIONS = [
  ".pdf",
  ".png",
  ".jpg",
  ".jpeg",
  ".svg",
  ".zip",
  ".ai",
  ".psd",
  ".fig",
] as const;
