import { useMutation, useQueryClient } from "@tanstack/react-query";
import browserClient from "@/utils/supabase/client";

export const useDeleteChildMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (childId: string) => {
      const { error } = await browserClient.from("child").delete().eq("id", childId);
      if (error) {
        throw new Error("아이 삭제 실패");
      }
    },
    onSuccess: (_, childId) => {
      queryClient.invalidateQueries({ queryKey: ["child_info"] });
      console.log(`아이 ${childId} 삭제 성공`);
    },
    onError: (error) => {
      console.error("아이 삭제 중 오류 발생:", error);
    }
  });
};
