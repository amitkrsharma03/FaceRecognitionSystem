import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { ArrowLeft, Upload, Loader } from "lucide-react";
import { enrollUser } from "../lib/face-recognition";

export default function Registration() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState("");
  const [grade, setGrade] = useState("");
  const [studentId, setStudentId] = useState("");
  const [message, setMessage] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (images.length + acceptedFiles.length > 3) {
      setMessage("Maximum 3 photos allowed");
      return;
    }

    acceptedFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        setImages(prev => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  }, [images]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png']
    },
    maxFiles: 3,
  });

  async function handleRegistration() {
    if (images.length === 0) {
      setMessage("Please upload at least one photo");
      return;
    }

    setIsRegistering(true);
    setMessage("Processing registration...");
    setUploadProgress(0);

    try {
      const subjectId = `${name.replace(/\s+/g, '_').toLowerCase()}@college.com`;
      
      for (let i = 0; i < images.length; i++) {
        setUploadProgress(((i + 1) / images.length) * 100);
        await enrollUser(images[i], subjectId);
      }

      setMessage("✅ Registration successful!");
      // Reset form
      setName("");
      setGrade("");
      setStudentId("");
      setImages([]);
    } catch (err: any) {
      console.error("Registration error:", err);
      setMessage(`❌ Registration failed: ${err?.message || "Unknown error"}`);
    } finally {
      setIsRegistering(false);
      setUploadProgress(0);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <button
          onClick={() => window.history.back()}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back
        </button>

        <h1 className="text-3xl font-bold text-gray-900 mb-8">Student Registration</h1>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter full name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Grade/Year
            </label>
            <input
              type="text"
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="e.g., 1st Year"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Student ID
            </label>
            <input
              type="text"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter student ID"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Photos (Max 3)
            </label>
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
                ${isDragActive ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 hover:border-indigo-400'}`}
            >
              <input {...getInputProps()} />
              <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600">
                {isDragActive
                  ? "Drop the files here..."
                  : "Drag & drop photos here, or click to select"}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                {images.length}/3 photos uploaded
              </p>
            </div>
          </div>

          {images.length > 0 && (
            <div className="grid grid-cols-3 gap-4">
              {images.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={image}
                    alt={`Upload ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <button
                    onClick={() => setImages(images.filter((_, i) => i !== index))}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {uploadProgress > 0 && (
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          )}

          <button
            onClick={handleRegistration}
            disabled={isRegistering || !name || !grade || !studentId || images.length === 0}
            className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isRegistering ? (
              <>
                <Loader className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                Registering...
              </>
            ) : (
              'Complete Registration'
            )}
          </button>

          {message && (
            <div className={`text-center p-4 rounded-lg ${message.includes('✅') ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}