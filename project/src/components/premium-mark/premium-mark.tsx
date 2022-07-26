type PremiumMarkType = {
  premiumCardClassName: string;
}

export default function PremiumMark({premiumCardClassName}: PremiumMarkType): JSX.Element {
  return (
    <div className={`${premiumCardClassName}__mark`}>
      <span>Premium</span>
    </div>
  );
}
