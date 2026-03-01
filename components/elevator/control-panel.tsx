"use client";

/**
 * Painel de controle: Play/Pause, Reset, seleção de algoritmo (SCAN/FIFO),
 * slider de velocidade, botões de chamada aleatória e rajada, e botões por andar.
 */
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import type { AlgorithmType } from "@/lib/elevator-engine";
import { Play, Pause, RotateCcw, Zap, Shuffle } from "lucide-react";

interface ControlPanelProps {
  isRunning: boolean;
  algorithm: AlgorithmType;
  speed: number;
  tick: number;
  onToggleRun: () => void;
  onReset: () => void;
  onAlgorithmChange: (algo: AlgorithmType) => void;
  onSpeedChange: (speed: number) => void;
  onRandomBurst: () => void;
  onFloorCall: (floor: number) => void;
  totalFloors: number;
}

export function ControlPanel({
  isRunning,
  algorithm,
  speed,
  tick,
  onToggleRun,
  onReset,
  onAlgorithmChange,
  onSpeedChange,
  onRandomBurst,
  onFloorCall,
  totalFloors,
}: ControlPanelProps) {
  return (
    <div className="flex flex-col gap-5">
      {/* Simulation controls */}
      <div className="flex flex-col gap-3">
        <h3 className="text-xs font-mono font-semibold text-muted-foreground uppercase tracking-wider">
          Controles
        </h3>
        <div className="flex items-center gap-2">
          <Button
            onClick={onToggleRun}
            size="sm"
            className={
              isRunning
                ? "bg-accent/20 text-accent hover:bg-accent/30 border border-accent/30"
                : "bg-primary/20 text-primary hover:bg-primary/30 border border-primary/30"
            }
          >
            {isRunning ? (
              <>
                <Pause className="h-3.5 w-3.5 mr-1.5" />
                Pausar
              </>
            ) : (
              <>
                <Play className="h-3.5 w-3.5 mr-1.5" />
                Iniciar
              </>
            )}
          </Button>
          <Button
            onClick={onReset}
            size="sm"
            variant="outline"
            className="border-border/50"
          >
            <RotateCcw className="h-3.5 w-3.5 mr-1.5" />
            Reset
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className="font-mono text-[10px] border-border/50"
          >
            TICK {String(tick).padStart(4, "0")}
          </Badge>
        </div>
      </div>

      {/* Algorithm selection */}
      <div className="flex flex-col gap-2">
        <h3 className="text-xs font-mono font-semibold text-muted-foreground uppercase tracking-wider">
          Algoritmo
        </h3>
        <Select
          value={algorithm}
          onValueChange={(v) => onAlgorithmChange(v as AlgorithmType)}
        >
          <SelectTrigger className="h-8 text-xs font-mono bg-secondary/30 border-border/50">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="SCAN">SCAN (Elevator Algorithm)</SelectItem>
            <SelectItem value="FIFO">FIFO (First In, First Out)</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-[10px] text-muted-foreground leading-relaxed">
          {algorithm === "SCAN"
            ? "O elevador percorre em uma direcao, atendendo todas as chamadas no caminho, e inverte ao final. Minimiza deslocamento total."
            : "As chamadas sao atendidas na ordem de chegada, distribuidas round-robin entre os elevadores. Sem otimizacao de rota."}
        </p>
      </div>

      {/* Speed control */}
      <div className="flex flex-col gap-2">
        <h3 className="text-xs font-mono font-semibold text-muted-foreground uppercase tracking-wider">
          Velocidade
        </h3>
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono text-muted-foreground">
            Lento
          </span>
          <Slider
            value={[1000 - speed]}
            onValueChange={([v]) => onSpeedChange(1000 - v)}
            min={0}
            max={900}
            step={100}
            className="flex-1"
          />
          <span className="text-[10px] font-mono text-muted-foreground">
            Rapido
          </span>
        </div>
        <span className="text-[10px] font-mono text-muted-foreground">
          {speed}ms / tick
        </span>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3">
        <h3 className="text-xs font-mono font-semibold text-muted-foreground uppercase tracking-wider">
          Gerar Chamadas
        </h3>
        <Button
          onClick={onRandomBurst}
          size="sm"
          variant="outline"
          className="border-accent/30 text-accent hover:bg-accent/10"
        >
          <Zap className="h-3.5 w-3.5 mr-1.5" />
          Rajada Aleatoria (5 chamadas)
        </Button>
        <Button
          onClick={() => {
            const floor = Math.floor(Math.random() * totalFloors);
            onFloorCall(floor);
          }}
          size="sm"
          variant="outline"
          className="border-primary/30 text-primary hover:bg-primary/10"
        >
          <Shuffle className="h-3.5 w-3.5 mr-1.5" />
          Chamada Aleatoria
        </Button>
      </div>

      {/* Direct floor buttons */}
      <div className="flex flex-col gap-2">
        <h3 className="text-xs font-mono font-semibold text-muted-foreground uppercase tracking-wider">
          Chamar Andar
        </h3>
        <div className="grid grid-cols-5 gap-1">
          {Array.from({ length: totalFloors }, (_, i) => i).map((floor) => (
            <button
              key={floor}
              onClick={() => onFloorCall(floor)}
              className="h-7 rounded text-[10px] font-mono font-semibold bg-secondary/40 text-secondary-foreground hover:bg-primary/20 hover:text-primary border border-border/30 transition-colors"
            >
              {floor === 0 ? "T" : floor}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
