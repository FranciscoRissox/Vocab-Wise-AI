interface Props {
    text: string;
}

export const LimitNotice = ({text}: Props) => {
  return (
    <div className="w-full bg-yellow-400 text-black py-2 px-4 animate-pulse shadow-md text-center font-semibold">
      {text}
    </div>
  );
};
