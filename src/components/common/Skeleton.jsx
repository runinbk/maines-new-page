
/**
 * Base pulse skeleton block
 */
export const Skeleton = ({ className, ...props }) => {
  return (
    <div
      className={`animate-pulse rounded bg-slate-200/80 dark:bg-slate-800/20 ${className || ''}`}
      {...props}
    />
  );
};

/**
 * Skeleton mimicking the full brand page (Hero, Navbar, Catalog)
 */
export const PageSkeleton = () => {
  return (
    <div className="relative min-h-screen bg-[#f8fafc] w-full flex flex-col justify-between overflow-x-hidden">
      
      {/* 1. Header Capsule Navbar Skeleton */}
      <header className="fixed top-0 left-0 w-full z-50 px-3 xs:px-4 sm:px-8 lg:px-20 pt-3 sm:pt-6">
        <div className="max-w-7xl xl:max-w-[1360px] 2xl:max-w-[1560px] mx-auto rounded-full bg-white/40 backdrop-blur-md py-3 px-4 sm:py-4 sm:px-8 border border-white/30 flex items-center justify-between shadow-sm">
          {/* Back button and Logo placeholders */}
          <div className="flex items-center gap-3">
            <Skeleton className="h-6 w-16 sm:w-20 rounded-full" />
            <div className="h-4 w-px bg-slate-200 hidden xxs:block" />
            <Skeleton className="h-5 w-24 sm:w-32 rounded" />
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            <Skeleton className="h-4 w-16 rounded" />
            <Skeleton className="h-4 w-16 rounded" />
            <Skeleton className="h-4 w-16 rounded" />
          </nav>

          {/* Right section (Language selector and CTA button) */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Skeleton className="h-6 w-10 rounded-full" />
            <Skeleton className="h-8 w-20 sm:h-9 sm:w-24 rounded-full" />
          </div>
        </div>
      </header>

      {/* 2. Hero Section Skeleton */}
      <main className="flex-grow">
        <section className="relative min-h-[90dvh] pt-24 pb-8 sm:pt-28 sm:pb-12 lg:pt-32 lg:pb-20 flex items-center justify-center bg-gradient-to-b from-slate-50 via-white to-slate-50/30 px-4 xs:px-6 sm:px-12 lg:px-20">
          <div className="mx-auto w-full px-2 sm:px-8 max-w-7xl xl:max-w-[1360px] 2xl:max-w-[1560px] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left side text details */}
            <div className="lg:col-span-7 text-center lg:text-left space-y-6 flex flex-col items-center lg:items-start">
              <Skeleton className="h-6 w-44 rounded-full" />
              <div className="space-y-3 w-full flex flex-col items-center lg:items-start">
                <Skeleton className="h-10 w-[85%] sm:w-[70%] rounded-lg" />
                <Skeleton className="h-10 w-[60%] sm:w-[45%] rounded-lg" />
              </div>
              <div className="space-y-2 w-full flex flex-col items-center lg:items-start pl-0 lg:pl-6 border-l-0 lg:border-l-2 border-slate-200">
                <Skeleton className="h-4 w-[95%] rounded" />
                <Skeleton className="h-4 w-[90%] rounded" />
                <Skeleton className="h-4 w-[85%] rounded" />
                <Skeleton className="h-4 w-[60%] rounded" />
              </div>
              <Skeleton className="h-11 w-48 rounded-full pt-1" />
            </div>

            {/* Right side graphic isotype */}
            <div className="lg:col-span-5 flex items-center justify-center lg:justify-end">
              <div className="w-40 h-40 sm:w-56 sm:h-56 lg:w-72 lg:h-72 rounded-full border border-slate-100/50 bg-slate-100/30 flex items-center justify-center">
                <Skeleton className="w-[80%] h-[80%] rounded-full" />
              </div>
            </div>

          </div>
        </section>

        {/* 3. Catalog Layout Skeleton */}
        <section className="py-12 px-4 sm:px-8 lg:px-20 max-w-7xl xl:max-w-[1360px] 2xl:max-w-[1560px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-5">
            <Skeleton className="h-11 w-full rounded-2xl" />
            <div className="flex gap-2 pb-1 overflow-x-auto">
              <Skeleton className="h-9 w-20 shrink-0 rounded-full" />
              <Skeleton className="h-9 w-24 shrink-0 rounded-full" />
              <Skeleton className="h-9 w-20 shrink-0 rounded-full" />
            </div>
            <div className="space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center gap-3 p-2.5 rounded-2xl border border-slate-200/40 bg-white">
                  <Skeleton className="w-10 h-10 rounded-xl shrink-0" />
                  <div className="flex-grow space-y-2 min-w-0">
                    <Skeleton className="h-3 w-[70%] rounded" />
                    <Skeleton className="h-2.5 w-[40%] rounded" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Catalog grid placeholders */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

/**
 * Skeleton of a single product catalog card
 */
export const ProductCardSkeleton = () => {
  return (
    <div className="rounded-3xl border border-slate-200/40 p-5 bg-white space-y-4 shadow-sm animate-pulse">
      <Skeleton className="w-full aspect-[4/3] rounded-2xl" />
      <div className="space-y-2">
        <Skeleton className="h-4.5 w-[65%] rounded" />
        <Skeleton className="h-3.5 w-[35%] rounded" />
      </div>
      <div className="flex justify-between items-center pt-2">
        <Skeleton className="h-3.5 w-[25%] rounded" />
        <Skeleton className="h-7 w-20 rounded-full" />
      </div>
    </div>
  );
};
