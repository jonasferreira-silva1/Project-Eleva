// ============================================================
// Motor da simulação - Smart Elevator System
// Implementa escalonamento SCAN (Elevator Algorithm) e FIFO,
// múltiplos elevadores e métricas em tempo real.
// ============================================================

export type Direction = "UP" | "DOWN" | "IDLE";
export type AlgorithmType = "SCAN" | "FIFO";

/** Chamada de andar: id, andar, tick em que foi criada e, se já atendida, tick de atendimento e elevador */
export interface FloorCall {
  id: string;
  floor: number;
  timestamp: number;
  servedAt?: number;
  assignedElevator?: string;
}

/** Estado de um elevador: posição, direção, fila de destinos, portas, métricas de uso */
export interface Elevator {
  id: string;
  name: string;
  currentFloor: number;
  direction: Direction;
  destinations: number[];
  doorsOpen: boolean;
  color: string;
  totalFloorsTraveled: number;
  totalPassengersServed: number;
  currentLoad: number;
  maxLoad: number;
}

/** Métricas agregadas da simulação (atendidos, pendentes, espera média, throughput, etc.) */
export interface SimulationMetrics {
  totalCallsServed: number;
  totalCallsPending: number;
  averageWaitTime: number;
  totalFloorsAllElevators: number;
  throughput: number; // chamadas atendidas por 60 ticks
  waitTimes: number[];
  algorithmType: AlgorithmType;
}

/** Estado completo: elevadores, chamadas pendentes/atendidas, métricas, tick, algoritmo e velocidade (ms por tick) */
export interface SimulationState {
  elevators: Elevator[];
  pendingCalls: FloorCall[];
  servedCalls: FloorCall[];
  metrics: SimulationMetrics;
  totalFloors: number;
  tick: number;
  isRunning: boolean;
  algorithm: AlgorithmType;
  speed: number; // ms por tick
}

/** Cria um elevador com estado inicial (sem destinos, parado, portas fechadas) */
export function createElevator(
  id: string,
  name: string,
  startFloor: number,
  color: string
): Elevator {
  return {
    id,
    name,
    currentFloor: startFloor,
    direction: "IDLE",
    destinations: [],
    doorsOpen: false,
    color,
    totalFloorsTraveled: 0,
    totalPassengersServed: 0,
    currentLoad: 0,
    maxLoad: 8,
  };
}

/** Estado inicial: 3 elevadores (térreo, meio, topo), sem chamadas, tick 0, velocidade 500 ms */
export function createInitialState(
  totalFloors: number,
  algorithm: AlgorithmType
): SimulationState {
  return {
    elevators: [
      createElevator("A", "Elevador A", 0, "elevator-a"),
      createElevator(
        "B",
        "Elevador B",
        Math.floor(totalFloors / 2),
        "elevator-b"
      ),
      createElevator("C", "Elevador C", totalFloors - 1, "elevator-c"),
    ],
    pendingCalls: [],
    servedCalls: [],
    metrics: {
      totalCallsServed: 0,
      totalCallsPending: 0,
      averageWaitTime: 0,
      totalFloorsAllElevators: 0,
      throughput: 0,
      waitTimes: [],
      algorithmType: algorithm,
    },
    totalFloors,
    tick: 0,
    isRunning: false,
    algorithm,
    speed: 500,
  };
}

// ============================================================
// Algoritmo SCAN (Elevator Algorithm)
// O elevador segue em uma direção, atende todas as chamadas no
// caminho e inverte no fim. Mesma ideia do braço de disco.
// ============================================================
function assignCallSCAN(call: FloorCall, elevators: Elevator[]): string {
  let bestElevator = elevators[0];
  let bestScore = Infinity;

  for (const elevator of elevators) {
    const distance = Math.abs(elevator.currentFloor - call.floor);

    // Preferir elevador que já está indo na direção da chamada
    const isMovingToward =
      (elevator.direction === "UP" && call.floor >= elevator.currentFloor) ||
      (elevator.direction === "DOWN" && call.floor <= elevator.currentFloor) ||
      elevator.direction === "IDLE";

    // Score: distância + penalidade se estiver indo na direção oposta + penalidade por fila cheia
    const directionPenalty = isMovingToward ? 0 : 20;
    const loadPenalty = elevator.destinations.length * 2;
    const score = distance + directionPenalty + loadPenalty;

    if (score < bestScore) {
      bestScore = score;
      bestElevator = elevator;
    }
  }

  return bestElevator.id;
}

// ============================================================
// Algoritmo FIFO (First In, First Out)
// Chamadas distribuídas em round-robin entre elevadores;
// sem otimização de rota.
// ============================================================
let fifoCounter = 0;
function assignCallFIFO(_call: FloorCall, elevators: Elevator[]): string {
  const elevator = elevators[fifoCounter % elevators.length];
  fifoCounter++;
  return elevator.id;
}

