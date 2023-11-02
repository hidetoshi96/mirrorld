export default function NotFound() {
  return (
    <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <h1 className="text-gray-900 mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
          Page Not Found
        </h1>
        <p className="text-gray-600 mt-6 text-base leading-7">
          お探しのページを見つけることができませんでした。
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <a
            href="/mypage"
            className="hover:bg-indigo-500 focus-visible:outline-indigo-600 rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            マイページに戻る

          </a>
          {/* <a href="#" className="text-gray-900 text-sm font-semibold">
            Contact support <span aria-hidden="true">&rarr;</span>
          </a> */}
        </div>
      </div>
    </main>
  );
}
