"use client";

/**
 * Simulador principal: orquestra estado da simulação, loop de ticks, comparação SCAN vs FIFO
 * e layout (painel de controle, prédio, status, métricas, log de eventos).
 */
import { useState, useEffect, useCallback, useRef } from "react";
import {
  createInitialState,
  simulateTick,
  addCall,
  generateRandomCall,
  type SimulationState,
  type AlgorithmType,
  type SimulationMetrics,
} from "@/lib/elevator-engine";
import { BuildingView } from "./building-view";
import { ControlPanel } from "./control-panel";
import { ElevatorStatus } from "./elevator-status";
import { MetricsDashboard } from "./metrics-dashboard";
import { EventLog } from "./event-log";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GitCompareArrows } from "lucide-react";

const TOTAL_FLOORS = 15;

export function ElevatorSimulator() {
  const [state, setState] = useState<SimulationState>(() =>
    createInitialState(TOTAL_FLOORS, "SCAN")
  );
  const [comparisonMetrics, setComparisonMetrics] =
    useState<SimulationMetrics | null>(null);
  const [showComparison, setShowComparison] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Estado da simulação de comparação (algoritmo oposto), rodando em paralelo
  const comparisonRef = useRef<SimulationState | null>(null);
  const callHistoryRef = useRef<number[]>([]);

  const startSimulation = useCallback(() => {
    setState((prev) => ({ ...prev, isRunning: true }));
  }, []);

  const stopSimulation = useCallback(() => {
    setState((prev) => ({ ...prev, isRunning: false }));
  }, []);

  const toggleRun = useCallback(() => {
    setState((prev) => {
      if (prev.isRunning) {
        return { ...prev, isRunning: false };
      }
      return { ...prev, isRunning: true };
    });
  }, []);

  const handleReset = useCallback(() => {
    setState(createInitialState(TOTAL_FLOORS, state.algorithm));
    comparisonRef.current = null;
    setComparisonMetrics(null);
    callHistoryRef.current = [];
  }, [state.algorithm]);

  const handleAlgorithmChange = useCallback((algo: AlgorithmType) => {
    setState((prev) => {
      const newState = createInitialState(TOTAL_FLOORS, algo);
      comparisonRef.current = null;
      setComparisonMetrics(null);
      callHistoryRef.current = [];
      return newState;
    });
  }, []);

  const handleSpeedChange = useCallback((speed: number) => {
    setState((prev) => ({ ...prev, speed: Math.max(100, speed) }));
  }, []);

  const handleFloorCall = useCallback((floor: number) => {
    setState((prev) => {
      const newState = addCall(prev, floor);
      callHistoryRef.current.push(floor);

      // Replicar a mesma chamada na simulação de comparação, se estiver ativa
      if (comparisonRef.current) {
        comparisonRef.current = addCall(comparisonRef.current, floor);
      }

      return newState;
    });
  }, []);

  const handleRandomBurst = useCallback(() => {
    setState((prev) => {
      let s = prev;
      for (let i = 0; i < 5; i++) {
        const floor = Math.floor(Math.random() * TOTAL_FLOORS);
        s = addCall(s, floor);
        callHistoryRef.current.push(floor);

        if (comparisonRef.current) {
          comparisonRef.current = addCall(comparisonRef.current, floor);
        }
      }
      return s;
    });
  }, []);

  const handleToggleComparison = useCallback(() => {
    setShowComparison((prev) => {
      if (!prev) {
        // Inicia comparação com o algoritmo oposto, reaplica todas as chamadas e avança até o tick atual
        const oppositeAlgo: AlgorithmType =
          state.algorithm === "SCAN" ? "FIFO" : "SCAN";
        let s = createInitialState(TOTAL_FLOORS, oppositeAlgo);
        for (const floor of callHistoryRef.current) {
          s = addCall(s, floor);
        }
        for (let i = 0; i < state.tick; i++) {
          s = simulateTick(s);
        }
        comparisonRef.current = s;
        setComparisonMetrics(s.metrics);
      } else {
        comparisonRef.current = null;
        setComparisonMetrics(null);
      }
      return !prev;
    });
  }, [state.algorithm, state.tick]);

  // Loop principal: a cada state.speed ms executa um tick e atualiza a comparação se ativa
  useEffect(() => {
    if (state.isRunning) {
      intervalRef.current = setInterval(() => {
        setState((prev) => {
          const newState = simulateTick(prev);
          if (comparisonRef.current) {
            comparisonRef.current = simulateTick(comparisonRef.current);
            setComparisonMetrics(comparisonRef.current.metrics);
          }
          return newState;
        });
      }, state.speed);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [state.isRunning, state.speed]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/30">
        <div className="max-w-screen-2xl mx-auto px-4 lg:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded bg-primary/20 border border-primary/30 flex items-center justify-center">
              <span className="font-mono text-xs font-black text-primary">
                SE
              </span>
            </div>
            <div>
              <h1 className="text-sm font-mono font-bold text-foreground tracking-tight">
                Smart Elevator System
              </h1>
              <p className="text-[10px] font-mono text-muted-foreground">
                Simulacao de Escalonamento de Trafego Vertical
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge
              variant="outline"
              className="font-mono text-[10px] border-primary/30 text-primary"
            >
              {state.elevators.length} Elevadores
            </Badge>
            <Badge
              variant="outline"
              className="font-mono text-[10px] border-border/50"
            >
              {TOTAL_FLOORS} Andares
            </Badge>
            <Button
              size="sm"
              variant="outline"
              onClick={handleToggleComparison}
              className={
                showComparison
                  ? "border-accent/50 text-accent bg-accent/10"
                  : "border-border/50"
              }
            >
              <GitCompareArrows className="h-3.5 w-3.5 mr-1.5" />
              <span className="text-xs">
                {showComparison ? "Comparando" : "Comparar"}
              </span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="max-w-screen-2xl mx-auto px-4 lg:px-6 py-4">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Left sidebar - Controls */}
          <aside className="lg:w-64 shrink-0">
            <Card className="border-border/50 bg-card/50">
              <CardContent className="p-4">
                <ControlPanel
                  isRunning={state.isRunning}
                  algorithm={state.algorithm}
                  speed={state.speed}
                  tick={state.tick}
                  onToggleRun={toggleRun}
                  onReset={handleReset}
                  onAlgorithmChange={handleAlgorithmChange}
                  onSpeedChange={handleSpeedChange}
                  onRandomBurst={handleRandomBurst}
                  onFloorCall={handleFloorCall}
                  totalFloors={TOTAL_FLOORS}
                />
              </CardContent>
            </Card>
          </aside>

          {/* Center - Building visualization */}
          <main className="flex-1 min-w-0">
            <Card className="border-border/50 bg-card/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-xs font-mono font-semibold text-muted-foreground uppercase tracking-wider">
                    Edificio - Corte Transversal
                  </h2>
                  <span className="text-[10px] font-mono text-muted-foreground">
                    Clique em um andar para chamar
                  </span>
                </div>
                <BuildingView
                  elevators={state.elevators}
                  totalFloors={state.totalFloors}
                  pendingCalls={state.pendingCalls}
                  onFloorClick={handleFloorCall}
                />
              </CardContent>
            </Card>
          </main>

          {/* Right sidebar - Status & Metrics */}
          <aside className="lg:w-80 shrink-0 flex flex-col gap-4">
            <Card className="border-border/50 bg-card/50">
              <CardContent className="p-4">
                <ElevatorStatus elevators={state.elevators} />
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/50">
              <CardContent className="p-4">
                <MetricsDashboard
                  metrics={state.metrics}
                  comparisonMetrics={showComparison ? comparisonMetrics : null}
                />
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/50">
              <CardContent className="p-4">
                <EventLog
                  pendingCalls={state.pendingCalls}
                  servedCalls={state.servedCalls}
                  tick={state.tick}
                />
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </div>
  );
}
