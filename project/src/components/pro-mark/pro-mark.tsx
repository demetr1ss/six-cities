type ProMarkType = {
  proMarkClassName: string;
}

export default function ProMark ({proMarkClassName}: ProMarkType): JSX.Element {
  return (
    <span className={proMarkClassName}>
        Pro
    </span>
  );
}
