type Props = {
  children: React.ReactNode;
};

const BottomSheet = ({ children }: Props) => {
  return (
    <div className="bg-white w-full fixed bottom-0 top-[40%] overflow-hidden shadow-xl border-t-2 border-t-slate-200">
      {children}
    </div>
  );
};

export default BottomSheet;
