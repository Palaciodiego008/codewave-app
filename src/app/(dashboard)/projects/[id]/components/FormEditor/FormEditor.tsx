import { Editor } from "@monaco-editor/react";
import { FileUpload } from "../inputs/FileUpload";
import { Button, Stack, Typography } from "@mui/material";
import { useUpdateProject } from "../../../hooks/useUpdateProject";
import { ProjectDto } from "../../../services/dto/Project.dto";
import { isEmpty } from 'lodash';
import toast from "react-hot-toast";
import { useEffect, useRef, useState } from "react";

// Define the mapping of file extensions to programming languages
const extensionToLanguage: { [key: string]: string } = {
  js: 'Javascript',
  jsx: 'Javascript',
  ts: 'Typescript',
  tsx: 'Typescript',
  py: 'Python',
  java: 'Java',
  rb: 'Ruby',
  go: 'Go',
  cs: 'C#',
  cpp: 'C++',
  php: 'PHP',
  swift: 'Swift',
  kt: 'Kotlin',
  rs: 'Rust',
};

interface FormEditorProps {
  project: ProjectDto;
}

export const FormEditor = ({ project }: FormEditorProps) => {
  const { updateProject } = useUpdateProject();
  const [code, setCode] = useState<string>('');
  const editorRef = useRef<any>(null);

  const handleEditorDidMount = (editor: any, monaco: any) => {
    editorRef.current = editor;
  }

  const readContentFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (editorRef.current) {
        const result = e.target?.result as string;
        const fileExtension = file.name.split('.').pop()?.toLowerCase() || '';
        const allowedLanguages = project.languages.map(lang => lang.toLowerCase());
        const fileLanguage = extensionToLanguage[fileExtension].toLowerCase() || '';

        if (allowedLanguages.includes(fileLanguage)) {
          editorRef.current.setValue(result);

          updateProject(project.id as string, {
            ...project,
            snapshot_code: result
          });

          toast.success('Code uploaded successfully');
        } else {
          toast.error(`The uploaded file's language is not allowed. Allowed languages: ${allowedLanguages.join(', ')}`);
        }
      }
    }

    reader.readAsText(file);
  }

  const handleFileChange = (file: File) => {
    readContentFile(file);
  }

  const handleChangeEditor = (value: string) => {
    setCode(value);

    updateProject(project.id as string, {
      ...project,
      snapshot_code: value
    })
  }

  const saveCodeToProject = () => {
    updateProject(project.id as string, {
      ...project,
      snapshot_code: code
    })

    toast.success('Code saved successfully');
  }

  useEffect(() => {
    if (!isEmpty(project)) {
      setTimeout(() => {
        if (editorRef.current) {
          editorRef.current.setValue(project?.snapshot_code);
        }
      }, 1000);
    }
  }, [project]);

  return (
    <>
      <Typography variant="h5" marginBottom={2}>Code Editor</Typography>
      <Stack
        direction="row"
        spacing={2}
        marginBottom={4}
      >
        <FileUpload onChange={handleFileChange} />
        <Button variant="contained" color='primary' onClick={saveCodeToProject}>Save</Button>
      </Stack>
      <Editor
        height="90vh"
        defaultLanguage={project?.languages?.[0] || 'javascript'} // Default language if none specified
        defaultValue="// Write your code here"
        theme="vs-dark"
        onMount={handleEditorDidMount}
        onChange={(value) => {
          if (value) {
            handleChangeEditor(value)
          }
        }}
      />
    </>
  )
}
