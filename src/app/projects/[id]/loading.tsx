
export default function LoadingPage() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-muted rounded-lg"></div>
        <div className="h-8 bg-muted rounded w-48"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          {/* Project Overview Loading Skeleton */}
          <div className="p-6 rounded-lg border border-border bg-card">
            <div className="h-6 bg-muted rounded w-1/3 mb-4"></div>
            <div className="space-y-4">
              <div className="h-20 bg-muted rounded"></div>
              <div className="grid grid-cols-2 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i}>
                    <div className="h-4 bg-muted rounded w-1/2 mb-2"></div>
                    <div className="h-6 bg-muted rounded"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Market Data Loading Skeleton */}
          <div className="p-6 rounded-lg border border-border bg-card">
            <div className="h-6 bg-muted rounded w-1/3 mb-4"></div>
            <div className="grid grid-cols-2 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i}>
                  <div className="h-4 bg-muted rounded w-1/2 mb-2"></div>
                  <div className="h-6 bg-muted rounded"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Social Links Loading Skeleton */}
          <div className="p-6 rounded-lg border border-border bg-card">
            <div className="h-6 bg-muted rounded w-1/3 mb-4"></div>
            <div className="grid grid-cols-2 gap-4">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="h-10 bg-muted rounded"></div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Chart Loading Skeleton */}
          <div className="p-6 rounded-lg border border-border bg-card">
            <div className="h-6 bg-muted rounded w-1/3 mb-4"></div>
            <div className="h-[400px] bg-muted rounded"></div>
          </div>

          {/* Tags Loading Skeleton */}
          <div className="p-6 rounded-lg border border-border bg-card">
            <div className="h-6 bg-muted rounded w-1/3 mb-4"></div>
            <div className="flex flex-wrap gap-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-8 w-20 bg-muted rounded-full"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

