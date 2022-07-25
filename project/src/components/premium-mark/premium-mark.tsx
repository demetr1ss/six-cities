type PremiumMarkType = {
  premiumCardClassName: string;
}

export default function PremiumMark({premiumCardClassName}: PremiumMarkType): JSX.Element {
  return (
    <div className={premiumCardClassName}>
      <span>Premium</span>
    </div>
  );
}
