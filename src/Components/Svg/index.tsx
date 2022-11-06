interface Props {
  width: number;
  height: number;
  src: string;
  className?: string;
}

const Svg = ({ width, height, src, className }: Props) => {
  return (
    <svg width={width} height={height} className={className}>
      <image href={src} />
    </svg>
  );
};

export default Svg;
