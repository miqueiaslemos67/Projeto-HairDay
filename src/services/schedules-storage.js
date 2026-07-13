import { apiConfig } from "./api-config.js";

const STORAGE_KEY = "hairday:schedules";

function getStoredSchedules() {
  const storedSchedules = localStorage.getItem(STORAGE_KEY);

  return storedSchedules ? JSON.parse(storedSchedules) : [];
}

function saveStoredSchedules(schedules) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(schedules));
}

async function ensureStaticSchedules() {
  if (!apiConfig.usesStaticStorage || localStorage.getItem(STORAGE_KEY)) {
    return;
  }

  const response = await fetch(apiConfig.staticDataUrl);

  if (!response.ok) {
    throw new Error(`Falha ao carregar agenda inicial: ${response.status}`);
  }

  const data = await response.json();
  saveStoredSchedules(data.schedules ?? []);
}

export async function listSchedules() {
  if (!apiConfig.usesStaticStorage) {
    const response = await fetch(`${apiConfig.baseUrl}/schedules`);

    if (!response.ok) {
      throw new Error(`Falha ao buscar agendamentos: ${response.status}`);
    }

    return response.json();
  }

  await ensureStaticSchedules();
  return getStoredSchedules();
}

export async function createSchedule(schedule) {
  if (!apiConfig.usesStaticStorage) {
    const response = await fetch(`${apiConfig.baseUrl}/schedules`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(schedule),
    });

    if (!response.ok) {
      throw new Error(`Falha ao criar agendamento: ${response.status}`);
    }

    return;
  }

  await ensureStaticSchedules();

  const schedules = getStoredSchedules();
  schedules.push(schedule);
  saveStoredSchedules(schedules);
}

export async function removeScheduleById(id) {
  if (!apiConfig.usesStaticStorage) {
    const response = await fetch(`${apiConfig.baseUrl}/schedules/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Falha ao cancelar agendamento: ${response.status}`);
    }

    return;
  }

  await ensureStaticSchedules();

  const schedules = getStoredSchedules().filter(
    (schedule) => String(schedule.id) !== String(id),
  );

  saveStoredSchedules(schedules);
}
