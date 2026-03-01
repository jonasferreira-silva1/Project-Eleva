"use client";

/**
 * Dashboard de métricas: atendidos, pendentes, espera média, andares totais,
 * throughput e eficiência. Se comparisonMetrics existir, mostra valor do algoritmo comparado ao lado.
 * Inclui gráfico de barras das últimas 20 esperas.
 */
import { cn } from "@/lib/utils";
import type { SimulationMetrics } from "@/lib/elevator-engine";
import {
  Clock,
  Layers,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  Activity,
} from "lucide-react";

interface MetricsDashboardProps {
  metrics: SimulationMetrics;
  comparisonMetrics?: SimulationMetrics | null;
}

function MetricCard({
  label,
  value,
  unit,
  icon: Icon,
  comparison,
  comparisonLabel,
}: {
  label: string;
  value: string | number;
  unit?: string;
  icon: React.ComponentType<{ className?: string }>;
  comparison?: string | number;
  comparisonLabel?: string;
}) {
  return (
    <div className="rounded-lg border border-border/50 bg-card/50 p-3 flex flex-col gap-1">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Icon className="h-3.5 w-3.5" />
        <span className="text-[10px] font-mono uppercase tracking-wider">
          {label}
        </span>
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-xl font-mono font-black text-foreground">
          {value}
        </span>
        {unit && (
          <span className="text-[10px] font-mono text-muted-foreground">
            {unit}
          </span>
        )}
      </div>
      {comparison !== undefined && comparisonLabel && (
        <div className="text-[9px] font-mono text-muted-foreground">
          {comparisonLabel}:{" "}
          <span className="text-foreground font-semibold">{comparison}</span>
          {unit && <span> {unit}</span>}
        </div>
      )}
    </div>
  );
}

export function MetricsDashboard({
  metrics,
  comparisonMetrics,
}: MetricsDashboardProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-mono font-semibold text-muted-foreground uppercase tracking-wider">
          Metricas em Tempo Real
        </h3>
        <span
          className={cn(
            "text-[10px] font-mono font-bold px-2 py-0.5 rounded border",
            metrics.algorithmType === "SCAN"
              ? "text-primary border-primary/30 bg-primary/10"
              : "text-accent border-accent/30 bg-accent/10"
          )}
        >
          {metrics.algorithmType}
        </span>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
        <MetricCard
          label="Atendidos"
          value={metrics.totalCallsServed}
          icon={CheckCircle2}
          comparison={comparisonMetrics?.totalCallsServed}
          comparisonLabel={
            comparisonMetrics ? comparisonMetrics.algorithmType : undefined
          }
        />
        <MetricCard
          label="Pendentes"
          value={metrics.totalCallsPending}
          icon={AlertCircle}
          comparison={comparisonMetrics?.totalCallsPending}
          comparisonLabel={
            comparisonMetrics ? comparisonMetrics.algorithmType : undefined
          }
        />
        <MetricCard
          label="Espera Media"
          value={metrics.averageWaitTime.toFixed(1)}
          unit="ticks"
          icon={Clock}
          comparison={comparisonMetrics?.averageWaitTime.toFixed(1)}
          comparisonLabel={
            comparisonMetrics ? comparisonMetrics.algorithmType : undefined
          }
        />
        <MetricCard
          label="Andares Total"
          value={metrics.totalFloorsAllElevators}
          icon={Layers}
          comparison={comparisonMetrics?.totalFloorsAllElevators}
          comparisonLabel={
            comparisonMetrics ? comparisonMetrics.algorithmType : undefined
          }
        />
        <MetricCard
          label="Throughput"
          value={metrics.throughput.toFixed(1)}
          unit="/60 ticks"
          icon={TrendingUp}
          comparison={comparisonMetrics?.throughput.toFixed(1)}
          comparisonLabel={
            comparisonMetrics ? comparisonMetrics.algorithmType : undefined
          }
        />
        <MetricCard
          label="Eficiencia"
          value={
            metrics.totalCallsServed > 0
              ? (
                  metrics.totalFloorsAllElevators / metrics.totalCallsServed
                ).toFixed(1)
              : "---"
          }
          unit="and/atend"
          icon={Activity}
          comparison={
            comparisonMetrics && comparisonMetrics.totalCallsServed > 0
              ? (
                  comparisonMetrics.totalFloorsAllElevators /
                  comparisonMetrics.totalCallsServed
                ).toFixed(1)
              : undefined
          }
          comparisonLabel={
            comparisonMetrics ? comparisonMetrics.algorithmType : undefined
          }
        />
      </div>

      {/* Wait time distribution */}
      {metrics.waitTimes.length > 0 && (
        <div className="flex flex-col gap-2">
          <h4 className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
            Distribuicao de Tempo de Espera (ultimas 20)
          </h4>
          <div className="flex items-end gap-0.5 h-16">
            {metrics.waitTimes.slice(-20).map((wt, i) => {
              const maxWait = Math.max(...metrics.waitTimes.slice(-20), 1);
              const height = (wt / maxWait) * 100;
              return (
                <div
                  key={i}
                  className="flex-1 rounded-t bg-primary/40 hover:bg-primary/60 transition-colors relative group"
                  style={{ height: `${Math.max(height, 4)}%` }}
                >
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 hidden group-hover:block text-[9px] font-mono text-foreground bg-card border border-border rounded px-1">
                    {wt}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
