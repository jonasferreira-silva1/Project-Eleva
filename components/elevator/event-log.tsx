"use client";

/**
 * Log de eventos: lista chamadas pendentes e as últimas 15 atendidas,
 * ordenadas por tick (mais recente primeiro). Mostra andar, elevador e tempo de espera.
 */
import { cn } from "@/lib/utils";
import type { FloorCall } from "@/lib/elevator-engine";
import { ScrollArea } from "@/components/ui/scroll-area";

interface EventLogProps {
  pendingCalls: FloorCall[];
  servedCalls: FloorCall[];
  tick: number;
}

const elevatorColorClass: Record<string, string> = {
  A: "text-elevator-a",
  B: "text-elevator-b",
  C: "text-elevator-c",
};

export function EventLog({ pendingCalls, servedCalls, tick }: EventLogProps) {
  // Junta pendentes + últimas 15 atendidas e ordena por tick (mais recente primeiro)
  const allEvents = [
    ...pendingCalls.map((c) => ({ ...c, type: "pending" as const })),
    ...servedCalls.slice(-15).map((c) => ({ ...c, type: "served" as const })),
  ].sort((a, b) => (b.servedAt || b.timestamp) - (a.servedAt || a.timestamp));

  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-xs font-mono font-semibold text-muted-foreground uppercase tracking-wider">
        Log de Eventos
      </h3>
      <ScrollArea className="h-40">
        <div className="flex flex-col gap-1">
          {allEvents.length === 0 && (
            <p className="text-[10px] font-mono text-muted-foreground py-4 text-center">
              Nenhum evento registrado. Clique em um andar ou gere chamadas.
            </p>
          )}
          {allEvents.slice(0, 20).map((event) => (
            <div
              key={event.id}
              className={cn(
                "flex items-center gap-2 px-2 py-1 rounded text-[10px] font-mono",
                event.type === "pending"
                  ? "bg-accent/5 text-accent"
                  : "bg-primary/5 text-primary"
              )}
            >
              <span className="text-muted-foreground w-10 shrink-0">
                T
                {String(
                  event.type === "served" ? event.servedAt : event.timestamp
                ).padStart(4, "0")}
              </span>
              <span
                className={cn(
                  "font-bold w-4 shrink-0",
                  elevatorColorClass[event.assignedElevator || "A"]
                )}
              >
                {event.assignedElevator}
              </span>
              <span className="truncate">
                {event.type === "pending"
                  ? `Chamada para andar ${event.floor} (aguardando)`
                  : `Andar ${event.floor} atendido (espera: ${
                      (event.servedAt || tick) - event.timestamp
                    } ticks)`}
              </span>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
