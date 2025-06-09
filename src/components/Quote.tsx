interface Props {
  text: string;
  title: string;
  className?: string;
}

export const Quote = ({ text, title, className }: Props) => {

  return (
    <div className={className}>
      <p className="text-lg font-medium text-gray-800">{title}</p>
      <p className="text-gray-600 italic border-l-4 border-blue-500 pl-4 mt-2">{text}</p>
    </div>
  );
};
