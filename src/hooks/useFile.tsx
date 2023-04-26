import { useState } from "react";

export const useInputFile = () => {
  const [file, setFile] = useState<File>();

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target?.files && e.target?.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  return { file, handleFile };
};
