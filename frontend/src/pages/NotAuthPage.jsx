import { useNavigate } from "react-router-dom";

export const NotAuthPage = () => {
  const navigate = useNavigate();
  return (
    <main className="pt-100px text-[#FFFDFD] h-screen container mx-auto relative">
      <div className="absolute left-1/2 top-[45%] translate-y-[-50%] translate-x-[-50%] z-20 flex flex-col items-center">
        <h1 className="text-[100px] md:text-[300px] font-medium">403</h1>
        <p className="text-sm md:text-[20px] md:leading-[30px] leading-[21px] -mt-10 md:-mt-20 text-center md:text-left">
          Вы не авторизованы. Чтобы вернуться на главную страницу, нажмите кнопку "Вернуться".
        </p>
        <button
          onClick={() => navigate('/')}
          className="py-[18px] px-[36px] rounded-[30px] border border-[#FFFDFD] text-base mt-6 md:mt-12 flex items-center gap-2"
        >
          Вернуться
        </button>
      </div>
    </main>
  );
};