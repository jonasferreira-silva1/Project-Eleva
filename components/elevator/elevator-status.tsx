"use client";

/**
 * Status de cada elevador: andar atual, direção (subindo/descendo/parado),
 * fila de destinos, passageiros atendidos e barra de andares percorridos.
 */
import { cn } from "@/lib/utils";
import type { Elevator } from "@/lib/elevator-engine";
import { ArrowUp, ArrowDown, Minus, Users } from "lucide-react";

interface ElevatorStatusProps {
  elevators: Elevator[];
}

const colorClassMap: Record<
  string,
  { border: string; text: string; bg: string }
> = {
  "elevator-a": {
    border: "border-elevator-a/40",
    text: "text-elevator-a",
    bg: "bg-elevator-a/10",
  },
  "elevator-b": {
    border: "border-elevator-b/40",
    text: "text-elevator-b",
    bg: "bg-elevator-b/10",
  },
  "elevator-c": {
    border: "border-elevator-c/40",
    text: "text-elevator-c",
    bg: "bg-elevator-c/10",
  },
};

export function ElevatorStatus({ elevators }: ElevatorStatusProps) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-xs font-mono font-semibold text-muted-foreground uppercase tracking-wider">
        Status dos Elevadores
      </h3>
      <div className="grid grid-cols-1 gap-2">
        {elevators.map((e) => {
          const colors = colorClassMap[e.color] || colorClassMap["elevator-a"];
          return (
            <div
              key={e.id}
              className={cn(
                "rounded-lg border p-3 transition-all",
                colors.border,
                colors.bg
              )}
            >
              <div className="flex items-center justify-between mb-2">
                <span
                  className={cn("font-mono text-sm font-bold", colors.text)}
                >
                  {e.name}
                </span>
                <span
                  className={cn("font-mono text-lg font-black", colors.text)}
                >
                  {e.currentFloor === 0
                    ? "T"
                    : String(e.currentFloor).padStart(2, "0")}
                </span>
              </div>

              <div className="flex items-center gap-3 text-[10px] font-mono text-muted-foreground">
                <div className="flex items-center gap-1">
                  {e.direction === "UP" && (
                    <ArrowUp className={cn("h-3 w-3", colors.text)} />
                  )}
                  {e.direction === "DOWN" && (
                    <ArrowDown className={cn("h-3 w-3", colors.text)} />
                  )}
                  {e.direction === "IDLE" && <Minus className="h-3 w-3" />}
                  <span>
                    {e.direction === "IDLE"
                      ? "PARADO"
                      : e.direction === "UP"
                      ? "SUBINDO"
                      : "DESCENDO"}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  <span>{e.totalPassengersServed} atend.</span>
                </div>
              </div>

              {e.destinations.length > 0 && (
                <div className="mt-2 flex items-center gap-1 flex-wrap">
                  <span className="text-[9px] font-mono text-muted-foreground mr-1">
                    FILA:
                  </span>
                  {e.destinations.map((d, i) => (
                    <span
                      key={`${d}-${i}`}
                      className={cn(
                        "inline-flex items-center justify-center h-4 min-w-4 px-1 rounded text-[9px] font-mono font-bold",
                        colors.bg,
                        colors.text,
                        "border",
                        colors.border
                      )}
                    >
                      {d === 0 ? "T" : d}
                    </span>
                  ))}
                </div>
              )}

              <div className="mt-2">
                <div className="flex items-center justify-between text-[9px] font-mono text-muted-foreground mb-0.5">
                  <span>Andares percorridos</span>
                  <span>{e.totalFloorsTraveled}</span>
                </div>
                <div className="h-1 bg-secondary/30 rounded-full overflow-hidden">
                  <div
                    className={cn(
                      "h-full rounded-full transition-all duration-300",
                      colors.text.replace("text-", "bg-")
                    )}
                    style={{
                      width: `${Math.min(
                        (e.totalFloorsTraveled /
                          Math.max(1, e.totalFloorsTraveled + 50)) *
                          100,
                        100
                      )}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
