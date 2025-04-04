declare global {
  interface Window {
    faceIO: any;
  }
}

export const initializeFaceIO = () => {
  return new Promise<any>((resolve, reject) => {
    if (typeof window.faceIO !== "undefined") {
      resolve(new window.faceIO("b4b877f456608c3cd70ecc3102a47e9e"));
    } else {
      const script = document.createElement("script");
      script.src = "https://cdn.faceio.net/fio.js";
      script.async = true;
      script.onload = () => {
        if (typeof window.faceIO !== "undefined") {
          resolve(new window.faceIO("YOUR_FACEIO_PUBLIC_APP_ID"));
        } else {
          reject("FaceIO failed to load.");
        }
      };
      script.onerror = () => reject("Failed to load FaceIO script.");
      document.head.appendChild(script);
    }
  });
};
