import { Editor, Monaco } from "@monaco-editor/react"
import { FileUpload } from "../inputs/FileUpload"
import { useRef, useState } from "react";
import { Button, Stack, Typography } from "@mui/material";
import editor from 'monaco-editor';

export const FormEditor = () => {
  const [file, setFile] = useState<File | null>(null);
  const editorRef = useRef<any>(null);

  const handleEditorDidMount = (editor: any, monaco: any) => {
    editorRef.current = editor;
  }

  const handleFileChange = (file: File) => {
    setFile(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      if (editorRef.current) {
        editorRef.current.setValue(e.target?.result as string);
      }
    }

    reader.readAsText(file);
  }

  const handleShowValue = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getValue());
    }
  }

  return (
    <>
      <Typography variant="h5" marginBottom={2}>Code Editor</Typography>
      <Stack
        direction="row"
        spacing={2}
        marginBottom={4}
      >
        <FileUpload onChange={handleFileChange} />
        <Button
          variant="contained"
          color="primary"
          onClick={handleShowValue}
        >Show Value</Button>
      </Stack>
      <Editor
        height="90vh"
        defaultLanguage="javascript"
        defaultValue="// some comment"
        theme="vs-dark"
        onMount={handleEditorDidMount}
      />
    </>
  )
}
