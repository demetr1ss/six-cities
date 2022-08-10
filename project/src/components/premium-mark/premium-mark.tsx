type PremiumMarkPropsType = {
  premiumCardClassName: string;
}

export default function PremiumMark({premiumCardClassName}: PremiumMarkPropsType): JSX.Element {
  return (
    <div className={`${premiumCardClassName}__mark`}>
      <span>Premium</span>
    </div>
  );
}
