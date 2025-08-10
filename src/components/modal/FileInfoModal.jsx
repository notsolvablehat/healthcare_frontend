import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import CustomLoader from "../ui/Loader";
import { uploadFile } from "../../services/llmService";
import { useSelector } from "react-redux";

const FileInfoModal = ({ isOpen, onOpenChange, file, onConfirm }) => {
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractedData, setExtractedData] = useState("");
  const [editedData, setEditedData] = useState("");
  const [error, setError] = useState(null);

  const { emailId } = useSelector(state => state.user.personalInfo.data) 

  const resetModalState = () => {
    setIsExtracting(false);
    setExtractedData("");
    setEditedData("");
    setError(null);
  };

  useEffect(() => {
    if (!isOpen) {
      resetModalState();
    }
  }, [isOpen]);

  const handleConfirmAndExtract = async () => {
    if (!file) return;
    setIsExtracting(true);
    setError(null);

    const formData = new FormData();
    formData.append("user-file", file);
    formData.append("emailId", emailId);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      const response = await uploadFile(formData);

      const markdownResponse = response.data || "No relevant information could be extracted.";
      setExtractedData(markdownResponse);
      setEditedData(JSON.stringify(markdownResponse));
    } catch (err) {
      console.error("Extraction failed:", err);
      setError("Failed to extract information from the file. Please try again.");
    } finally {
      setIsExtracting(false);
    }
  };

  const handleSaveChanges = () => {
    onConfirm(editedData);
    resetModalState();
  };

  const renderContent = () => {
    if (isExtracting) {
      return <CustomLoader text="Extracting Relevant Information..." />;
    }

    if (error) {
      return <p className="text-red-500 text-center">{error}</p>
    }

    if (extractedData) {
      return (
        <div className="space-y-4">
          <DialogDescription>
            Review and edit the extracted information below. Once you're done, click "Save Changes".
          </DialogDescription>
          <Textarea
            value={editedData}
            onChange={(e) => setEditedData(e.target.value)}
            className="min-h-[300px] text-sm max-h-[300px] max-w-[600px]"
            placeholder="Edit the extracted data..."
          />
        </div>
      );
    }

    return (
      <DialogDescription>
        You are about to upload <span className="font-semibold text-primary">{file?.name}</span>.
        Click "Confirm & Extract" to proceed with information extraction.
      </DialogDescription>
    );
  };

  const renderFooter = () => {
    if (isExtracting) {
      return null;
    }

    if (error) {
       return (
         <DialogFooter>
           <DialogClose asChild>
             <Button variant="outline">Close</Button>
           </DialogClose>
         </DialogFooter>
       );
    }

    if (extractedData) {
      return (
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={handleSaveChanges}>Save Changes</Button>
        </DialogFooter>
      );
    }

    return (
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline">Cancel</Button>
        </DialogClose>
        <Button onClick={handleConfirmAndExtract}>Confirm & Extract</Button>
      </DialogFooter>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {extractedData ? "Extracted Information" : "Confirm File Upload"}
          </DialogTitle>
        </DialogHeader>
        <div className="py-4">{renderContent()}</div>
        {renderFooter()}
      </DialogContent>
    </Dialog>
  );
};

export default FileInfoModal;