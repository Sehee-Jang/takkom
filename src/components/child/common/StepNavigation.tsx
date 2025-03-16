import { useRouter } from "next/navigation";
import Image from "next/image";
import PreIcon from "@public/icon/preIcon.svg";

interface StepNavigationProps {
  title: string;
  onBack?: () => void;
}

const StepNavigation = ({ title, onBack }: StepNavigationProps) => {
  const router = useRouter();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  return (
    <div className="w-full px-6 py-2 flex items-center gap-6 mb-4 sm:hidden">
      <div className="relative">
        {/* 이전 버튼 */}
        <button onClick={() => router.back()}>
          <Image src={PreIcon} alt="이전" />
        </button>
      </div>
      <div className="flex-1 text-center" style={{ transform: "translateX(-24px)" }}>
        <p className="text-base font-bold text-[#303030]">아이 등록하기</p>
      </div>
    </div>
  );
};

export default StepNavigation;
