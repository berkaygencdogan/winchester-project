export function calculateStandings(fixtures) {
  const table = {};

  for (const m of fixtures) {
    if (m.fixture.status.short !== "FT") continue;

    const home = m.teams.home;
    const away = m.teams.away;

    if (!table[home.id]) table[home.id] = createTeam(home);
    if (!table[away.id]) table[away.id] = createTeam(away);

    const hg = m.goals.home;
    const ag = m.goals.away;

    update(table[home.id], hg, ag);
    update(table[away.id], ag, hg);

    table[home.id].played++;
    table[away.id].played++;

    if (hg > ag) {
      table[home.id].points += 3;
      table[home.id].win++;
      table[away.id].lose++;
    } else if (hg < ag) {
      table[away.id].points += 3;
      table[away.id].win++;
      table[home.id].lose++;
    } else {
      table[home.id].points++;
      table[away.id].points++;
      table[home.id].draw++;
      table[away.id].draw++;
    }
  }

  return Object.values(table)
    .sort(sortTable)
    .map((t, i) => ({ rank: i + 1, ...t }));
}

function createTeam(team) {
  return {
    team: { id: team.id, name: team.name, logo: team.logo },
    played: 0,
    win: 0,
    draw: 0,
    lose: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    goalsDiff: 0,
    points: 0,
  };
}

function update(t, scored, conceded) {
  t.goalsFor += scored;
  t.goalsAgainst += conceded;
  t.goalsDiff = t.goalsFor - t.goalsAgainst;
}

function sortTable(a, b) {
  if (b.points !== a.points) return b.points - a.points;
  if (b.goalsDiff !== a.goalsDiff) return b.goalsDiff - a.goalsDiff;
  return b.goalsFor - a.goalsFor;
}
