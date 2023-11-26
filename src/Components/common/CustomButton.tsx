type CustomButtonProps = {
  buttonText: string;
  handleClick: () => void;
  type?: "button" | "submit" | "reset" | undefined;
  className: string;
};

export const CustomButton = ({
  buttonText,
  handleClick,
  type,
  className,
}: CustomButtonProps) => {
  return (
    <button onClick={handleClick} className={className} type={type}>
      {buttonText}
    </button>
  );
};
