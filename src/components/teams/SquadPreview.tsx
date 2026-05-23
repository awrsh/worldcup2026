interface SquadPreviewProps {
  players: string[];
}

export function SquadPreview({ players }: SquadPreviewProps) {
  return (
    <ul className="grid grid-cols-2 gap-2">
      {players.map((player) => (
        <li
          key={player}
          className="rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-700"
        >
          {player}
        </li>
      ))}
    </ul>
  );
}
