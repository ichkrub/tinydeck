import { Logo } from '@/components/Logo';
import { SessionProvider } from '@/components/SessionProvider';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <SessionProvider>
      <div className="min-h-screen bg-[#0E1117] flex flex-col">
        <header className="border-b border-gray-800 bg-[#141921]/80 backdrop-blur-sm">
          <div className="container mx-auto px-6">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <Logo className="h-8 w-auto text-white" />
              </div>
              <div className="flex items-center gap-4">
                <form action="/auth/sign-out" method="POST">
                  <button
                    type="submit"
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    Sign out
                  </button>
                </form>
              </div>
            </div>
          </div>
        </header>
        {children}
      </div>
    </SessionProvider>
  );
}
