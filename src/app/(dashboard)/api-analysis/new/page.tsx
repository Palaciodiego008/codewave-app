'use client';

import { Box } from "@mui/material";
import FormOpenApi from "../components/FormOpenApi";
import { useEffect, useState } from "react";
import { OpenApiDto } from "../services/dto/OpenApi.dto";
import { useAuthContext } from "@/context/AuthContext/auth.context";
import { useCreateOpenApi } from "../hooks/useCreateOpenApi";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function NewOpenApi() {
  const { user } = useAuthContext();
  const router = useRouter();
  const { createOpenApi } = useCreateOpenApi();
  const [openApi, setOpenApi] = useState<OpenApiDto>({
    id: 0,
    name: '',
    description: '',
    version: '',
    format: '',
    user_id: 0,
    openapi: '',
  });

  useEffect(() => {
    if (user?.id) {
      setOpenApi((prev) => ({
        ...prev,
        user_id: Number(user.id),
      }));
    }
  }, [user]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('openApi:', openApi);

    createOpenApi(openApi)
      .then(() => {
        toast.success('OpenAPI created successfully');
        console.log('OpenAPI created successfully');
        router.push('/api-analysis'); // Redirect to the list of OpenAPIs
      })
      .catch(() => {
        toast.error('Error creating OpenAPI');
      });
  };

  return (
    <Box>
      <FormOpenApi
        title="New OpenAPI"
        openApi={openApi}
        setOpenApi={setOpenApi}
        action={handleSubmit}
      />
    </Box>
  );
}
