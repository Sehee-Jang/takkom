"use client";
import browserClient from "@/utils/supabase/client";
import { useUserQuery } from "@/query/useUserQuery";
import { useChildrenQuery } from "@/query/useChildQuery";
import { useEffect, useMemo, useState } from "react";

const useChildrenData = () => {
  const { data: user, isLoading: isUserLoading, isError: isUserError } = useUserQuery(browserClient);
  const userId = user?.id;
  const { data: childrenData, isLoading, error } = useChildrenQuery(browserClient, userId);

  // 정렬된 아이 목록 (생년월일 기준)
  const sortedChildren = useMemo(() => {
    if (!childrenData) return [];
    return [...childrenData].sort((a, b) => new Date(a.birth).getTime() - new Date(b.birth).getTime());
  }, [childrenData]);

  // 선택된 아이의 ID (사용자가 변경 가능)
  const [selectedChildId, setSelectedChildId] = useState<string | null>(null);

  // 아이 목록이 변경될 때, 첫 번째 아이 자동 선택
  useEffect(() => {
    if (sortedChildren.length > 0) {
      setSelectedChildId(sortedChildren[0].id);
    }
  }, [sortedChildren]);

  return {
    children: sortedChildren,
    selectedChildId,
    setSelectedChildId,
    isUserLoading,
    isUserError,
    isLoading,
    error
  };
};

export default useChildrenData;
