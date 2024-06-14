import React, { useState, type ComponentProps } from "react";

type Props = ComponentProps<"button"> & {
  pendingText?: string;
};

export function SubmitButton({ children, pendingText, ...props }: Props) {
  const [isPending, setIsPending] = useState(false);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setIsPending(true);
    if (props.onClick) {
      props.onClick(event);
    }
    // Allow form submission to proceed naturally
  };

  return (
    <button {...props} type="submit" disabled={isPending} onClick={handleClick}>
      {isPending ? pendingText : children}
    </button>
  );
}
