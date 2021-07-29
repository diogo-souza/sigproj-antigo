export const cargaHoraria = (values) => {
  let ch = 0;
  let h = 0;
  let m = 0;
  values.atividades.forEach((atividade) => {
    // Verificar se todas as atividades finalizaem no dia de início
    const horaInicio = new Date(
      0,
      0,
      0,
      atividade.hora_inicio.slice(0, 2),
      atividade.hora_inicio.slice(4, 6),
      0,
    );
    const horaFim = new Date(
      0,
      0,
      0,
      atividade.hora_fim.slice(0, 2),
      atividade.hora_fim.slice(4, 6),
      0,
    );
    let diffMs = horaFim - horaInicio;
    let diffHrs = Math.floor((diffMs % 86400000) / 3600000);
    let diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);
    // console.log(diffMins)
    h += diffHrs;
    if (m + diffMins >= 60) {
      h += 1;
      m = diffMins - 60;
    } else {
      m += diffMins;
    }
  });
  ch = `${h}h ${m}m`;
  return ch;
};
