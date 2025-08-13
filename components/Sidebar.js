import Link from "next/link";
import Script from "next/script";

export default function Sidebar({ posts }) {
  return (
    <aside className="sidebar w-full md:w-1/3">
      {/* Adsterra Ad at the top of the sidebar */}
      <div className="mb-6 text-center">
        <Script
          id="adsterra-sidebar"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              <script type="text/javascript">
                atOptions = {
                  'key' : 'YOUR_ADSTERRA_KEY',
                  'format' : 'iframe',
                  'height' : 250,
                  'width' : 300,
                  'params' : {}
                };
              </script>
              <script type="text/javascript" src="//www.topcreativeformat.com/YOUR_ADSTERRA_KEY/invoke.js"></script>
            `,
          }}
        />
      </div>

      {/* Recent Posts section */}
      <div className="bg-white shadow-lg rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-4">Recent Posts</h3>
        <ul>
          {posts.map((post) => (
            <li key={post.slug} className="mb-3">
              <Link href={`/blog/${post.slug}`} className="text-blue-600 hover:underline">
                {post.frontmatter.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
