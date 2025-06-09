import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { FileUploadWrapper } from '@/components/FileUploadWrapper';
import { DownloadButton } from '@/components/DownloadButton';

export const dynamic = 'force-dynamic';

export default async function Dashboard() {
  const supabase = createServerComponentClient({ cookies });
  
  // Check and refresh session if needed
  const { data: { session }, error: sessionError } = await supabase.auth.getSession();

  if (sessionError) {
    console.error('Session error:', sessionError);
    redirect('/login?error=session-error');
  }

  if (!session) {
    console.log('No active session found');
    redirect('/login');
  }

  try {
    // Fetch user's PDFs
    const { data: pdfs, error: pdfsError } = await supabase
      .from('pdfs')
      .select('*')
      .eq('user_id', session.user.id)
      .order('created_at', { ascending: false });

    if (pdfsError) {
      console.error('Error fetching PDFs:', pdfsError);
      throw new Error('Failed to fetch PDFs');
    }

    return (
    <main className="flex-1 container mx-auto px-6 py-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-white">Your PDFs</h1>
          <p className="text-sm text-gray-400">
            {pdfs?.length || 0} PDF{pdfs?.length === 1 ? '' : 's'}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FileUploadWrapper />
          {pdfs?.map((pdf) => (
            <div
              key={pdf.id}
              className="bg-[#141921]/80 backdrop-blur-sm rounded-2xl border border-gray-800 p-6 flex flex-col"
            >
              <h3 className="text-lg font-medium text-white mb-4 truncate" title={pdf.filename}>
                {pdf.filename}
              </h3>
              <div className="grid grid-cols-3 gap-2 mb-6">
                <div className="text-center">
                  <p className="text-sm text-gray-400">Original</p>
                  <p className="text-lg font-medium text-white">{(pdf.original_size / 1024 / 1024).toFixed(2)}</p>
                  <p className="text-xs text-gray-400">MB</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-400">Compressed</p>
                  <p className="text-lg font-medium text-white">{(pdf.compressed_size / 1024 / 1024).toFixed(2)}</p>
                  <p className="text-xs text-gray-400">MB</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-400">Reduction</p>
                  <p className="text-lg font-medium text-white">{((1 - pdf.compressed_size / pdf.original_size) * 100).toFixed(1)}</p>
                  <p className="text-xs text-gray-400">%</p>
                </div>
              </div>
              <div className="mt-auto">
                <DownloadButton url={pdf.compressed_url} filename={pdf.filename} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
    );
  } catch (error) {
    console.error('Error in dashboard:', error);
    redirect('/login?error=dashboard-error');
  }
}
