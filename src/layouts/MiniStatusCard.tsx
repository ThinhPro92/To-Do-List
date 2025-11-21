interface MiniStatusCardProps {
  label: string;
  value: number;
  color: string;
}

const MiniStatusCard = ({ label, value, color }: MiniStatusCardProps) => {
  return (
    <div className="bg-gray-50 rounded-xl p-4 text-center">
      <p className={`text-3xl font-bold ${color}`}>{value}</p>
      <p className="text-sm text-gray-600 mt-1">{label}</p>
    </div>
  );
};

export default MiniStatusCard;
