"use client";

/**
 * Vista em corte do prédio: andares (do topo ao térreo), poços dos elevadores,
 * posição e direção de cada um, indicador de chamadas pendentes por andar.
 * Clique em um andar dispara onFloorClick(floor).
 */
import { cn } from "@/lib/utils";
import type { Elevator, FloorCall } from "@/lib/elevator-engine";
import { ArrowUp, ArrowDown, Minus, DoorOpen } from "lucide-react";

interface BuildingViewProps {
  elevators: Elevator[];
  totalFloors: number;
  pendingCalls: FloorCall[];
  onFloorClick: (floor: number) => void;
}

function DirectionIcon({ direction }: { direction: Elevator["direction"] }) {
  if (direction === "UP") return <ArrowUp className="h-3 w-3" />;
  if (direction === "DOWN") return <ArrowDown className="h-3 w-3" />;
  return <Minus className="h-3 w-3" />;
}

// Cores por elevador (A, B, C) para fundo, borda, texto e brilho quando portas abertas
const elevatorColorMap: Record<
  string,
  { bg: string; border: string; text: string; glow: string }
> = {
  "elevator-a": {
    bg: "bg-elevator-a/20",
    border: "border-elevator-a",
    text: "text-elevator-a",
    glow: "shadow-[0_0_12px_rgba(52,211,153,0.3)]",
  },
  "elevator-b": {
    bg: "bg-elevator-b/20",
    border: "border-elevator-b",
    text: "text-elevator-b",
    glow: "shadow-[0_0_12px_rgba(245,158,11,0.3)]",
  },
  "elevator-c": {
    bg: "bg-elevator-c/20",
    border: "border-elevator-c",
    text: "text-elevator-c",
    glow: "shadow-[0_0_12px_rgba(96,165,250,0.3)]",
  },
};

export function BuildingView({
  elevators,
  totalFloors,
  pendingCalls,
  onFloorClick,
}: BuildingViewProps) {
  // Andares do topo para baixo (índice 0 = térreo no motor, aqui exibimos do maior para o menor)
  const floors = Array.from(
    { length: totalFloors },
    (_, i) => totalFloors - 1 - i
  );

  // Contagem de chamadas pendentes por andar (para exibir badge)
  const pendingByFloor = new Map<number, number>();
  for (const call of pendingCalls) {
    pendingByFloor.set(call.floor, (pendingByFloor.get(call.floor) || 0) + 1);
  }

  return (
    <div className="flex flex-col gap-0">
      {/* Header */}
      <div className="flex items-end gap-0 mb-2 pl-14">
        {elevators.map((e) => {
          const colors =
            elevatorColorMap[e.color] || elevatorColorMap["elevator-a"];
          return (
            <div
              key={e.id}
              className={cn(
                "flex-1 text-center text-xs font-mono font-semibold pb-1",
                colors.text
              )}
            >
              {e.name}
            </div>
          );
        })}
        <div className="w-16" />
      </div>

      {/* Floors */}
      {floors.map((floor) => {
        const pending = pendingByFloor.get(floor) || 0;
        return (
          <div
            key={floor}
            className={cn(
              "flex items-center gap-0 border-t border-border/50 group cursor-pointer hover:bg-secondary/30 transition-colors",
              floor === 0 && "border-b"
            )}
            onClick={() => onFloorClick(floor)}
          >
            {/* Floor number */}
            <div className="w-14 flex items-center justify-end pr-3 py-1.5">
              <span className="font-mono text-xs text-muted-foreground">
                {floor === 0 ? "T" : String(floor).padStart(2, "0")}
              </span>
            </div>

            {/* Elevator shafts */}
            {elevators.map((e) => {
              const isHere = e.currentFloor === floor;
              const colors =
                elevatorColorMap[e.color] || elevatorColorMap["elevator-a"];
              const isDestination = e.destinations.includes(floor);

              return (
                <div
                  key={e.id}
                  className={cn(
                    "flex-1 flex items-center justify-center py-1.5 relative",
                    "border-l border-border/30"
                  )}
                >
                  {/* Shaft background */}
                  <div className="absolute inset-0 bg-secondary/10" />

                  {isHere ? (
                    <div
                      className={cn(
                        "relative z-10 flex items-center justify-center gap-1 rounded px-2 py-0.5",
                        "border-2 transition-all duration-300",
                        colors.bg,
                        colors.border,
                        colors.text,
                        e.doorsOpen && colors.glow
                      )}
                    >
                      {e.doorsOpen ? (
                        <DoorOpen className="h-3.5 w-3.5" />
                      ) : (
                        <DirectionIcon direction={e.direction} />
                      )}
                      <span className="font-mono text-[10px] font-bold">
                        {e.id}
                      </span>
                    </div>
                  ) : isDestination ? (
                    <div
                      className={cn(
                        "relative z-10 h-1.5 w-1.5 rounded-full animate-pulse",
                        colors.bg,
                        colors.border,
                        "border"
                      )}
                    />
                  ) : null}
                </div>
              );
            })}

            {/* Pending calls indicator */}
            <div className="w-16 flex items-center justify-center py-1.5">
              {pending > 0 && (
                <span className="inline-flex items-center justify-center h-5 min-w-5 px-1 rounded-full bg-accent/20 text-accent text-[10px] font-mono font-bold border border-accent/30 animate-pulse">
                  {pending}
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
