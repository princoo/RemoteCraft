### Reflective Questions

* **What makes a page a good candidate for `getStaticProps` versus `getServerSideProps`?**

  * Use `getStaticProps` when your page data doesn't change often and can be generated at build time.
  * Use `getServerSideProps` when your page needs to fetch data on every request (e.g., user-specific data).

* **How does ISR differ from traditional SSG?**

  * ISR (Incremental Static Regeneration) allows pages to be updated in the background after deployment.
  * Traditional SSG builds pages once at build time and never updates them unless you redeploy.

* **What happens during fallback states?**

  * If `fallback` is true or "blocking", Next.js shows a temporary state or waits to generate the page for the first time.
  * After the first request, the page is cached and used for future requests.