/** Ordena destinos no estilo SCAN: primeiro os andares no sentido atual, depois os do sentido oposto */
function getSortedDestinationsSCAN(
  elevator: Elevator,
  totalFloors: number
): number[] {
  if (elevator.destinations.length === 0) return [];

  const current = elevator.currentFloor;
  const dests = [...elevator.destinations];

  if (elevator.direction === "UP" || elevator.direction === "IDLE") {
    const above = dests.filter((d) => d >= current).sort((a, b) => a - b);
    const below = dests.filter((d) => d < current).sort((a, b) => b - a);
    return [...above, ...below];
  } else {
    const below = dests.filter((d) => d <= current).sort((a, b) => b - a);
    const above = dests.filter((d) => d > current).sort((a, b) => a - b);
    return [...below, ...above];
  }
}

/** Próximo andar de destino conforme o algoritmo (SCAN ordenado, FIFO ordem da fila) */
function getNextDestination(
  elevator: Elevator,
  algorithm: AlgorithmType,
  totalFloors: number
): number | null {
  if (elevator.destinations.length === 0) return null;

  if (algorithm === "SCAN") {
    const sorted = getSortedDestinationsSCAN(elevator, totalFloors);
    return sorted[0] ?? null;
  }

  return elevator.destinations[0] ?? null;
}

/** Adiciona uma chamada no andar e atribui ao elevador escolhido pelo algoritmo atual */
export function addCall(
  state: SimulationState,
  floor: number
): SimulationState {
  if (floor < 0 || floor >= state.totalFloors) return state;

  const call: FloorCall = {
    id: `call-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    floor,
    timestamp: state.tick,
  };

  const assignFn = state.algorithm === "SCAN" ? assignCallSCAN : assignCallFIFO;
  const elevatorId = assignFn(call, state.elevators);

  call.assignedElevator = elevatorId;

  const newElevators = state.elevators.map((e) => {
    if (e.id === elevatorId) {
      const newDests = [...e.destinations];
      if (!newDests.includes(floor)) {
        newDests.push(floor);
      }
      return { ...e, destinations: newDests };
    }
    return e;
  });

  return {
    ...state,
    elevators: newElevators,
    pendingCalls: [...state.pendingCalls, call],
    metrics: {
      ...state.metrics,
      totalCallsPending: state.metrics.totalCallsPending + 1,
    },
  };
}

/** Executa um tick: move elevadores 1 andar, abre portas no destino, atualiza chamadas e métricas */
export function simulateTick(state: SimulationState): SimulationState {
  const newTick = state.tick + 1;
  let newPendingCalls = [...state.pendingCalls];
  let newServedCalls = [...state.servedCalls];
  let newWaitTimes = [...state.metrics.waitTimes];
  let totalServed = state.metrics.totalCallsServed;
  let totalFloors = state.metrics.totalFloorsAllElevators;

  const newElevators = state.elevators.map((elevator) => {
    const e = { ...elevator, doorsOpen: false };

    if (e.destinations.length === 0) {
      e.direction = "IDLE";
      return e;
    }

    const target = getNextDestination(e, state.algorithm, state.totalFloors);
    if (target === null) {
      e.direction = "IDLE";
      return e;
    }

    // Chegou no andar de destino: abre portas, remove da fila, marca chamadas atendidas
    if (e.currentFloor === target) {
      e.doorsOpen = true;
      e.destinations = e.destinations.filter((d) => d !== target);
      e.totalPassengersServed += 1;

      // Mark served calls
      const served = newPendingCalls.filter(
        (c) => c.floor === target && c.assignedElevator === e.id
      );
      for (const call of served) {
        call.servedAt = newTick;
        const waitTime = newTick - call.timestamp;
        newWaitTimes.push(waitTime);
        totalServed++;
        newServedCalls.push(call);
      }
      newPendingCalls = newPendingCalls.filter(
        (c) => !(c.floor === target && c.assignedElevator === e.id)
      );

      // Define direção para o próximo destino
      if (e.destinations.length > 0) {
        const nextTarget = getNextDestination(
          e,
          state.algorithm,
          state.totalFloors
        );
        if (nextTarget !== null) {
          e.direction = nextTarget > e.currentFloor ? "UP" : "DOWN";
        }
      } else {
        e.direction = "IDLE";
      }
    } else {
      // Move 1 andar em direção ao destino
      if (target > e.currentFloor) {
        e.currentFloor += 1;
        e.direction = "UP";
      } else {
        e.currentFloor -= 1;
        e.direction = "DOWN";
      }
      e.totalFloorsTraveled += 1;
      totalFloors += 1;
    }

    return e;
  });

  const avgWait =
    newWaitTimes.length > 0
      ? newWaitTimes.reduce((a, b) => a + b, 0) / newWaitTimes.length
      : 0;

  const throughput = newTick > 0 ? (totalServed / newTick) * 60 : 0; // chamadas por 60 ticks

  return {
    ...state,
    elevators: newElevators,
    pendingCalls: newPendingCalls,
    servedCalls: newServedCalls,
    tick: newTick,
    metrics: {
      totalCallsServed: totalServed,
      totalCallsPending: newPendingCalls.length,
      averageWaitTime: avgWait,
      totalFloorsAllElevators: totalFloors,
      throughput,
      waitTimes: newWaitTimes,
      algorithmType: state.algorithm,
    },
  };
}

/** Gera uma chamada em andar aleatório (útil para testes e rajadas) */
export function generateRandomCall(state: SimulationState): SimulationState {
  const floor = Math.floor(Math.random() * state.totalFloors);
  return addCall(state, floor);
}
