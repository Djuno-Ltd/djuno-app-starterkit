import React from "react";

export type LoadingProps = {
  color?: string;
  borderColor?: string;
  size?: number;
  borderSize?: number;
} & React.HTMLAttributes<HTMLDivElement>;

function Loading({
  color,
  borderColor,
  size,
  borderSize,
  ...props
}: LoadingProps) {
  return (
    <div className="flex w-full h-full justify-center items-center" {...props}>
      <LoadingSpin
        color={color}
        borderColor={borderColor}
        size={size}
        borderSize={borderSize}
      />
    </div>
  );
}

export const LoadingSpin = ({
  size,
  borderSize,
  borderColor,
  color,
}: LoadingProps) => {
  return (
    <div
      style={{
        ...(size ? { width: size, height: size } : { width: 24, height: 24 }),
        ...(borderSize && { borderWidth: borderSize }),
        ...(borderColor && { borderColor: borderColor }),
        ...(color && { borderTopColor: color }),
      }}
      className="rounded-full loading-spin border-[0.25rem] border-sky-100 border-t-sky-500"
    />
  );
};
export default Loading;
