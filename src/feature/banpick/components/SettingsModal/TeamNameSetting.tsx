import { BanPickSettings } from '@/types/Settings';

interface TeamNameSettingProps {
  teamName: BanPickSettings['teamName'];
  onChange: (team: 'blue' | 'red', name: string) => void;
}

export default function TeamNameSetting({ teamName, onChange }: TeamNameSettingProps) {
  const handleChangeTeamName = (team: 'blue' | 'red', name: string) => {
    onChange(team, name);
  }

  return (
    <section>
      <h3>팀 이름 설정</h3>
      <div>
        <label htmlFor="blue-team-name">블루팀 이름</label>
        <input
          type="text"
          id="blue-team-name"
          value={teamName.blue}
          onChange={(e) => handleChangeTeamName('blue', e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="red-team-name">레드팀 이름</label>
        <input
          type="text"
          id="red-team-name"
          value={teamName.red}
          onChange={(e) => handleChangeTeamName('red', e.target.value)}
        />
      </div>
    </section>
  )
}
