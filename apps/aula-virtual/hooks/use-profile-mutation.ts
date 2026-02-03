"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateProfileAction } from "@/actions/profile-actions"
import { profileKeys } from "./use-profile-query"
import { toast } from "react-toastify"

interface UpdateProfileData {
  full_name: string | null
  avatar_url: string | null
}

export function useProfileMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      profileId,
      data,
    }: {
      profileId: string
      data: UpdateProfileData
    }) => {
      const result = await updateProfileAction(profileId, data)
      if (result.error) {
        throw new Error(result.error)
      }
      return result
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: profileKeys.current() })
      queryClient.invalidateQueries({ queryKey: profileKeys.all })
      
      toast.success("Perfil actualizado correctamente", {
        position: "top-right",
        autoClose: 3000,
      })
    },
    onError: (error: Error) => {
      toast.error(error.message || "Error al actualizar el perfil", {
        position: "top-right",
        autoClose: 5000,
      })
    },
  })
}
